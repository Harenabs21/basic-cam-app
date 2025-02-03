import { COLOUR_MATRIX } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Skia, Image as SkiaImage, Canvas, ColorMatrix } from '@shopify/react-native-skia';
import { CameraCapturedPicture } from 'expo-camera';
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface PhotoPreviewProps {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
  handleSavePhoto: () => void;
}

function PhotoPreviewSection({ photo, handleRetakePhoto, handleSavePhoto }: PhotoPreviewProps) {
  const [matrix, setMatrix] = useState(COLOUR_MATRIX.none);
  const data = Skia.Data.fromBase64(photo.base64!);
  const image = Skia.Image.MakeImageFromEncoded(data);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Canvas style={styles.canvas}>
          <SkiaImage fit="cover" image={image} x={0} y={0} width={300} height={400}>
            <ColorMatrix matrix={matrix} />
          </SkiaImage>
        </Canvas>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filterText}>Appliquer un filtre :</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity onPress={() => setMatrix(COLOUR_MATRIX.none)} style={styles.filterButton}>
            <Text>Aucun</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMatrix(COLOUR_MATRIX.sepia)} style={styles.filterButton}>
            <Text>Sepia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMatrix(COLOUR_MATRIX.grayscale)} style={styles.filterButton}>
            <Text>Grayscale</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMatrix(COLOUR_MATRIX.invert)} style={styles.filterButton}>
            <Text>Invert</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMatrix(COLOUR_MATRIX.contrast)} style={styles.filterButton}>
            <Text>Contrast</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
          <Ionicons name="trash-outline" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSavePhoto}>
          <Ionicons name="save-outline" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    borderRadius: 15,
    padding: 1,
    width: '95%',
    backgroundColor: 'darkgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: { width: 300, height: 400 },
  previewContainer: {
    width: '95%',
    height: '85%',
    borderRadius: 15,
  },
  buttonContainer: {
    marginTop: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 16,
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  filterButton: {
    margin: 5,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});

export default PhotoPreviewSection;
