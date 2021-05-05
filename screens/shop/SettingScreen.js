import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { logout } from "../../redux/actions/user";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SettingScreen = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert(
            "ออกจากระบบ",
            "คุณต้องการที่จะออกจากระบบหรือใหม่",
            [
              {
                text: "ไม่",
                style: "cancel",
              },
              {
                text: "ใช่",
                onPress: async () => {
                  await AsyncStorage.removeItem("token");
                  props.logout();
                },
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Text style={styles.text}>ออกจากระบบ</Text>
        <MaterialCommunityIcons name="logout" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  button: {
    alignSelf: "center",
    width: "80%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const MapStateToProps = (state) => ({
  user: state.user,
});
const MapDispatchToProps = {
  logout: logout,
};

export default connect(MapStateToProps, MapDispatchToProps)(SettingScreen);
