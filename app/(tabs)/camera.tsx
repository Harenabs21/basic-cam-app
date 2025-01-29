import PhotoPreviewSection from '@/components/PhotoPreviewSection';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions, FlashMode } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, setMediaPermission] = MediaLibrary.usePermissions()
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);
  //Todo: fix flashmode that doesn't work
  const [flashMode, setFlashMode] = useState<FlashMode>('off');


  useEffect(() => {
    (async () => {
      requestPermission()
      setMediaPermission()
    }) ();
  } ,[])

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted && mediaPermission?.status === 'granted') {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={ () => {requestPermission; setMediaPermission}} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlashMode() {
    setFlashMode(current => (current === 'off' ? 'on' : 'off'))
    console.log('flash-mode',flashMode);
    
  }

  const handleTakePhoto =  async () => {
    if (cameraRef.current) {
        const options = {
            quality: 1,
            base64: true,
            exif: false,
            flash: flashMode
        };
        const takedPhoto = await cameraRef.current.takePictureAsync(options);

        setPhoto(takedPhoto);
    }
  }; 

  const handleSavePhoto = async () => {
      await MediaLibrary.saveToLibraryAsync(photo.uri).then(() => setPhoto(null))
  }

  const handleRetakePhoto = () => setPhoto(null);

  if (photo) return <PhotoPreviewSection photo={photo} handleRetakePhoto={handleRetakePhoto} handleSavePhoto={handleSavePhoto} />

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} flash={flashMode} ref={cameraRef}>
        <View>
          <TouchableOpacity style={styles.flash} onPress={toggleFlashMode}>
              <Fontisto name='flash' size={44} color='black' />
            </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <AntDesign name='retweet' size={44} color='black' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <AntDesign name='camera' size={44} color='black' />
          </TouchableOpacity>
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
  flash:{
    borderRadius: 100,
    padding: 20,
    margin: 25,
    backgroundColor: 'gray',
    overflow:'hidden',
    position:'relative',
    width:'18%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

