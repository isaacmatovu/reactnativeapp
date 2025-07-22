import React from "react";
import { Pressable, Text, View } from "react-native";

const Button = () => {
  return (
    <View>
      <Pressable
        onPress={() => alert("you clicked me by mistake")}
        className="bg-white py-5 w-6 rounded-2xl border-2 border-yellow-300"
      >
        <Text className="text-blue-600">Click me!</Text>
      </Pressable>
    </View>
  );
};

export default Button;
