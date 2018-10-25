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
export class LoginPIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      pins: [],
      nbEssai: 0,
      nbEssaiAutorise: 90,
      bonPIN: "",
      fingerprintProof: false
    };
  }

  componentWillUnmountMount() {
    if (Platform.OS === "android") {
      Expo.Fingerprint.cancelAuthenticate();
      console("Fingerprint OFF");
    }
  }
  async componentDidMount() {
    this.setState({ bonPIN: await SecureStore.getItemAsync("pin") });
    this.checkDeviceForHardware();

    AppState.addEventListener("change", state => {
      console.log("APPSTATE", state);
      if (state == "active" && this.state.fingerprintProof) {
        this.scanBiometrics();
      } else {
        Expo.Fingerprint.cancelAuthenticate();
      }
    });
  }

  checkDeviceForHardware = async () => {
    let compatible = await Expo.Fingerprint.hasHardwareAsync();
    if (compatible) {
      this.checkForBiometrics();
    }
  };

  checkForBiometrics = async () => {
    let biometricRecords = await Expo.Fingerprint.isEnrolledAsync();
    if (biometricRecords) {
      this.setState({ fingerprintProof: true });
      this.scanBiometrics();
    }
  };

  scanBiometrics = async () => {
    console.log("SCAN", this.state.nbEssai);

    let result = await Expo.Fingerprint.authenticateAsync("Biometric Scan.");

    if (result.success) {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        })
      );
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
        //Go Home
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: "Login" })]
          })
        );
        return null;
      }

      //alert(result.error);

      if (AppState.currentState == "active") {
        console.log("Relance de Scan", AppState.currentState);
        this.scanBiometrics();
      }
    }
  };

  async checkPin(PIN) {
    console.log("check", PIN);
    if (PIN == this.state.bonPIN) {
      this.props.navigation.navigate("Home");
    } else {
      //Alert.alert("Wrong Pin");
      if (this.state.nbEssai == this.state.nbEssaiAutorise - 1) {
        //alert("Vous allez être deconnecté");
        await SecureStore.deleteItemAsync("pin");
        await SecureStore.deleteItemAsync("APIToken");

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
    //this.refs.pin.reset();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.fingerprintProof ? (
          <Icon
            type="MaterialIcons"
            name="fingerprint"
            style={{
              fontSize: 34,
              color: "white",
              marginBottom: 15
            }}
          />
        ) : (
          <Text />
        )}

        {this.state.nbEssai > 0 ? (
          <Text style={{ color: "white", marginBottom: 15, fontSize: 15 }}>
            Plus que {this.state.nbEssaiAutorise - this.state.nbEssai} tenative
          </Text>
        ) : (
          <Text />
        )}

        <Pin
          ref="pin"
          onChangeValue={value => {
            //console.log("pin", value);
            this.setState({ pins: value });
            if (value.length == 4) {
              this.checkPin(value);
              this.refs.pin.reset();
            }
          }}
          styleEmptyBox={{ borderColor: "white" }}
          styleFullBox={{ borderColor: "white", backgroundColor: "white" }}
          styleText={{ fontSize: 16 }}
          styleButton={{ backgroundColor: "#4b4648" }}
        />
      </View>
    );
  }
}
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

//Useless
/*
export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <RootStackNav screenProps={this.props.navigation} />;
  }
}

export const RootStackNav = createStackNavigator({
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
});*/

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
