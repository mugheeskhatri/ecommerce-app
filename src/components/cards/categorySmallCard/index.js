import React from "react";
import { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { IMAGE_URL } from "../../../config/drive";
import { AuthContext } from "../../../context";

const Index = (props) => {
  const { setSelectedCategory, appearance } = useContext(AuthContext);

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedCategory(props.data);
        props.onClick();
      }}
      style={{
        ...styles.mainCard,
        backgroundColor: appearance.backgroundColor,
      }}
    >
      <Image
        style={{
          width: 45,
          height: 45,
          borderRadius: 100,
        }}
        source={{ uri: IMAGE_URL + props?.data?.categoryImage }}
      />
      <Text
        style={{
          fontSize: 12,
          fontFamily: "Monstret_bold",
          color: appearance.secondaryColor,
          marginTop: 4,
        }}
      >
        {props.data.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    width: 80,
    height: 80,

    marginVertical: 7,
    borderRadius: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Index;
