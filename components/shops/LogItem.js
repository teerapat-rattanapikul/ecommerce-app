import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../../constants/Color";
import { numberWithCommas } from "../../helppers/moneyFormat";

const LogItem = (props) => {
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  const dayMonthYear = (dateTime) => {
    const NewDateTime = new Date(dateTime);
    const month = NewDateTime.getUTCMonth() + 1; //months from 1-12
    const day = NewDateTime.getUTCDate();
    const year = NewDateTime.getUTCFullYear();
    return day + "/" + month + "/" + year;
  };
  return (
    <View style={styles.shop}>
      <Image
        style={styles.image}
        source={{ uri: `http://${domainname}:8000/${props.image}` }}
      />
      <View style={styles.column}>
        <Text style={styles.name}>สั่งซื้อ {props.name}</Text>
        <Text style={styles.name}>
          เมื่อวันที่ {dayMonthYear(props.logDate)}
        </Text>
        <Text style={styles.name}>
          จำนวน {numberWithCommas(props.totalAmount)} ชิ้น
        </Text>
        <Text style={styles.name}>
          เป็นเงิน {numberWithCommas(props.totalPrice)} บาท
        </Text>
        <Text style={styles.name}>จากร้าน {props.shop}</Text>
        {props.status === "Success" ? (
          <Text style={{ ...styles.status, color: "green" }}>
            ดำเนินการเสร็จสิ้น
          </Text>
        ) : (
          <Text style={styles.status}>
            {props.status === "Paid" ? "จ่ายเงินแล้ว" : "กำลังจัดส่งสินค้า"}
          </Text>
        )}
      </View>
    </View>
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
    width: "90%",
    flexDirection: "row",
    alignItems: "flex-start",
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
    bottom: 0,
    right: 0,
    fontSize: 15,
    color: "orange",
  },
  image: {
    alignSelf: "center",
    height: "100%",
    width: "40%",
    marginRight: 15,
  },
  column: {
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
    height: "100%",
  },
});
export default LogItem;
