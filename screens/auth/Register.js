import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { styles } from "./Login";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handlerReigster = () => {
    if (email.trim() === "" || name.trim() === "" || password.trim() === "") {
      Alert.alert("กรุณาใส่ข้อมูลให้ถูกต้อง");
    } else {
        const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
      axios({
        url: `http://${domainname}:8000/api/user/register`,
        method: "post",
        data: { email: email, password: password, name: name },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.status) {
          props.navigation.goBack(null);
        } else {
          Alert.alert(res.data.error);
        }
      });
    }
    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/shopping.jpg")}
      />
      <Text style={styles.text}>สมัครสมาชิก</Text>
      <View style={styles.container__input}>
        <Ionicons name="person" size={24} color="black" />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="กรุณาใส่อีเมลของท่าน"
          value={email}
        />
      </View>
      <View style={styles.container__input}>
        <MaterialIcons
          name="drive-file-rename-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setName(text);
          }}
          placeholder="กรุณาใส่ชื่อของท่าน"
          value={name}
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
      <TouchableOpacity style={styles.button} onPress={handlerReigster}>
        <Text style={styles.textBtn}>สมัครสมาชิก</Text>
      </TouchableOpacity>
      <View style={styles.bottomBar}>
        <Text style={styles.textRegister}>ท่านเป็นสมาชิกอยู่แล้ว?</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <Text style={styles.textBtn}> เข้าสู่ระบบ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   image: {
//     alignSelf: "center",
//     height: Platform.OS === "android" ? "30%" : "40%",
//     width: "100%",
//     borderRadius: Platform.OS === "android" ? 0 : 30,
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 25,
//     fontWeight: "bold",
//     marginVertical: Platform.OS === "android" ? 20 : 40,
//   },
//   input: {
//     height: 50,
//     margin: 12,
//     borderWidth: 1,
//     width: "60%",
//     marginRight: 30,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//   },
//   container__input: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   button: {
//     width: "50%",
//     backgroundColor: "#1f3140",
//     height: 50,
//     marginVertical: 20,
//     justifyContent: "center",
//     borderRadius: 20,
//   },
//   textBtn: {
//     color: "white",
//     textAlign: "center",
//     fontSize: 17,
//   },
//   textRegister: {
//     fontSize: 17,
//     color: "#1f3140",
//   },
//   bottomBar: {
//     backgroundColor: "#8d9eb2",
//     width: "100%",
//     height: Platform.OS === "android" ? 100 : 120,
//     position: "absolute",
//     bottom: 0,
//     borderRadius: Platform.OS === "android" ? 0 : 30,
//     flexDirection: "row",
//     justifyContent: "center",
//     paddingTop: 30,
//   },
// });
