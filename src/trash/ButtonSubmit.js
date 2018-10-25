import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet,TouchableOpacity,Text,Animated,Easing,Image,Alert,View,} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import spinner from '../images/loading2.gif';

import {login,getBonjour} from '../callDjango';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      loginfailed:'',
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

  /*  setTimeout(() => {
      this._onGrow();
    }, 20000);*/

    login('admin','azerty9d3')
    .then(json => {
          console.log(json);
          // CONNECTION OK
          if (json.token){
            setTimeout(() => {
              Actions.secondScreen(); // On va au deuxieme ecran
              this.setState({isLoading: false, loginfailed: ''});
              this.buttonAnimated.setValue(0);
              this.growAnimated.setValue(0);
            }, 3300);
          //CONNECTION KO
          }else{

            this.setState({isLoading: false, loginfailed: 'Login ou mot de passe incorrect'});
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
          }

      })
    .catch(error => console.error(error))


  }

/*  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }*/

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    /*const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });*/

    return (
      <View style={styles.containerBouton}>
        <Text style={styles.loginfailed}>{this.state.loginfailed}</Text>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>

        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerBouton: {
    flex: 1,
    top: -45,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2980b9',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#2980b9',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#2980b9',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  loginfailed: {
    color: 'red',
    backgroundColor: 'transparent',
    top: -50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 20,
    padding:0,
    margin:0
  },
  image: {
    width: 24,
    height: 24,
  },
});
