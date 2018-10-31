import React from "react";
import { createStackNavigator } from "react-navigation";
import {
  ChoisirBanque,
  SaisirLogin,
  SaisirPassword
} from "../Situation/AddBank";

import {
  Text,
  Container,
  Content,
  ListItem,
  List,
  Icon,
  Button,
  Toast
} from "native-base";
import { View, TouchableOpacity, Alert } from "react-native";
import {
  material,
  systemWeights,
  materialColors
} from "react-native-typography";

import HeaderBack from "../../headers/HeaderBack";
import DetailCompteScreen from "./DetailCompteScreen";
import styles, { MAINCOLOR, CLAIR } from "../../../style/zakStyles";

import { connect } from "react-redux";

export default class Main extends React.Component {
  static navigationOptions = {
    drawerLabel: "Mes comptes bancaire",
    drawerIcon: (
      <Icon
        type="SimpleLineIcons"
        name="credit-card"
        style={{ fontSize: 24, color: MAINCOLOR }}
      />
    )
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <RootStackNav screenProps={this.props.navigation} />;
  }
}

class ClassCompteBancaireScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <HeaderBack
          backgroundColor={MAINCOLOR}
          title="Mes comptes bancaires"
          navigator={this.props.screenProps}
        />
        <Content style={{ paddingTop: 10 }}>
          {this.props.comptesBancaire.map((compteBancaire, key) => {
            return (
              <View key={key} style={styles.tuile}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("DetailCompte", {
                      ID: compteBancaire.id_compteBancaire
                    })
                  }
                >
                  <View style={styles.tuileLigneUne}>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 20,
                        justifyContent: "flex-start"
                      }}
                    >
                      <Text
                        style={[
                          material.body1,
                          systemWeights.regular,
                          { color: MAINCOLOR }
                        ]}
                      >
                        {compteBancaire.nom_banque}
                      </Text>
                    </View>
                    <Text
                      style={[
                        material.subheading,
                        systemWeights.light,
                        { color: materialColors.blackSecondary }
                      ]}
                    >
                      {compteBancaire.login_compteBancaire}
                    </Text>

                    <Icon
                      type="Feather"
                      name="edit-2"
                      style={{ fontSize: 20, color: MAINCOLOR, marginLeft: 15 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}

          <Button
            rounded
            block
            style={{
              backgroundColor: MAINCOLOR,
              marginHorizontal: 15,
              marginTop: 15,
              marginBottom: 15
            }}
            onPress={() => this.props.navigation.navigate("ChoisirBanque")}
          >
            <Text>Ajouter un compte</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

// This function provides access to data in the Redux state in the React component
// In this example, the value of this.props.count will now always have the same value
// As the count value in the Redux state
function mapStateToProps(state) {
  return {
    comptesBancaire: state.dataReducer.comptesBancaire
  };
}
// This function provides a means of sending actions so that data in the Redux store
// can be modified. In this example, calling this.props.addToCounter() will now dispatch
// (send) an action so that the reducer can update the Redux state.

export const CompteBancaireScreen = connect(
  mapStateToProps,
  {}
)(ClassCompteBancaireScreen);

export const RootStackNav = createStackNavigator({
  Demarrage: {
    screen: CompteBancaireScreen,
    navigationOptions: {
      header: null
    }
  },
  DetailCompte: {
    screen: DetailCompteScreen,
    navigationOptions: {
      header: null
    }
  },
  ChoisirBanque: {
    screen: ChoisirBanque,
    navigationOptions: {
      header: null
    }
  },
  SaisirLogin: {
    screen: SaisirLogin,
    navigationOptions: {
      header: null
    }
  },
  SaisirPassword: {
    screen: SaisirPassword,
    navigationOptions: {
      header: null
    }
  }
});
