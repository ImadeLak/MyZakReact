import React from "react";
//import Home from "../screens/Home";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import HomeTabNavigator from "./TabNavigator";
import ReglageScreen from "../screens/ReglageScreen";
import CompteBancaireScreen from "../screens/ReglageCompteBancaire/CompteBancaireScreen";
import Logout from "../screens/Logout";
import { Header, Body, Container, Content, H2, Text } from "native-base";
import { Image, View, AppState } from "react-native";
import { MAINCOLOR } from "../../style/zakStyles";

/*export default class Tmp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <MonDrawer screenProps={this.props.navigation} />;
  }
}*/

export const MonCustomDrawer = props => (
  <Container>
    <Header style={{ height: 100, backgroundColor: MAINCOLOR }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          marginBottom: 10
        }}
      >
        <Image
          source={require("../../style/images/drop.png")}
          style={{ width: 30, height: 35 }}
        />
        <Text style={{ color: "white", marginLeft: 10, fontSize: 20 }}>
          {" "}
          MyZakat{" "}
        </Text>
      </View>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

export const MonDrawer = createDrawerNavigator(
  {
    Accueil: {
      screen: HomeTabNavigator,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Reglage: { screen: ReglageScreen },
    Comptes: { screen: CompteBancaireScreen },
    Logout: { screen: Logout }
  },
  {
    initalRouteName: "Accueil",
    mode: "modal",
    contentComponent: MonCustomDrawer,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);
