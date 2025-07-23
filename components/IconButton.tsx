import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text } from "react-native";
interface Props {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
}

const IconButton = (props: Props) => {
  const { icon, label, onPress } = props;
  return (
    <Pressable className="" onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text>{label}</Text>
    </Pressable>
  );
};

export default IconButton;
