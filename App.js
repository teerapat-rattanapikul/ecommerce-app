import React, { Fragment, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import store from "./redux/store";
import MainScreen from "./screens";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
