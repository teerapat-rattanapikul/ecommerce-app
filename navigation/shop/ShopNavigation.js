import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShopListScreen from "../../screens/shop/ShopListScreen";
import ShopDetailScreen from "../../screens/shop/ShopDetailScreen";
import CartScreen from "../../screens/shop/CartScreen";
import ProductDetailScreen from "../../screens/shop/ProductDetailScreen";
import CartDetailScreen from "../../screens/shop/CartDetailScreen";
import LogScreen from "../../screens/shop/LogScreen";
import { NavigationContainer } from "@react-navigation/native";
import Colors from "../../constants/Color";
import { Platform } from "react-native";
const Stack = createStackNavigator();

export const ShopNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle:
          Platform.OS === "android"
            ? {
                position: "absolute",
                right: "37%",
                top: -15,
                textAlign: "center",
              }
            : null,
      }}
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

export const OrderNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleStyle: { alignSelf: "center" } }}
    >
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
    </Stack.Navigator>
  );
};

export const logNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleStyle: { alignSelf: "center" } }}
    >
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
