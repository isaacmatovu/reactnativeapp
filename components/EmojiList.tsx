import React, { useState } from "react";
import { FlatList, Image, Platform, Pressable, StyleSheet } from "react-native";

interface Props {
  onSelect: (image: string) => void;
  onCloseModal: () => void;
}
const EmojiList = (props: Props) => {
  const { onSelect, onCloseModal } = props;
  const [emoji] = useState([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ]);
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            (onSelect(item), onCloseModal());
          }}
        >
          <Image
            className="w-[100px] h-[100px] mr-5"
            source={item}
            key={index}
          />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default EmojiList;
