import React from "react";
import { Image } from "react-native";

interface Props {
  imgSource: string;
}

const ImageViewer = (props: Props) => {
  const { imgSource } = props;
  return <Image source={imgSource} className="h-80 w-[440px] rounded-[18px]" />;
};

export default ImageViewer;
