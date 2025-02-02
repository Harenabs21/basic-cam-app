import { Ionicons } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

interface PhotoPreviewProps {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
  handleSavePhoto: () => void;
}

function PhotoPreviewSection({ photo, handleRetakePhoto, handleSavePhoto }: PhotoPreviewProps) {
  const [filter, setFilter] = useState('none');

  const filters = [
    { name: 'Aucun', value: 'none' },
    { name: 'Grayscale', value: 'grayscale(100%)' },
    { name: 'Sepia', value: 'sepia(100%)' },
    { name: 'Invert', value: 'invert(100%)' },
    { name: 'Blur', value: 'blur(3px)' }, // Only works on React Native Web
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Image
          style={[styles.previewContainer, { filter }]}
          source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
        />
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filterText}>Appliquer un filtre :</Text>
        <View style={styles.filterButtons}>
          {filters.map((f) => (
            <TouchableOpacity key={f.value} onPress={() => setFilter(f.value)} style={styles.filterButton}>
              <Text>{f.name}</Text>
            </TouchableOpacity>
          ))}
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
