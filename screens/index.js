import React, { Fragment, useEffect, useState } from "react";
import AuthNaivgation from "../navigation/auth/AuthNavigation";
import CustomerTab from "../navigation/bottomTab";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../redux/actions/user";
import axios from "axios";
const MainScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios({
          url: `http://${domainname}:8000/api/user/tokenCheck`,
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }).then((res) => {
          props.login(res.data.id, res.data.name, token, true);
        });
      }
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <Fragment>
      {loading ? null : (
        <Fragment>
          {props.user.status ? <CustomerTab /> : <AuthNaivgation />}
        </Fragment>
      )}
    </Fragment>
  );
};
const MapStateToProps = (state) => ({
  user: state.user,
});
const MapDispatchToProps = {
  login: login,
};
export default connect(MapStateToProps, MapDispatchToProps)(MainScreen);
