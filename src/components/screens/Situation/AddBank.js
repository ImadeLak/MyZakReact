import React, { Component } from "react";
import {
  Text,
  Icon,
  Button,
  Picker,
  Item,
  Input,
  Content,
  Toast
} from "native-base";
import { View, Alert } from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import HeaderBack from "../../headers/HeaderBack";
import styles, {
  GREEN,
  GREY,
  RED,
  MAINCOLOR,
  CLAIR
} from "../../../style/zakStyles";

import { connect } from "react-redux";
import {
  addBankBank,
  addBankMdp,
  addBankLogin,
  setComptesBancaire,
  setHistoriqueBanque
} from "../../../actions/MesActions";

import {
  APIpostCompteBancaire,
  APIgetUserHistorique,
  APImajSolde
} from "../../../lib/DjangoAPI";

// This function provides access to data in the Redux state in the React component
function mapStateToProps(state) {
  return {
    reducer_banque: state.addCptBankReducer.addBankBank,
    reducer_login: state.addCptBankReducer.addBankLogin,
    reducer_mdp: state.addCptBankReducer.addBankMdp
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addBankBank: idBank => dispatch(addBankBank(idBank)),
    addBankLogin: login => dispatch(addBankLogin(login)),
    addBankMdp: mdp => dispatch(addBankMdp(mdp)),
    setHistoriqueBanque: data => dispatch(setHistoriqueBanque(data)),
    setComptesBancaire: data => dispatch(setComptesBancaire(data))
  };
}

//export default connect(mapStateToProps, mapDispatchToProps)(SituationResume)

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

class ClassChoisirBanque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      banques: [
        { nom_banque: "LCL", id_banque: 1 },
        { nom_banque: "N26", id_banque: 4 },
        { nom_banque: "Hello Bank", id_banque: 5 }
      ]
    };
  }

  selectionBanque(value: string) {
    this.setState({
      selected: value
    });
    this.props.addBankBank(value);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={[1, 0]}
          end={[0, 1]}
          colors={["#74b9ff", "#0984e3"]}
          style={{ elevation: 5 }}
        >
          <HeaderBack
            title="Ajouter un compte"
            navigator={this.props.navigation}
          />
        </LinearGradient>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderBottomColor: "#bbb",
            borderBottomWidth: 0.5,
            padding: 15
          }}
        >
          <Picker
            selectedValue={this.state.selected}
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            headerStyle={{ backgroundColor: MAINCOLOR }}
            headerBackButtonTextStyle={{ color: "#fff" }}
            headerTitleStyle={{ color: "#fff" }}
            onValueChange={this.selectionBanque.bind(this)}
          >
            {this.state.banques.map((i, index) => (
              <Picker.Item
                key={index}
                label={i.nom_banque}
                value={i.id_banque}
              />
            ))}
          </Picker>
        </View>

        <Button
          rounded
          block
          style={{
            backgroundColor: MAINCOLOR,
            marginHorizontal: 15,
            marginTop: 15
          }}
          onPress={() => this.props.navigation.navigate("SaisirLogin")}
        >
          <Text>Suivant</Text>
        </Button>
      </View>
    );
  }
}
export const ChoisirBanque = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassChoisirBanque);

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
class ClassSaisirLogin extends Component {
  constructor(props) {
    super(props);
  }

  selectionLogin(value: string) {
    this.props.addBankLogin(value);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={[1, 0]}
          end={[0, 1]}
          colors={["#74b9ff", "#0984e3"]}
          style={{ elevation: 5 }}
        >
          <HeaderBack
            title="Ajouter un compte"
            navigator={this.props.navigation}
          />
        </LinearGradient>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderBottomColor: "#bbb",
            borderBottomWidth: 0.5,
            padding: 15
          }}
        >
          <Content style={{ padding: 15, width: 200 }}>
            <Item rounded>
              <Input
                autoFocus={true}
                onChangeText={this.selectionLogin.bind(this)}
                placeholder="Identifiant"
              />
            </Item>
          </Content>
        </View>

        <Button
          rounded
          block
          style={{
            backgroundColor: MAINCOLOR,
            marginHorizontal: 15,
            marginTop: 15
          }}
          onPress={() => this.props.navigation.navigate("SaisirPassword")}
        >
          <Text>Suivant</Text>
        </Button>
      </View>
    );
  }
}
export const SaisirLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassSaisirLogin);

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

class ClassSaisirPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      etat: ""
    };
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  selectionMdp(value: string) {
    this.props.addBankMdp(value);
  }

  _validationRequete = () => {
    this.setState({ etat: "verificationCompte" });
    //Envoi du POST avec les infos saisies, ont verifie si c'est bon
    APIpostCompteBancaire(
      this.props.reducer_banque.toString(),
      this.props.reducer_login,
      this.props.reducer_mdp
    ).then(responseData => {
      if (responseData != "KO") {
        // On met à jour les infos en base de tous les comptes
        this.setState({ etat: "majDesSoldes" });
        if (this.mounted)
          APImajSolde().then(responseData => {
            // Une fois fait, on vérifie que qu'on est toujours la et on fait une request
            // Pour recuperer les dernieres infos
            if (this.mounted)
              APIgetUserHistorique().then(responseData => {
                this.setState({ etat: "fini" });
                //Maj du reducer
                this.props.setHistoriqueBanque(
                  responseData.situation.historique_banque.dates
                );
                this.props.setComptesBancaire(responseData.comptes);

                Toast.show({
                  text: "Infos mises à jour!",
                  buttonText: "Ok",
                  style: { backgroundColor: CLAIR, height: 60 },
                  duration: 2000
                });

                //Reset du reducer AddBank
                this.props.addBankBank(1);
                this.props.addBankLogin("");
                this.props.addBankMdp("");

                //this.props.navigation.navigate('Demarrage',{toast:'Compte ajouté'})
              });
          });
      } else {
        //InfoIncorrect
        this.setState({ etat: "erreur" });
        //Alert.alert("Erreur de connexion")
      }
    });
  };

  componentSaisiMdp = (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={["#74b9ff", "#0984e3"]}
        style={{ elevation: 5 }}
      >
        <HeaderBack
          title="Ajouter un compte"
          navigator={this.props.navigation}
        />
      </LinearGradient>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          borderBottomColor: "#bbb",
          borderBottomWidth: 0.5,
          padding: 15
        }}
      >
        <Content style={{ padding: 15, width: 200 }}>
          <Item rounded>
            <Input
              autoFocus={true}
              onChangeText={this.selectionMdp.bind(this)}
              placeholder="Mot de passe"
            />
          </Item>
        </Content>
      </View>

      <Button
        rounded
        block
        style={{
          backgroundColor: MAINCOLOR,
          marginHorizontal: 15,
          marginTop: 15
        }}
        onPress={this._validationRequete}
      >
        <Text>Enregistrer</Text>
      </Button>
    </View>
  );

  componentVerif = (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={["#74b9ff", "#0984e3"]}
        style={{ elevation: 5 }}
      >
        <HeaderBack
          title="Ajouter un compte"
          navigator={this.props.navigation}
        />
      </LinearGradient>

      <View
        style={{
          height: 300,
          flexDirection: "column",
          backgroundColor: "white",
          borderBottomColor: "#bbb",
          borderBottomWidth: 0.5,
          padding: 15
        }}
      >
        <Text>Verif en cours ...</Text>
        <LottieView
          source={require("../../../style/lootties/scan_.json")}
          autoPlay={true}
          loop
          style={{ flex: 1 }}
        />
      </View>

      <Button
        rounded
        block
        style={{
          backgroundColor: MAINCOLOR,
          marginHorizontal: 15,
          marginTop: 15
        }}
      >
        <Text>patientez...</Text>
      </Button>
    </View>
  );

  componentMaj = (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={["#74b9ff", "#0984e3"]}
        style={{ elevation: 5 }}
      >
        <HeaderBack
          title="Ajouter un compte"
          navigator={this.props.navigation}
        />
      </LinearGradient>

      <View
        style={{
          height: 300,
          flexDirection: "column",
          backgroundColor: "white",
          borderBottomColor: "#bbb",
          borderBottomWidth: 0.5,
          padding: 15
        }}
      >
        <Text>Maj ..</Text>
        <LottieView
          source={require("../../../style/lootties/scan_.json")}
          autoPlay={true}
          loop
          style={{ flex: 1 }}
        />
      </View>

      <Button
        rounded
        block
        style={{
          backgroundColor: MAINCOLOR,
          marginHorizontal: 15,
          marginTop: 15
        }}
      >
        <Text>patientez...</Text>
      </Button>
    </View>
  );

  componentFini = (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={["#74b9ff", "#0984e3"]}
        style={{ elevation: 5 }}
      >
        <HeaderBack
          title="Ajouter un compte"
          navigator={this.props.navigation}
        />
      </LinearGradient>

      <View
        style={{
          height: 300,
          flexDirection: "column",
          backgroundColor: "white",
          borderBottomColor: "#bbb",
          borderBottomWidth: 0.5,
          padding: 15
        }}
      >
        <Text>Compte ajouté, infos mises à jour</Text>
        <LottieView
          source={require("../../../style/lootties/success3.json")}
          autoPlay={true}
          loop={false}
          style={{ flex: 1 }}
        />
      </View>

      <Button
        rounded
        block
        style={{
          backgroundColor: MAINCOLOR,
          marginHorizontal: 15,
          marginTop: 15
        }}
        onPress={() => {
          this.props.navigation.navigate("Demarrage", {
            toast: "Compte ajouté"
          });
        }}
      >
        <Text>Accueil</Text>
      </Button>
    </View>
  );

  componentErreur = (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={["#74b9ff", "#0984e3"]}
        style={{ elevation: 5 }}
      >
        <HeaderBack
          title="Ajouter un compte"
          navigator={this.props.navigation}
        />
      </LinearGradient>

      <View
        style={{
          height: 300,
          flexDirection: "column",
          backgroundColor: "white",
          borderBottomColor: "#bbb",
          borderBottomWidth: 0.5,
          padding: 15
        }}
      >
        <Text>Identifiants incorrects</Text>
        <LottieView
          source={require("../../../style/lootties/error.json")}
          autoPlay={true}
          loop={false}
          style={{ flex: 1 }}
        />
      </View>

      <Button
        rounded
        block
        style={{
          backgroundColor: MAINCOLOR,
          marginHorizontal: 15,
          marginTop: 15
        }}
        onPress={() => {
          this.props.navigation.navigate("Demarrage", {
            toast: "Compte ajouté"
          });
        }}
      >
        <Text>Retour</Text>
      </Button>
    </View>
  );
  render() {
    if (this.state.etat == "") {
      res = this.componentSaisiMdp;
    }
    if (this.state.etat == "verificationCompte") {
      res = this.componentVerif;
    }
    if (this.state.etat == "majDesSoldes") {
      res = this.componentMaj;
    }
    if (this.state.etat == "erreur") {
      res = this.componentErreur;
    }
    if (this.state.etat == "fini") {
      res = this.componentFini;
    }
    return <View style={{ flex: 1 }}>{res}</View>;
  }
}
export const SaisirPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassSaisirPassword);
