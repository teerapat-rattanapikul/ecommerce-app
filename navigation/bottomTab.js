import React, { Fragment } from "react";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopMenuScreen from "../screens/shop/ShopMenuScreen";
import SettingScreen from "../screens/shop/SettingScreen";
import { NavigationContainer } from "@react-navigation/native";
import {
  ShopNavigation,
  OrderNavigation,
  logNavigation,
} from "./shop/ShopNavigation";
import { Button, StyleSheet, Text, View } from "react-native";
import { Platform } from "react-native";
import Colors from "../constants/Color";
import { TouchableOpacity } from "react-native-gesture-handler";
const Tab = createBottomTabNavigator();

const CustomSearchButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: "center",
      alignItems: "center",

      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: Platform.OS === "android" ? 70 : 90,
        height: Platform.OS === "android" ? 70 : 90,
        borderRadius: Platform.OS === "android" ? 35 : 45,
        paddingBottom: 10,
        backgroundColor: Colors.primary,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);
function CustomerTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          labelStyle: {
            fontSize: 15,
          },
          activeTintColor: Colors.accent,
          inactiveTintColor: Colors.primary,
          style: {
            marginBottom: 5,
            position: "absolute",
            bottom: 10,
            left: 20,
            right: 20,
            height: Platform.OS === "android" ? 70 : 80,
            borderRadius: 15,
            ...styles.shadow,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={ShopMenuScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.containerButton}>
                <Entypo
                  name="home"
                  size={Platform.OS === "android" ? 25 : 35}
                  color="black"
                  style={{
                    color: focused ? Colors.accent : Colors.primary,
                  }}
                />
                <Text
                  style={{
                    fontSize: Platform.OS === "android" ? 12 : 15,
                    color: focused ? Colors.accent : Colors.primary,
                  }}
                >
                  หน้าหลัก
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Order"
          component={OrderNavigation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.containerButton}>
                <FontAwesome
                  name="shopping-cart"
                  size={Platform.OS === "android" ? 25 : 35}
                  color="black"
                  style={{
                    color: focused ? Colors.accent : Colors.primary,
                  }}
                />
                <Text
                  style={{
                    fontSize: Platform.OS === "android" ? 12 : 15,
                    color: focused ? Colors.accent : Colors.primary,
                  }}
                >
                  ตะกร้า
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopNavigation}
          options={{
            tabBarIcon: ({ focused }) => (
              <Fragment>
                <AntDesign
                  name="search1"
                  size={Platform.OS === "android" ? 25 : 35}
                  color="black"
                  style={{
                    color: focused ? Colors.accent : "white",
                  }}
                />
                <Text
                  style={{
                    color: focused ? Colors.accent : "white",
                    fontSize: Platform.OS === "android" ? 12 : 15,
                  }}
                >
                  ค้นหาร้านค้า
                </Text>
              </Fragment>
            ),
            tabBarButton: (props) => <CustomSearchButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Log"
          component={logNavigation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.containerButton}>
                <FontAwesome5
                  name="history"
                  size={Platform.OS === "android" ? 25 : 35}
                  color="black"
                  style={{
                    color: focused ? Colors.accent : Colors.primary,
                  }}
                />
                <Text
                  style={{
                    fontSize: Platform.OS === "android" ? 12 : 15,
                    color: focused ? Colors.accent : Colors.primary,
                  }}
                >
                  ประวัติ
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="setting"
          component={SettingScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.containerButton}>
                <Ionicons
                  name="ios-settings"
                  size={Platform.OS === "android" ? 25 : 35}
                  color="black"
                  style={{
                    color: focused ? Colors.accent : Colors.primary,
                  }}
                />
                <Text
                  style={{
                    fontSize: Platform.OS === "android" ? 12 : 15,
                    color: focused ? Colors.accent : Colors.primary,
                  }}
                >
                  ตั้งค่า
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    elevation: 5,
  },
  containerButton: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
});

export default CustomerTab;
