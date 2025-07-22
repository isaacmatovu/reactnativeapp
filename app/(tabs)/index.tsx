import Button from "@/components/Button";
import ImageViewer from "@/components/imageViewer";
import { StyleSheet, View } from "react-native";

const PlaceholderImage = require("../../assets/images/background-image.png");
export default function Index() {
  return (
    <View style={styles.container}>
      <View className="flex-1">
        <ImageViewer imgSource={PlaceholderImage} />
        <Button />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  button: {
    backgroundColor: "black",
    color: "white",
  },
});
