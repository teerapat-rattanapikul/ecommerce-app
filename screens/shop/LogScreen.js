import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import LogItem from "../../components/shops/LogItem";
import { useIsFocused } from "@react-navigation/native";
const LogScreen = (props) => {
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  const [logs, setLogs] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    axios({
      url: `http://${domainname}:8000/api/order/customerLog`,
      method: "post",
      data: {
        userId: props.user.id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setLogs(res.data);
    });
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={logs}
        keyExtractor={(log) => log.id.toString()}
        renderItem={(log) => (
          <LogItem
            id={log.item.id}
            name={log.item.product.name}
            image={log.item.product.image}
            logDate={log.item.createdAt}
            status={log.item.status}
            totalAmount={log.item.totalAmount}
            totalPrice={log.item.totalPrice}
            shop={log.item.product.shop.name}
          />
        )}
      />
    </View>
  );
};

const MapStateToProps = (state) => ({
  user: state.user,
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 130,
  },
});
export default connect(MapStateToProps)(LogScreen);
