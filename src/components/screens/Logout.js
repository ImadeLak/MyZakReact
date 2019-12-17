import React, { Component } from "react";
import { AsyncStorage, View } from "react-native";
import { Icon } from "native-base";
import { NavigationActions, StackActions } from "react-navigation";
import { MAINCOLOR } from "../../style/zakStyles";

import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";

export default class Logout extends Component {
  static navigationOptions = {
    drawerLabel: "Déconnexion",
    drawerIcon: (
      <Icon
        type="SimpleLineIcons"
        name="logout"
        style={{ fontSize: 24, color: MAINCOLOR }}
      />
    )
  };

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    await SecureStore.deleteItemAsync("APIToken");
    await SecureStore.deleteItemAsync("pin");
    //this.props.majUserSituations([])
    //console.log(this.props);
    this.props.screenProps.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: "Login" })]
      })
    );
  }
  render() {
    return <View />;
  }
}
