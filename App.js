import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from 'anonymous-files';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to camera and media library is required");
      return;
    }

    const ImagePick = await ImagePicker.launchImageLibraryAsync();
    if (ImagePick.cancelled === true) {
      return;
    }

    if (Platform.OS === 'web') {
      const remoteUri = await uploadToAnonymousFilesAsync(ImagePick.uri);
      setSelectedImage({ localUri: ImagePick.uri, remoteUri });
      console.log(remoteUri);
    } else {
      setSelectedImage({ localUri: ImagePick.uri });
    }
  };

  const openShareDialog = async () => {
    if(Platform.OS === 'web') {
      alert(`The image is avaible to share at: ${'<a target="_BLANK">' + selectedImage.remoteUri + '</a>'}`);
      return;
    } else {
      if (!(await Sharing.isAvailableAsync())) {
        alert(`The image is avaible to share at: ${'<a target="_BLANK">' + selectedImage.remoteUri + '</a>'}`);
        return;
      }
    }

    if (selectedImage === null) {
      alert("Need to select an image first");
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Pick an image </Text>
      <Image
        source={{
          uri:
            selectedImage !== null
              ? selectedImage.localUri
              : "https://picsum.photos/200/200",
        }}
        style={styles.imagex}
      />
      <TouchableOpacity
        onPress={() => openImagePickerAsync()}
        style={styles.btnc}
      >
        <Text style={styles.btnText}>Upload Image</Text>
      </TouchableOpacity>
      <Button
        onPress={() => openShareDialog()}
        title="Share Image"
        color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: { fontSize: 30, color: "#222", marginBottom: 15 },
  imagex: { height: 200, width: 200, borderRadius: 25, resizeMode: "contain" },
  btnc: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#2E5894",
    borderRadius: 5,
    padding: 8,
  },
  btnText: { color: "#fff" },
});

export default App;
