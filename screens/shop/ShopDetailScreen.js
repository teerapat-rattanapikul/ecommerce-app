import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProductItem from "../../components/shops/ProductItem";
const ShopDetailScreen = (props) => {
  const [products, setProducts] = useState([]);
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  useEffect(() => {
    const { shopId } = props.route.params;
    axios({
      url: `http://${domainname}:8000/api/product/customerGet`,
      method: "post",
      data: { shopId: shopId },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => setProducts(res.data));
  }, []);
  const productHandler = (productId, shop) => {
    props.navigation.navigate("productDetail", {
      productId: productId,
      shopId: shop,
    });
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={(product) => product.id.toString()}
        renderItem={(product) => (
          <ProductItem
            id={product.item.id}
            name={product.item.name}
            price={product.item.price}
            image={product.item.image}
            shopId={product.item.shopId}
            productHandler={productHandler}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 130,
  },
});

export default ShopDetailScreen;
