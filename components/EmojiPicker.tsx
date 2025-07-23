import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const EmojiPicker = (props: Props) => {
  const { isVisible, children, onClose } = props;
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="h-1/4 w-full bg-[#25292e] rounded-r-[18px] rounded-t-[18px] absolute bottom-0">
        <View className="flex flex-row items-center justify-between h-[16%] bg-[#464c55] rounded-t-[10px] rounded-r-[10px] px-5">
          <Text>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default EmojiPicker;
