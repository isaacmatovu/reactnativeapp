import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface ButtonProps {
  label: string;
  variant?: string;
  onPress?: () => void;
}

const Button = (props: ButtonProps) => {
  const { label, variant, onPress } = props;
  return (
    <View
      className={`w-80 h-[68px] flex justify-center items-center p-1 ${variant === "primary" ? "bg-blue-500" : "bg-yellow-400"} mt-5`}
    >
      <Pressable
        className="rounded-[18px] w-full h-full items-center justify-center"
        onPress={onPress}
      >
        <Ionicons name="happy" size={24} color="black" />
        <Text className="text-white text-lg">{label}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
