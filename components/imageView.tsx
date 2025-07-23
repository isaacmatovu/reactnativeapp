import React from "react";
import { Image, ImageSourcePropType } from "react-native";

interface Props {
  imgSource: ImageSourcePropType;
}

const ImageViewer = (props: Props) => {
  const { imgSource } = props;
  return <Image source={imgSource} className="h-[440px] w-80 rounded-[18px]" />;
};

export default ImageViewer;
