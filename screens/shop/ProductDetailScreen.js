import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Color";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { numberWithCommas } from "../../helppers/moneyFormat";
const ProductDetailScreen = (props) => {
  const [productDetail, setProductDetail] = useState();
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  const { productId, shopId } = props.route.params;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      url: `http://${domainname}:8000/api/product/customerGetDetail`,
      method: "post",
      data: { productId: productId },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setProductDetail(res.data);
      setLoading(false);
    });
  }, []);

  const orderHandler = () => {
    axios({
      url: `http://${domainname}:8000/api/order/addOrder`,
      method: "post",
      data: {
        totalPrice: productDetail.price,
        totalAmount: 1,
        productId: productDetail.id,
        userId: props.user.id,
        shopId: shopId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data) {
        props.navigation.navigate("cartScreen", {
          id: res.data.id,
        });
      }
    });
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
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
                width={92}
                height={400}
                style={{
                  borderRadius: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />
              {[0, 0, 0, 0].map((value, index) => (
                <PlaceholderLine
                  key={index}
                  width={92}
                  height={50}
                  style={{
                    borderRadius: 10,
                    marginBottom: 20,
                  }}
                />
              ))}
            </View>
          </Placeholder>
        ) : (
          <Fragment>
            {productDetail ? (
              <Fragment>
                <Image
                  style={styles.image}
                  source={{
                    uri: `http://${domainname}:8000/${productDetail.image}`,
                  }}
                />
                <View style={styles.detail}>
                  <Text style={styles.text}>?????????????????????????????? :</Text>
                  <Text style={styles.text}>{productDetail.name}</Text>
                </View>
                <View style={styles.detail}>
                  <Text style={styles.text}>???????????????????????????????????????????????? :</Text>
                  <Text style={styles.text}>{productDetail.detail}</Text>
                </View>
                <View style={styles.detail}>
                  <Text style={styles.text}>?????????????????????????????? :</Text>
                  <Text style={styles.text}>
                    {numberWithCommas(productDetail.price)} ?????????
                  </Text>
                </View>
                <View style={styles.detail}>
                  <Text style={styles.text}>??????????????????????????????????????? :</Text>
                  <Text style={styles.text}>
                    {numberWithCommas(productDetail.amount)} ????????????
                  </Text>
                </View>
              </Fragment>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={orderHandler}>
              <Text style={styles.textbtn}>??????????????????????????????</Text>
              <FontAwesome5 name="cart-arrow-down" size={25} color="black" />
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "flex-start",
    paddingBottom: 130,
  },
  image: {
    marginTop: 5,
    backgroundColor: "#fff",
    alignSelf: "center",
    height: 450,
    width: "90%",
    borderRadius: 10,
  },
  detail: {
    backgroundColor: Colors.accent,
    marginTop: 10,
    width: "90%",
    minHeight: 50,
    height: "auto",
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexWrap: "wrap",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  button: {
    marginVertical: 15,
    width: "90%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#becddb",
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 5,
  },
  textbtn: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
});

const MapStateToProps = (state) => ({
  user: state.user,
});
export default connect(MapStateToProps)(ProductDetailScreen);
