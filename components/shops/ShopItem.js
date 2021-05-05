import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ShopItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.shop}
      onPress={() => {
        props.shopHandler(props.id);
      }}
    >
      <Text style={styles.name}>{props.name}</Text>
      <MaterialCommunityIcons name="store" size={50} color={Colors.accent} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  shop: {
    shadowColor: Colors.accent,
    flexDirection: "row",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 100,
    margin: 20,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    color: Colors.accent,
  },
});
export default ShopItem;
