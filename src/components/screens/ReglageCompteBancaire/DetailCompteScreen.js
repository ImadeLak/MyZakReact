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
  Button
} from "native-base";
import { View, TouchableOpacity, Alert } from "react-native";
import {
  material,
  systemWeights,
  materialColors
} from "react-native-typography";

import HeaderBack from "../../headers/HeaderBack";
import styles, { MAINCOLOR, CLAIR } from "../../../style/zakStyles";

import { connect } from "react-redux";

import {
  APIdeleteCompteBancaire,
  APIgetUserHistorique
} from "../../../lib/DjangoAPI";
import { setComptesBancaire } from "../../../actions/MesActions";

class ClassDetailCompteScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const ID = this.props.navigation.getParam("ID");

    compte = "";
    this.props.comptesBancaire.forEach(function(cpt) {
      if (cpt.id_compteBancaire == ID) {
        compte = cpt;
      }
    });
    console.log(compte);

    return (
      <Container>
        <HeaderBack
          backgroundColor={MAINCOLOR}
          title="Détails du compte"
          navigator={this.props.navigation}
        />
        <Content style={{ paddingTop: 10 }}>
          <List>
            <ListItem
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Banque</Text>
              <Text>{compte.nom_banque}</Text>
            </ListItem>
            <ListItem
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Identifiant</Text>
              <Text>{compte.login_compteBancaire}</Text>
            </ListItem>
            <ListItem
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Mot de passe</Text>
              <Text>***********</Text>
            </ListItem>
          </List>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              rounded
              block
              style={{
                backgroundColor: MAINCOLOR,
                marginHorizontal: 15,
                marginTop: 15,
                marginBottom: 15
              }}
            >
              <Text>Editer</Text>
            </Button>
            <Button
              rounded
              block
              style={{
                backgroundColor: "red",
                marginHorizontal: 15,
                marginTop: 15,
                marginBottom: 15
              }}
              onPress={() => {
                Alert.alert("Suppression du compte", "Etes vous sur ?", [
                  {
                    text: "Annuler",
                    onPress: () => console.log("Cancel Pressed")
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      APIdeleteCompteBancaire(compte.id_compteBancaire).then(
                        responseDataDelete => {
                          APIgetUserHistorique().then(responseData => {
                            console.log(
                              "Recuperation Datas apres suppression compte"
                            );
                            this.props.setComptesBancaire(responseData.comptes);
                            this.props.navigation.navigate("Demarrage", {
                              toast: "Compte supprimé"
                            });
                          });
                        }
                      );
                    }
                  }
                ]);
              }}
            >
              <Text>Supprimer</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    comptesBancaire: state.dataReducer.comptesBancaire
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setComptesBancaire: data => dispatch(setComptesBancaire(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassDetailCompteScreen);
