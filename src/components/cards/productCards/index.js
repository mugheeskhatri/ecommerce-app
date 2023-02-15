import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import NormalCard from "./productCard";
import LandCard from "./productLandCard";
import ImageBoxCard from "./productImageBoxCard";

const CardMain = (props) => {
  const { appearance } = useContext(AuthContext);
  if (appearance?.productCardType === "imageBox")
    return <ImageBoxCard {...props} />;
  else if (appearance?.productCardType === "landCard")
    return <LandCard {...props} />;
  else return <NormalCard {...props} />;
};

export default CardMain;

const styles = StyleSheet.create({});
