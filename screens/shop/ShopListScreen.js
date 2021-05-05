import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Colors from "../../constants/Color";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import ShopItem from "../../components/shops/ShopItem";
import ProductItem from "../../components/shops/ProductItem";
import { useIsFocused } from "@react-navigation/native";

const ShopListScreen = (props) => {
  const [search, setSearch] = useState("");
  const [shopList, setShopList] = useState(0);
  const [shopAmount, setShopAmount] = useState(0);
  const [productAmount, setProductAmount] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchItem, setSearchItem] = useState([]);
  const isFocused = useIsFocused();
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  useEffect(() => {
    if (isSearch && notFound) {
      setIsSearch(false);
      setSearch("");
    }
    axios({
      url: `http://${domainname}:8000/api/shop/allShop`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => setShopList(res.data));
  }, [isFocused]);

  const handlerSearch = () => {
    if (search.trim() === "") {
      Alert.alert("กรุณาใส่คำค้นหา");
    } else {
      axios({
        url: `http://${domainname}:8000/api/shop/search`,
        method: "post",
        data: { search: search.trim() },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setIsSearch(true);
        if (
          res.data.shopList.length === 0 &&
          res.data.productList.length === 0
        ) {
          setNotFound(true);
        } else {
          setNotFound(false);
          setSearchItem(res.data.shopList.concat(res.data.productList));
          setShopAmount(res.data.shopList.length);
          setProductAmount(res.data.productList.length);
        }
      });
    }
  };

  const shopHandler = (shopId) => {
    props.navigation.navigate("shopDetail", { shopId: shopId });
  };

  const productHandler = (productId, shopId) => {
    props.navigation.navigate("productDetail", {
      productId: productId,
      shopId: shopId,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearch(text)}
          placeholder="กรุณาใส่ ชื่อร้านค้า หรือ สินค้า เพื่อค้นหา"
          placeholderTextColor={Colors.accent}
          value={search}
        />
        <AntDesign
          name="search1"
          size={40}
          color="black"
          onPress={handlerSearch}
        />
      </View>
      <View style={styles.container__item}>
        {!isSearch ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={shopList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(shop) => (
              <ShopItem
                name={shop.item.name}
                id={shop.item.id}
                shopHandler={shopHandler}
              />
            )}
          />
        ) : (
          <Fragment>
            {notFound ? (
              <Text style={styles.text}>ไม่เจอข้อมูลที่ท่านค้นหา</Text>
            ) : (
              <Fragment>
                <Text style={styles.text}>
                  ผลการค้นหาพบ {shopAmount} ร้านค้า และ สินค้า {productAmount}{" "}
                  ชิ้น
                </Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={searchItem}
                  keyExtractor={(item) => item.id.toString() + item.name}
                  renderItem={(item) =>
                    item.item.image ? (
                      <ProductItem
                        id={item.item.id}
                        name={item.item.name}
                        price={item.item.price}
                        image={item.item.image}
                        shopId={item.item.shopId}
                        productHandler={productHandler}
                      />
                    ) : (
                      <ShopItem
                        name={item.item.name}
                        id={item.item.id}
                        shopHandler={shopHandler}
                      />
                    )
                  }
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primary,
    justifyContent: "flex-end",
  },
  container__item: {
    flex: Platform.OS === "android" ? 0.85 : 0.9,
    backgroundColor: "#fff",
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 130,
  },
  input: {
    height: Platform.OS === "android" ? 30 : 40,
    margin: 12,
    borderWidth: 1,
    width: "70%",
    marginRight: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: Colors.accent,
    backgroundColor: "#becddb",
  },
  search: {
    flexDirection: "row",
    justifyContent: "center",
    flex: Platform.OS === "android" ? 0.15 : 0.1,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: Colors.accent,
    textAlign: "center",
    fontSize: 15,
  },
});

export default ShopListScreen;
