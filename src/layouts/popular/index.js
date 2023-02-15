import axios from "axios";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

//import components
import CardMain from "../../components/cards/productCards";
import API from "../../config/api";
import { AuthContext } from "../../context";

const Index = (props) => {
  const { setCurrentProduct, appearance } = useContext(AuthContext);
  const { popularDataRef } = props;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    popularDataRef.current = {
      getProducts,
    };
    getProducts();
  }, []);
  const getProducts = () => {
    setProducts([]);
    axios.get(`${API}/products/get`).then((res) => {
      setProducts(res.data.length > 10 ? res.data.slice(-10) : res.data);
    });
  };

  return (
    <View style={styles.main}>
      <Text style={{ ...styles.heading, color: appearance.primaryColor }}>
        Popular Products
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 8,
          justifyContent: "space-around",
          paddingHorizontal: 8,
        }}
      >
        {products?.map((v, i) => {
          return (
            <CardMain
              popular={true}
              onEyeClick={() => {
                setCurrentProduct(v);
                props.onEyeClick();
              }}
              data={v}
              index={i}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    marginTop: 5,
  },
  heading: {
    fontSize: 22,
    fontFamily: "Monstret_bold",
    marginLeft: 15,
  },
});

export default Index;
