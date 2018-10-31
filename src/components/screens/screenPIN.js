/*
On a un stackNavigator pour permettre de naviguer entre 3 screen,
DefinirPIN, ConfirmerPIN, UtiliserPIN
*/
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  AppState
} from "react-native";
import { createStackNavigator } from "react-navigation";
import Expo, { SecureStore } from "expo";
import { Toast, Icon } from "native-base";
import { NavigationActions, StackActions } from "react-navigation";

import Pin from "../../lib/PIN";
import { MAINCOLOR } from "../../style/zakStyles";
import { connect } from "react-redux";

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

export class DefinirPIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      pins: [],
      nbEssai: 0
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", marginBottom: 15, fontSize: 15 }}>
          Saisissez votre PIN
        </Text>

        <Pin
          ref="pin"
          onChangeValue={value => {
            //console.log("pin", value);
            this.setState({ pins: value });
          }}
          styleEmptyBox={{ borderColor: "white" }}
          styleFullBox={{ borderColor: "white", backgroundColor: "white" }}
          styleText={{ fontSize: 16 }}
          styleButton={{ backgroundColor: "#4b4648" }}
        />

        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            disabled={this.state.pins.length != 4}
            onPress={async () => {
              this.refs.pin.reset();
              await SecureStore.setItemAsync("pin", this.state.pins);
              this.props.navigation.navigate("ConfirmerPIN");
            }}
            style={styles.button}
          >
            <Text style={{ color: "white" }}>VALIDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
export class ConfirmerPIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      pins: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", marginBottom: 15, fontSize: 15 }}>
          Confirmez votre PIN
        </Text>

        <Pin
          ref="pin"
          onChangeValue={value => {
            //console.log("pin", value);
            this.setState({ pins: value });
          }}
          styleEmptyBox={{ borderColor: "white" }}
          styleFullBox={{ borderColor: "white", backgroundColor: "white" }}
          styleText={{ fontSize: 16 }}
          styleButton={{ backgroundColor: "#4b4648" }}
        />

        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            disabled={this.state.pins.length != 4}
            onPress={async () => {
              let PIN = await SecureStore.getItemAsync("pin");
              if (this.state.pins == PIN) {
                //Good on va a l'accueil
                //alert("bon pin");
                this.props.navigation.navigate("Home");
              } else {
                Toast.show({
                  text: "PIN Incorrect",
                  buttonText: "Réessayez",
                  style: { backgroundColor: "red", height: 60 },
                  duration: 2000
                });
              }
              this.refs.pin.reset();
            }}
            style={styles.button}
          >
            <Text style={{ color: "white" }}>VALIDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
class LoginPINClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonDisabled: true,
      pins: [],
      nbEssai: 0,
      nbEssaiAutorise: 3,
      bonPIN: "",
      fingerprintProof: false
    };
  }

  componentWillUnmount() {
    //alert("quit");
    if (Platform.OS === "android") {
      Expo.LocalAuthentication.cancelAuthenticate();
      console.log("Fingerprint OFF");
    }
  }
  componentWillMount() {
    //alert("will");
  }
  _onAppStateChange = () => {
    //Si on réouvre l'appli
    if (AppState.currentState == "active") {
      console.log("On réouvre l'appli, nb blocs:", this.props.blocs.length);
      //Si on a pas passé la HOME
      if (this.props.blocs.length == 0) {
        console.log("blocs vide => toujours dans le debut, on lance le scan!");
        if (this.state.fingerprintProof) this.scanBiometrics();
      } else {
        console.log("il faut ouvrir Login PIN");

        this.props.navigation.navigate("LoginPIN");
        if (this.state.fingerprintProof) this.scanBiometrics();
      }
    } else {
      console.log("On ferme l'appli");
      Expo.LocalAuthentication.cancelAuthenticate();
    }
  };

  async componentDidMount() {
    this.setState({ bonPIN: await SecureStore.getItemAsync("pin") });
    this.checkDeviceForHardware();
    console.log("add du listener AppState");
    AppState.addEventListener("change", this._onAppStateChange);
  }

  checkDeviceForHardware = async () => {
    let compatible = await Expo.LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      this.checkForBiometrics();
    }
  };

  checkForBiometrics = async () => {
    let biometricRecords = await Expo.LocalAuthentication.isEnrolledAsync();
    if (biometricRecords) {
      this.setState({ fingerprintProof: true });
      this.scanBiometrics();
    }
  };

  scanBiometrics = async () => {
    console.log("SCAN", this.state.nbEssai);
    let result = await Expo.LocalAuthentication.authenticateAsync(
      "Biometric Scan."
    );

    if (result.success) {
      this.setState({ nbEssaiAutorise: 3 });
      /*this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        })
      );*/
      this.props.navigation.navigate("Home");
      return true;
    } else {
      console.log("ERROR FINGERPRINT", result.error);

      if (result.error == "app_cancel" || result.error == "user_cancel") {
        return null;
      }
      //Authentification_failed ou bien imager_dirty
      this.setState({ nbEssai: this.state.nbEssai + 1 });

      if (this.state.nbEssai == this.state.nbEssaiAutorise) {
        await SecureStore.deleteItemAsync("pin");
        await SecureStore.deleteItemAsync("APIToken");
        console.log("remove du listener AppState");
        AppState.removeEventListener("change", this._onAppStateChange);

        //Go Login
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: "Login" })]
          })
        );
        //this.props.navigation.navigate("Login")
        return null;
      }

      //alert(result.error);
      if (AppState.currentState == "active") {
        console.log("Relance de Scan", AppState.currentState);
        this.scanBiometrics();
      }
    }
  };

  async checkPinManuel(PIN) {
    console.log("check", PIN);
    console.log("nb blocs", this.props.blocs.length);
    if (PIN == this.state.bonPIN) {
      this.setState({ nbEssaiAutorise: 3 });
      // On verifie si c'est le premier login ou pas
      if (this.props.blocs.length == 0) {
        /*this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: "Home" })]
          })
        );*/
        this.props.navigation.navigate("Home");
      } else {
        console.log("Retour Arriere");
        this.props.navigation.navigate("Home");
        this.props.navigation.goBack();
      }
    } else {
      //Alert.alert("Wrong Pin");

      if (this.state.nbEssai == this.state.nbEssaiAutorise - 1) {
        //alert("Vous allez être deconnecté");
        await SecureStore.deleteItemAsync("pin");
        await SecureStore.deleteItemAsync("APIToken");

        console.log("remove du listener AppState");
        AppState.removeEventListener("change", this._onAppStateChange);

        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: "Login" })]
          })
        );
        return false;
      }

      this.setState({ nbEssai: this.state.nbEssai + 1 });
      return false;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.fingerprintProof ? (
          <View style={{ marginBottom: 40, alignItems: "center" }}>
            <Icon
              type="MaterialIcons"
              name="fingerprint"
              style={{
                fontSize: 45,
                color: "white",
                marginBottom: 10
              }}
            />
            <Text style={{ color: "white", fontSize: 12 }}>
              Emprunte digitale
            </Text>
          </View>
        ) : (
          <View />
        )}

        {this.state.nbEssai > 0 ? (
          <Text style={{ color: "white", marginBottom: 25, fontSize: 15 }}>
            Plus que {this.state.nbEssaiAutorise - this.state.nbEssai} tenative
          </Text>
        ) : (
          <Text style={{ color: "white", marginBottom: 25, fontSize: 15 }}>
            Veuillez entrer votre code PIN
          </Text>
        )}

        <Pin
          ref="pin"
          onChangeValue={value => {
            //console.log("pin", value);
            this.setState({ pins: value });
            if (value.length == 4) {
              this.checkPinManuel(value);
              this.refs.pin.reset();
            }
          }}
          styleEmptyBox={{ borderColor: "white" }}
          styleFullBox={{ borderColor: "white", backgroundColor: "white" }}
          styleText={{ fontSize: 25 }}
          styleButton={{ backgroundColor: "#4b4648" }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    blocs: state.dataReducer.blocs
  };
}

export const LoginPIN = connect(
  mapStateToProps,
  {}
)(LoginPINClass);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MAINCOLOR
  },
  button: {
    borderRadius: 5,
    height: 30,
    width: 120,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center"
  }
});
