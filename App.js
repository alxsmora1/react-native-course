import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

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

    setSelectedImage({ localUri: ImagePick.uri });
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
      <Button
        onPress={() => Alert.alert("Cant touch this")}
        title="Dont Press Me"
        color="#841584"
      />
      <TouchableOpacity
        onPress={() => openImagePickerAsync()}
        style={styles.btnc}
      >
        <Text style={styles.btnText}>Upload Image</Text>
      </TouchableOpacity>
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
    backgroundColor: "#2E5894",
    borderRadius: 5,
    padding: 8,
  },
  btnText: { color: "#fff" },
});

export default App;
