import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, Entypo } from "@expo/vector-icons";
import axios from "axios";
import { connect } from "react-redux";
import { login } from "../../redux/actions/user";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlerLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("กรุณาใส่ข้อมูลให้ถูกต้อง");
    } else {
      const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
      axios({
        url: `http://${domainname}:8000/api/user/login`,
        method: "post",
        data: { email: email, password: password },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.status) {
          props.login(res.data.id, res.data.name, res.data.token, true);
          AsyncStorage.setItem("token", res.data.token);
        } else {
          Alert.alert(res.data.error);
        }
      });
      setPassword("");
      setEmail("");
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/shopping.jpg")}
      />
      <Text style={styles.text}>เข้าสู่ระบบ</Text>
      <View style={styles.container__input}>
        <Ionicons name="person" size={24} color="black" />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          placeholder="กรุณาใส่อีเมลของท่าน"
          value={email}
        />
      </View>
      <View style={styles.container__input}>
        <Entypo name="lock" size={24} color="black" />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
          }}
          placeholder="กรุณาใส่รหัสผ่านของท่าน"
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlerLogin}>
        <Text style={styles.textBtn}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>
      <View style={styles.bottomBar}>
        <Text style={styles.textRegister}>ผู้ใช้งานใหม่?</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Register");
          }}
        >
          <Text style={styles.textBtn}> สมัครสมาชิก</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MapStateToProps = (state) => ({
  user: state.user,
});

const MapDispatchToProps = {
  login: login,
};
export default connect(MapStateToProps, MapDispatchToProps)(Login);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    alignSelf: "center",
    height: Platform.OS === "android" ? "30%" : "40%",
    width: "100%",
    borderRadius: Platform.OS === "android" ? 0 : 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: Platform.OS === "android" ? 20 : 40,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    width: "60%",
    marginRight: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  container__input: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    width: "50%",
    backgroundColor: "#1f3140",
    height: 50,
    marginVertical: 20,
    justifyContent: "center",
    borderRadius: 20,
  },
  textBtn: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
  textRegister: {
    fontSize: 17,
    color: "#1f3140",
  },
  bottomBar: {
    backgroundColor: "#8d9eb2",
    width: "100%",
    height: Platform.OS === "android" ? 100 : 120,
    position: "absolute",
    bottom: 0,
    borderRadius: Platform.OS === "android" ? 0 : 30,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 30,
  },
});
