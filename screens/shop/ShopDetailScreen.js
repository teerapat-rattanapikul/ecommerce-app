import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProductItem from "../../components/shops/ProductItem";
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { SimpleLineIcons } from "@expo/vector-icons";
import Colors from "../../constants/Color";
const ShopDetailScreen = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    }).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);
  const productHandler = (productId, shop) => {
    props.navigation.navigate("productDetail", {
      productId: productId,
      shopId: shop,
    });
  };
  return (
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
            {[0, 0].map((value, index) => (
              <PlaceholderLine
                key={index}
                width={92}
                height={300}
                style={{
                  borderRadius: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />
            ))}
          </View>
        </Placeholder>
      ) : (
        <Fragment>
          {products.length > 0 ? (
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
          ) : (
            <View style={styles.notfound}>
              <SimpleLineIcons
                name="social-dropbox"
                size={120}
                color={Colors.accent}
              />
              <Text style={styles.text}>ไม่เจอสินค้า</Text>
            </View>
          )}
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 130,
  },
  notfound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginVertical: 10,
    fontSize: 20,
  },
});

export default ShopDetailScreen;
