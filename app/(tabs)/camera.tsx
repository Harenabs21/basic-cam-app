import PhotoPreviewSection from '@/components/PhotoPreviewSection';
import Pressable from '@/components/button/Button';
import { CameraType, CameraView, useCameraPermissions, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);
  //Todo: fix flashmode that doesn't work
  const [flashMode, setFlashMode] = useState<FlashMode>('off');

  useEffect(() => {
    (async () => {
      requestPermission();
      requestMediaPermission();
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted && mediaPermission?.status === 'granted') {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button
          onPress={() => {
            requestPermission;
            requestMediaPermission;
          }}
          title="grant permission"
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlashMode() {
    setFlashMode((current) => (current === 'off' ? 'on' : 'off'));
    console.log('flash-mode', flashMode);
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
        flash: flashMode,
      };
      const takedPhoto = await cameraRef.current.takePictureAsync(options);

      setPhoto(takedPhoto);
    }
  };

  const handleSavePhoto = async () => {
    await MediaLibrary.saveToLibraryAsync(photo.uri).then(() => setPhoto(null));
  };

  const handleRetakePhoto = () => setPhoto(null);

  if (photo)
    return (
      <PhotoPreviewSection photo={photo} handleRetakePhoto={handleRetakePhoto} handleSavePhoto={handleSavePhoto} />
    );

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        flash={flashMode}
        enableTorch={flashMode === 'on'}
        ref={cameraRef}
      >
        <View>
          <Pressable
            style={styles.flash}
            icon={flashMode === 'off' ? 'flash-off' : 'flash-on'}
            onPress={toggleFlashMode}
            size={44}
            color="black"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            size={44}
            icon={'flip-camera-ios'}
            onPress={toggleCameraFacing}
            color="black"
          />
          <Pressable style={styles.button} size={44} icon={'camera'} color="black" onPress={handleTakePhoto} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  flash: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
