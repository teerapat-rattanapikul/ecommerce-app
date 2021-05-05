import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/auth/Login";
import Reigster from "../../screens/auth/Register";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function AuthNaivgation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          userLogin={props.userLogin}
        />
        <Stack.Screen name="Register" component={Reigster} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNaivgation;
