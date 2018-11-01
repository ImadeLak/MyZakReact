import React, { Component } from "react";
import {
  Image,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  Animated,
  Easing
} from "react-native";
import {
  Button,
  Text,
  Content,
  Item,
  Input,
  Icon,
  Container,
  Toast,
  Spinner
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Font, AppLoading, SecureStore } from "expo";

import { APIlogin } from "../../lib/DjangoAPI";

import monStyle, {
  TRANSPARENCE,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  MARGIN
} from "../../style/zakStyles";
import bgSrc from "../../style/images/wallpaper2.png";
import logoImg from "../../style/images/drop.png";

import { connect } from "react-redux";
import { majUsername, majPassword } from "../../actions/MesActions";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      showPass: true,
      loginLoading: false
    };
    this._login = this._login.bind(this);
    this.buttonAnimated = new Animated.Value(0);
  }

  //Petit soucis pour NativeBAse
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }

  _login() {
    //Si on est deja en loading on sort
    if (this.state.loginLoading) return;
    //On met le loading à True
    this.setState({ loginLoading: true });
    //Animation bouton
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();

    //Appel API Django
    //APIlogin(this.props.username, this.props.password).then(
    //async responseData => {
    APIlogin("mamade93150@gmail.com", "aaaaaa11").then(async responseData => {
      if (responseData.token) {
        await SecureStore.setItemAsync("APIToken", responseData.token);
        setTimeout(() => {
          // On reset le stack et on va à l'accueil
          this.setState({ loginLoading: false });
          this.props.navigation.navigate("DefinirPIN");
        }, 300);
      } else {
        this.setState({ loginLoading: false });
        //Le Toast qui va bien
        Toast.show({
          text: "Erreur de connexion!",
          buttonText: "Okay",
          type: "danger"
        });
      }
      // this.buttonAnimated.setValue(0);
    });
  }

  render() {
    // Petit soucis avec Native Base
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const ANIMWIDTH = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
    });
    return (
      <ImageBackground style={monStyle.pictureBackground} source={bgSrc}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? null : "padding"}
        >
          <Grid style={{ alignItems: "center" }}>
            <Row size={2} style={monStyle.containerLogo}>
              <Col size={1} style={{ alignItems: "center" }}>
                <Image source={logoImg} style={monStyle.imageLogo} />
                <Text style={monStyle.textLogo}>MY ZAKAT</Text>
              </Col>
            </Row>

            <Row size={2}>
              <Col size={1} style={{ alignItems: "center" }}>
                <Container style={{ backgroundColor: "transparent" }}>
                  <Content style={{ padding: 15, width: DEVICE_WIDTH }}>
                    <Item
                      rounded
                      style={{
                        marginBottom: 10,
                        borderColor: TRANSPARENCE,
                        backgroundColor: TRANSPARENCE
                      }}
                    >
                      <Icon active name="person" style={{ color: "#FFF" }} />
                      <Input
                        placeholder="Utilisateur"
                        placeholderTextColor="#FFF"
                        style={{ color: "#FFF" }}
                        onChangeText={TextInputValue =>
                          this.props.majUsername(TextInputValue)
                        }
                      />
                    </Item>

                    <Item
                      rounded
                      style={{
                        marginBottom: 50,
                        borderColor: TRANSPARENCE,
                        backgroundColor: TRANSPARENCE
                      }}
                    >
                      <Icon active name="lock" style={{ color: "#FFF" }} />
                      <Input
                        placeholder="Mot de passe"
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor="#FFF"
                        style={{ color: "#FFF" }}
                        onSubmitEditing={() => this._login}
                        onChangeText={TextInputValue =>
                          this.props.majPassword(TextInputValue)
                        }
                      />
                    </Item>

                    <Animated.View>
                      <Button
                        rounded
                        block
                        style={{ backgroundColor: "#54a0ff" }}
                        onPress={this._login}
                      >
                        {!this.state.loginLoading ? (
                          <Text>Se connecter</Text>
                        ) : (
                          <Spinner color="white" />
                        )}
                      </Button>
                    </Animated.View>
                  </Content>
                </Container>
              </Col>
            </Row>
          </Grid>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

// This function provides a means of sending actions so that data in the Redux store
// can be modified. In this example, calling this.props.addToCounter() will now dispatch
// (send) an action so that the reducer can update the Redux state.
function mapDispatchToProps(dispatch) {
  return {
    majPassword: password => dispatch(majPassword(password)),
    majUsername: username => dispatch(majUsername(username))
  };
}

// This function provides access to data in the Redux state in the React component
// In this example, the value of this.props.count will now always have the same value
// As the count value in the Redux state
function mapStateToProps(state) {
  return {
    password: state.loginReducer.password,
    username: state.loginReducer.username
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
