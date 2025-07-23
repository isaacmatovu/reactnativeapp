import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

interface Props {
  imageSize: number;
  stickerSource: ImageSourcePropType;
}

const EmojiSticker = (props: Props) => {
  const { imageSize, stickerSource } = props;
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
};

export default EmojiSticker;
