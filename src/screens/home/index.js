import React, { useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import components
import Header from "../../components/headers/header";
import Carousel from "../../components/caruosel";
import FlashSale from "../../layouts/flashSale";
import Category from "../../layouts/category";
import PopularCategoryLayout from "../../layouts/popular";
import { useEffect } from "react";
import { AuthContext } from "../../context";
import NetInfo from "@react-native-community/netinfo";
import { useRef } from "react";
import { RefreshControl } from "react-native";

const Index = ({ navigation }) => {
  const { appearance, setMyCart, myCart, user, setMyWishList } =
    useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const popularDataRef = useRef();

  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log("Connection type", state.type);
    if (state.isConnected === false) {
      navigation.navigate("Internet");
    }
  });

  useEffect(() => {
    AsyncStorage.getItem("ecommerce_cart").then(async (res) => {
      const cartData = await res;
      if (cartData !== null) {
        setMyCart(JSON.parse(cartData));
      }
    });
    AsyncStorage.getItem("ecommerce_wishlist").then(async (res) => {
      const wishlist = await res;
      if (wishlist !== null) {
        setMyWishList(JSON.parse(res));
      }
    });

    unsubscribe();
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    popularDataRef?.current?.getProducts();
  };

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: appearance.backgroundColor,
      }}
    >
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
        <ScrollView nestedScrollEnabled style={{ width: "100%" }}>
          <Header
            profileClick={() => navigation.navigate("Profile")}
            onClick={() => navigation.navigate("Search")}
          />
          <Carousel />
          <Category
            onOneCategory={() => navigation.navigate("SelectedCategory")}
            onAllClick={() => navigation.navigate("Category")}
          />
          <FlashSale onClick={() => navigation.navigate("FlashSale")} />
          <PopularCategoryLayout
            popularDataRef={popularDataRef}
            onEyeClick={() => navigation.navigate("ProductDetail")}
          />
        </ScrollView>
      </RefreshControl>
    </View>
  );
};

export default Index;
