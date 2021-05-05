import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../../constants/Color";

const ProductItem = (props) => {
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  return (
    <TouchableOpacity
      style={styles.shop}
      onPress={() => {
        props.productHandler(props.id, props.shopId);
      }}
    >
      <Text style={styles.name}>{props.name}</Text>
      <Image
        style={styles.image}
        source={{ uri: `http://${domainname}:8000/${props.image}` }}
      />
      <Text style={styles.price}>{props.price}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  shop: {
    shadowColor: Colors.accent,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    padding: 20,
  },
  name: {
    fontSize: 20,
    color: Colors.accent,
  },
  price: {
    fontSize: 15,
    color: Colors.accent,
  },
  image: {
    alignSelf: "center",
    height: "80%",
    width: "50%",
  },
});
export default ProductItem;
