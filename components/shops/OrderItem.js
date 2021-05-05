import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../../constants/Color";

const OrderItem = (props) => {
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  const dayMonthYear = (dateTime) => {
    const NewDateTime = new Date(dateTime);
    const month = NewDateTime.getUTCMonth() + 1; //months from 1-12
    const day = NewDateTime.getUTCDate();
    const year = NewDateTime.getUTCFullYear();
    return " วันที่ " + day + "/" + month + "/" + year;
  };
  return (
    <TouchableOpacity
      style={styles.shop}
      onPress={() => {
        props.cartDetail(props.id);
      }}
    >
      <Text style={styles.name}>{props.name}</Text>
      <Image
        style={styles.image}
        source={{ uri: `http://${domainname}:8000/${props.image}` }}
      />
      <Text style={styles.date}>{dayMonthYear(props.cartOrderDate)}</Text>
      <Text style={styles.status}>ยังไม่ได้จ่ายเงิน</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shop: {
    alignSelf: "center",
    shadowColor: Colors.accent,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 200,
    margin: 20,
    padding: 20,
    width: "70%",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    color: Colors.accent,
  },
  date: {
    fontSize: 15,
    position: "absolute",
    bottom: 10,
    left: 10,
    textAlign: "center",
    color: Colors.accent,
  },
  status: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontSize: 15,
    color: "red",
  },
  image: {
    alignSelf: "center",
    height: "80%",
    width: "30%",
  },
});
export default OrderItem;
