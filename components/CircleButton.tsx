import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
interface Props {
  onPress: () => void;
}

const CircleButton = (props: Props) => {
  const { onPress } = props;
  return (
    <View className="w-[84px] h-[84px] mx-16 border-4 border-[#ffd33d] rounded-[42px] p-[3px]">
      <Pressable
        onPress={onPress}
        className="flex-1 items-center justify-center rounded-[42px] bg-white"
      >
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
};

export default CircleButton;
