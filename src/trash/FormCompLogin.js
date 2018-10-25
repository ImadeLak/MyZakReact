import React, {Component} from 'react';

import Dimensions from 'Dimensions';
import {
  KeyboardAvoidingView,View,TouchableOpacity,
  Image,Text,Animated,Easing, Alert, TextInput, AsyncStorage
} from 'react-native';
//Bouton

import {login} from '../callDjango';

//Form image
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import spinner from '../images/loading2.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

import {NavigationActions, StackActions} from 'react-navigation';

import styles from '../zakStyles'

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      isLoading: false,
      loginfailed:'  ',
      username:'',
      password:''
    };
    this.showPass = this.showPass.bind(this);
    //this.buttonAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }


  showPass() {
    this.state.showPass === false
      ? this.setState({showPass: true})
      : this.setState({showPass: false});
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
      console.log("on sauvegarde ce token: "+ selectedValue);
    }
    catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  _onPress() {

    if (this.state.isLoading) return;
    //Petite animation
    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    login(this.state.username,this.state.password)
    .then((responseData) => {
      if(responseData.token){
        this.saveItem('token', responseData.token);
        setTimeout(() => {
           // On reset le stack et on va à l'accueil
           this.setState({isLoading: false,});
           this.props.navigator.dispatch(StackActions.reset({
              index: 0,
              key: null,
              actions: [
                NavigationActions.navigate({ routeName: 'Home'})
              ]
            }));
         }, 300);

     }else{
       this.setState({isLoading: false,});
     }
    // this.buttonAnimated.setValue(0);
    });
  }


  render() {

    return (

        <KeyboardAvoidingView behavior="padding" style={styles.containerForm} enabled>
          <View style={styles.champsForm}>
              <View style={styles.inputWrapperForm}>
                <Image source={usernameImg} style={styles.inlineImgForm} />
                <TextInput
                  style={styles.inputForm}
                  placeholder={"Utilisateur"}
                  onChangeText={ TextInputValue =>
                    this.setState({'username' : TextInputValue }) }
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                  placeholderTextColor="white"
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={{marginTop:10}}>
                <Image source={passwordImg} style={styles.inlineImgForm} />
                <TextInput
                  style={styles.inputForm}
                  secureTextEntry={this.state.showPass}
                  onChangeText={ TextInputValue =>
                    this.setState({'password' : TextInputValue }) }
                  placeholder="Password"
                  returnKeyType={'done'}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  placeholderTextColor="white"
                  underlineColorAndroid="transparent"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.btnEyeForm}
                  onPress={this.showPass}>
                  <Image source={eyeImg} style={styles.iconEyeForm} />
                </TouchableOpacity>
              </View>
            </View>

          <Text style={styles.loginfailedForm}>{this.state.loginfailed}</Text>

          <Animated.View style={ styles.containerBoutonForm}>
            <TouchableOpacity
              style={styles.buttonForm}
              onPress={this._onPress}
              activeOpacity={1}>
              {this.state.isLoading ? (
                <Image source={spinner} style={styles.imageForm} />
              ) : (
                <Text style={styles.textForm}>LOGIN</Text>
              )}
            </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );
  }
}
