import React from "react";
import { Root } from "native-base";
import { View } from "react-native";

//Les sreens

import LoginScreen from "../screens/LoginScreen";

//import Home from "../screens/Home";
import { MonDrawer } from "../navigators/HomeDrawerNavigator";

import { SecureStore } from "expo";

import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { NavigationActions, StackActions } from "react-navigation";

import { LoginPIN, DefinirPIN, ConfirmerPIN } from "../screens/screenPIN";

export default class AppNavigator extends React.Component {
  render() {
    return (
      //Le Root pour le Toast
      <Root>
        <MonAppNavigator />
      </Root>
    );
  }
}

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
    return <View />;
  }
  async componentDidMount() {
    try {
      pin = await SecureStore.getItemAsync("pin");
      APIToken = await SecureStore.getItemAsync("APIToken");
      console.log("APIToken et PIN", APIToken + " " + pin);
      if (pin != null && APIToken != null) {
        route = "LoginPIN";
      } else {
        route = "Login";
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

export const MonAppNavigator = createStackNavigator(
  {
    Home: {
      screen: MonDrawer,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Choix: {
      screen: ChoixScreen,
      navigationOptions: {
        header: null
      }
    },
    DefinirPIN: {
      screen: DefinirPIN,
      navigationOptions: {
        header: null
      }
    },
    ConfirmerPIN: {
      screen: ConfirmerPIN,
      navigationOptions: {
        header: null
      }
    },
    LoginPIN: {
      screen: LoginPIN,
      navigationOptions: {
        header: null
      }
    }
  },

  {
    initialRouteName: "Choix"
  }
);
