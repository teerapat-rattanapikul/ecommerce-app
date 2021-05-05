import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Platform,
  Text,
} from "react-native";
import { connect } from "react-redux";
import OrderItem from "../.../../../components/shops/OrderItem";
import { useIsFocused } from "@react-navigation/native";
const CartScreen = (props) => {
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  const [orders, setOrders] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (props.user.status) {
      axios({
        url: `http://${domainname}:8000/api/order/cartOrder`,
        method: "post",
        data: {
          userId: props.user.id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setOrders(res.data);
      });
    }
  }, [isFocused]);
  const cartDetail = (id) => {
    props.navigation.navigate("cartDetailScreen", {
      id: id,
    });
  };

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.empty}
            source={require("../../assets/empty-cart.png")}
          />
          <Text style={styles.text}>ไม่มีสินค้าในตะกร้า</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orders}
          keyExtractor={(order) => order.id.toString()}
          renderItem={(order) => (
            <OrderItem
              id={order.item.id}
              name={order.item.product.name}
              image={order.item.product.image}
              cartOrderDate={order.item.createdAt}
              price={order.item.totalPrice}
              amount={order.item.totalAmount}
              shopName={order.item.product.shop.name}
              cartDetail={cartDetail}
            />
          )}
        />
      )}
    </View>
  );
};

const MapStateToProps = (state) => ({
  user: state.user,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 130,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  empty: {
    marginRight: Platform.OS === "ios" ? 40 : 35,
    alignSelf: "center",
    width: Platform.OS === "ios" ? "50%" : "43%",
    height: Platform.OS === "ios" ? "31%" : "40%",
  },
  text: {
    marginTop: 10,
    fontSize: 20,
  },
});

export default connect(MapStateToProps)(CartScreen);
