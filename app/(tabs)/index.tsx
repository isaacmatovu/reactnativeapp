import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/imageView";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require("../../assets/images/background-image.png");
export default function Index() {
  const imageRef = useRef(null);
  const [persmissionResponse, requestPermission] =
    MediaLibrary.usePermissions();
  //selecting images on a device
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showAppOptions, setshowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!persmissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  const PickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setshowAppOptions(true);
      console.log(result);
    } else {
      alert("You did not select an image");
    }
  };

  const onReset = () => {
    setshowAppOptions(false);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <View ref={imageRef} className="flex-1">
        <ImageViewer
          imgSource={selectedImage ? { uri: selectedImage } : PlaceholderImage}
        />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View className="absolute bottom-20">
          <View className="flex flex-row items-center">
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View>
          <Button
            onPress={PickImageAsync}
            variant="primary"
            label="Choose a photo"
          />
          <Button
            onPress={() => setshowAppOptions(true)}
            label="Use this photo"
          />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },

  button: {
    backgroundColor: "black",
    color: "white",
  },
});
