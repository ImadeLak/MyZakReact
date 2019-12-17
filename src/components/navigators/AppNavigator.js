import React from "react";
import { Root } from "native-base";
import { View, Text } from "react-native";

//Les sreens

import LoginScreen from "../screens/LoginScreen";

//import Home from "../screens/Home";
import { MonDrawer } from "../navigators/HomeDrawerNavigator";

import * as SecureStore from "expo-secure-store";

import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

import { NavigationActions, StackActions } from "react-navigation";

import { LoginPIN, DefinirPIN, ConfirmerPIN } from "../screens/screenPIN";

//test sof
/*const choix = () => {
  try {
    pin = SecureStore.getItemAsync("pin");

    if (pin != null) {
      return "Home";
      //this.props.navigation.navigate("Home");
    } else {
      return "Login";
      //this.props.navigation.navigate("Login");
    }
  } catch (e) {
    console.log("erreur :", e);
    return "Login";
    //this.props.navigation.navigate("Login");
  }
};
*/
export class ChoixScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
  async componentDidMount() {
    try {
      pin = await SecureStore.getItemAsync("pin");
      APIToken = await SecureStore.getItemAsync("APIToken");
      console.log("APIToken et PIN", APIToken + " " + pin);
      if (pin != null && APIToken != null) {
        route = "LoginPIN";
      } else {
        route = "LoginPIN";
      }
    } catch (e) {
      console.log("erreur :", e);
      route = "Login";
    }

    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: route })]
      })
    );
  }
}

class Test extends React.Component {
  constructor(props) {
    super(props);
    console.log("CONSTRUCTEUR DE TEST");
  }
  render() {
    console.log("RENDER DE TEST");
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

export const RootStack = createStackNavigator(
  {
    Test: {
      screen: Test,
      navigationOptions: {
        header: null
      }
    }
  },

  {
    initialRouteName: "Test"
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
