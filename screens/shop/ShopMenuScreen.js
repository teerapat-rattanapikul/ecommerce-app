import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Colors from "../../constants/Color";
const ShopMenuScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/shopping.jpg")}
      />
      <View style={styles.container__menu}>
        <TouchableOpacity
          style={{ ...styles.item, width: "90%" }}
          onPress={() => {
            props.navigation.navigate("Shop");
          }}
        >
          <MaterialCommunityIcons
            name="store"
            size={60}
            color={Colors.accent}
          />
          <Text style={{ ...styles.text, fontSize: 20 }}>ร้านค้า</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            props.navigation.navigate("cartScreen");
          }}
        >
          <FontAwesome name="shopping-cart" size={50} color={Colors.accent} />
          <Text style={styles.text}>ตะกร้าสินค้า</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            props.navigation.navigate("logScreen");
          }}
        >
          <FontAwesome5 name="history" size={50} color={Colors.accent} />
          <Text style={styles.text}>ประวัติการสั่ง</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const MapStateToProps = (state) => ({
  user: state.user,
});

export default connect(MapStateToProps)(ShopMenuScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primary,
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: Platform.OS === "android" ? 250 : 380,
    position: "absolute",
    top: 0,
  },
  container__menu: {
    width: "100%",
    backgroundColor: "#fff",
    flex: Platform.OS === "android" ? 0.65 : 0.6,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    elevation: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: "40%",
    marginTop: Platform.OS === "android" ? 30 : 60,
    marginHorizontal: 20,
    borderRadius: 10,
    height: 100,
    backgroundColor: "white",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.accent,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: Colors.accent,
    marginHorizontal: 5,
  },
});
