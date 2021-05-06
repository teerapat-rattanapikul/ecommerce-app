import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShopListScreen from "../../screens/shop/ShopListScreen";
import ShopDetailScreen from "../../screens/shop/ShopDetailScreen";
import CartScreen from "../../screens/shop/CartScreen";
import ProductDetailScreen from "../../screens/shop/ProductDetailScreen";
import CartDetailScreen from "../../screens/shop/CartDetailScreen";
import LogScreen from "../../screens/shop/LogScreen";
import ShopMenuScreen from "../../screens/shop/ShopMenuScreen";
import Colors from "../../constants/Color";
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
const Stack = createStackNavigator();

export const ShopNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleStyle:
          Platform.OS === "android"
            ? {
                position: "absolute",
                right: "37%",
                top: -15,
                textAlign: "center",
              }
            : null,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("cartScreen");
            }}
          >
            <FontAwesome
              name="shopping-cart"
              size={25}
              color={Colors.accent}
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="shopList"
        component={ShopListScreen}
        options={{
          title: "ค้นหาร้านค้า",
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="shopDetail"
        component={ShopDetailScreen}
        options={{
          title: "รายละเอียดร้าน",
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="productDetail"
        component={ProductDetailScreen}
        options={{
          title: "รายละเอียดสินค้า",
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { alignSelf: "center" },
      }}
    >
      <Stack.Screen
        name="menuScreen"
        component={ShopMenuScreen}
        options={{
          headerShown: false,
          title: "เมนู",
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="cartScreen"
        component={CartScreen}
        options={{
          title: "สินค้าในตะกร้า",
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="cartDetailScreen"
        component={CartDetailScreen}
        options={{
          title: "รายละเอียดสินค้าในตะกร้า",
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="logScreen"
        component={LogScreen}
        options={{
          title: "ประวัติการสั่งซื้อ",
          headerTintColor: Colors.accent,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};
