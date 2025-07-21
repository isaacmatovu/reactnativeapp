import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const Back = () => {
  return (
    <>
      <Stack.Screen options={{ title: "opps page not found" }} />
      <View>
        <Link href={"/"}>Go back to home</Link>
      </View>
    </>
  );
};

export default Back;
