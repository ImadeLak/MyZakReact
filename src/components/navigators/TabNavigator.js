import React from "react";
import { View } from "react-native";
import { Icon } from "native-base";
import { createMaterialTopTabNavigator } from "react-navigation";

import TabSituation from "../tabs/TabSituation";
import { StackNavigatorSituation } from "../tabs/TabSituation";
import TabStats from "../tabs/TabStats";
import ListBlocs from "../tabs/ListBlocs";
import PIN from "../screens/screenPIN";
import Test from "../screens/Test";

import styles, { MAINCOLOR } from "../../style/zakStyles";

export default createMaterialTopTabNavigator(
  {
    Home: {
      screen: props => (
        <StackNavigatorSituation
          screenProps={{ drawerNavigation: props.navigation }}
        />
      ),
      navigationOptions: {
        tabBarLabel: "Accueil",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="SimpleLineIcons"
            name="drop"
            style={{ fontSize: 24, color: tintColor }}
          />
        )
      }
    },
    /*Stats: {
      screen: Test,
      navigationOptions: {
        tabBarLabel: "Test",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="Feather"
            name="pie-chart"
            style={{ fontSize: 24, color: tintColor }}
          />
        )
      }
    },*/
    Historique: {
      screen: ListBlocs,
      navigationOptions: {
        tabBarLabel: "Historique",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="MaterialCommunityIcons"
            name="history"
            style={{ fontSize: 24, color: tintColor }}
          />
        )
      }
    }
  },

  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: MAINCOLOR,
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "#FFF",
        height: 60,
        margin: 0,
        borderColor: "transparent"
      },
      labelStyle: {
        fontSize: 13,
        marginTop: 2,
        marginBottom: 5
      },
      indicatorStyle: {
        backgroundColor: MAINCOLOR
      },
      showIcon: true
    }
  }
);
