import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import LogItem from "../../components/shops/LogItem";
import { useIsFocused } from "@react-navigation/native";
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { FontAwesome } from "@expo/vector-icons";
const LogScreen = (props) => {
  const domainname = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    });
  }, [isFocused]);
  return (
    <View style={styles.container}>
      {loading ? (
        <Placeholder Animation={Fade}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              height: "100%",
              alignItems: "flex-start",
              justifyContent: "space-around",
            }}
          >
            {[0, 0, 0].map((value, index) => (
              <PlaceholderLine
                key={index}
                width={90}
                height={200}
                style={{
                  marginTop: 20,
                  borderRadius: 10,
                  marginBottom: 40,
                }}
              />
            ))}
          </View>
        </Placeholder>
      ) : (
        <Fragment>
          {logs.length === 0 ? (
            <View style={styles.notfound}>
              <FontAwesome name="calendar-times-o" size={120} color="black" />
              <Text style={styles.text}>ยังไม่มีประวัติการสั่งซื้อ</Text>
            </View>
          ) : (
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
          )}
        </Fragment>
      )}
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
  notfound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginVertical: 10,
    fontSize: 20,
  },
});
export default connect(MapStateToProps)(LogScreen);
