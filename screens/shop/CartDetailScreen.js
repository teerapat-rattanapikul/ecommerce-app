import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Color";
import axios from "axios";
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
const CartDetailScreen = (props) => {
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  const { id } = props.route.params;
  const [totalPrice, setTotalPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(1);
  const [shopName, setShopName] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      url: `http://${domainname}:8000/api/order/cartOrderDetail`,
      method: "post",
      data: {
        orderId: id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setTotalPrice(res.data.product.price);
      setAmount(res.data.product.amount);
      setShopName(res.data.product.shop.name);
      setImage(res.data.product.image);
      setName(res.data.product.name);
      setLoading(false);
    });
  }, []);

  const buy = () => {
    axios({
      url: `http://${domainname}:8000/api/user/buy`,
      method: "post",
      data: {
        totalAmount: totalAmount,
        totalPrice: totalPrice,
        orderId: id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status) {
        props.navigation.goBack(null);
      }
    });
  };

  const cancle = () => {
    axios({
      url: `http://${domainname}:8000/api/user/cancle`,
      method: "post",
      data: {
        orderId: id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status) {
        props.navigation.goBack(null);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 130 }}>
      {loading ? (
        <Placeholder Animation={Fade}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              height: "100%",
              alignItems: "flex-start",
              justifyContent: "space-around",
            }}
          >
            <PlaceholderLine
              width={90}
              height={400}
              style={{
                marginTop: 40,
                borderRadius: 10,
                marginBottom: 40,
              }}
            />
            <PlaceholderLine
              width={90}
              height={200}
              style={{
                borderRadius: 10,
                marginBottom: 40,
              }}
            />
          </View>
        </Placeholder>
      ) : (
        <Fragment>
          <View style={styles.order}>
            <Text style={styles.name}>จากร้าน {shopName}</Text>
            <Image
              style={styles.image}
              source={{ uri: `http://${domainname}:8000/${image}` }}
            />
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.cash}>
            <Text style={styles.text}>การชำระเงิน</Text>
            <Text style={styles.text}>จำนวนสินค้าที่มี {amount} ชิ้น</Text>
            <View style={styles.amount}>
              <Text style={styles.name}>สั่งซื้อ</Text>
              <TouchableOpacity
                style={styles.actionAmount}
                onPress={() => {
                  if (totalAmount !== 1) {
                    setTotalAmount(totalAmount - 1);
                    setTotalPrice(
                      (totalPrice / totalAmount) * (totalAmount - 1)
                    );
                  }
                }}
              >
                <Text style={styles.text}>-</Text>
              </TouchableOpacity>
              <View style={{ ...styles.actionAmount, backgroundColor: "#fff" }}>
                <Text style={styles.text}>{totalAmount}</Text>
              </View>
              <TouchableOpacity
                style={styles.actionAmount}
                onPress={() => {
                  if (totalAmount < amount) {
                    setTotalAmount(totalAmount + 1);
                    setTotalPrice(
                      (totalPrice / totalAmount) * (totalAmount + 1)
                    );
                  }
                }}
              >
                <Text style={styles.text}>+</Text>
              </TouchableOpacity>
              <Text style={styles.name}>ชิ้น</Text>
            </View>
            <Text style={styles.text}>ราคารวม {totalPrice} บาท</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={buy}>
            <Text style={styles.text}>จ่ายเงิน</Text>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "red" }}
            onPress={cancle}
          >
            <Text style={styles.text}>ยกเลิก</Text>
          </TouchableOpacity>
        </Fragment>
      )}
    </ScrollView>
  );
};

export default CartDetailScreen;

const styles = StyleSheet.create({
  order: {
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: Platform.OS === "android" ? 320 : 400,
    margin: 20,
    padding: 20,
    justifyContent: "flex-start",
  },
  cash: {
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: Platform.OS === "android" ? 200 : 220,
    margin: 15,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    width: "90%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "#55f246",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 10,
  },
  image: {
    alignSelf: "center",
    height: "80%",
    width: "50%",
  },
  amount: {
    flexDirection: "row",
    width: "60%",
    height: 50,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
  },
  actionAmount: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    height: "100%",
    backgroundColor: Colors.primary,
  },
});
