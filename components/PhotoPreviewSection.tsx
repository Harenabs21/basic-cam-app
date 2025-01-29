import { Ionicons } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera'
import React from 'react'
import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

interface PhotoPreviewProps{
    photo: CameraCapturedPicture;
    handleRetakePhoto: () => void;
    handleSavePhoto: () => void;
}

function PhotoPreviewSection({photo, handleRetakePhoto, handleSavePhoto}: PhotoPreviewProps) {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <Image
                style={styles.previewConatiner}
                source={{uri: 'data:image/jpg;base64,' + photo.base64}}
            />
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
  )
}
const styles = StyleSheet.create({
    container:{
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
        alignItems: "center",
    },
    previewConatiner: {
        width: '95%',
        height: '85%',
        borderRadius: 15
    },
    buttonContainer: {
        marginTop: '4%',
        flexDirection: 'row',
        justifyContent: "center",
        gap: 20,
        width: '100%',
    },
    button: {
        backgroundColor: 'gray',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default PhotoPreviewSection;