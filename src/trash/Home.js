import React, { Component } from "react";
import { View, ActivityIndicator, AppState } from "react-native";
//sofiane
import TabNavigator from "../navigators/TabNavigator";
import HeaderBackMenu from "../headers/HeaderBackMenu";

import { connect } from "react-redux";
import { setBlocs, setComptesBancaire } from "../../actions/MesActions";

import { APIgetUserHistorique } from "../../lib/DjangoAPI";

import { Font, AppLoading, SecureStore } from "expo";

class Home extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true // OLD
    };
  }

  async componentWillMount() {
    //Pour partout dans l'appli
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    //On verifie que c'est la 1ere fois
    if (this.props.blocs.length == 0) {
      //alert(await SecureStore.getItemAsync("pin"));
      //alert("pas de bloc");
      APIgetUserHistorique().then(responseData => {
        //console.log(responseData);
        this.props.setBlocs(responseData.situation.blocs.blocs);
        this.props.setComptesBancaire(responseData.comptes);
        //alert(this.props.blocs.length);
      });
    }
    //  this.setState({ isLoading: false });
  }

  render() {
    //console.log('Stats',this.props.navigation)
    //if (!this.state.isReady) {
    //  return <AppLoading />;
    //}

    return (
      <View style={{ flex: 1 }}>
        {this.props.blocs.length == 0 ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <TabNavigator screenProps={this.props.navigation} />
        )}
      </View>
    );
  }
}

// This function provides a means of sending actions so that data in the Redux store
// can be modified. In this example, calling this.props.addToCounter() will now dispatch
// (send) an action so that the reducer can update the Redux state.
function mapDispatchToProps(dispatch) {
  return {
    setBlocs: data => dispatch(setBlocs(data)),
    setComptesBancaire: data => dispatch(setComptesBancaire(data))
  };
}

// This function provides access to data in the Redux state in the React component
// In this example, the value of this.props.count will now always have the same value
// As the count value in the Redux state
function mapStateToProps(state) {
  return {
    blocs: state.dataReducer.blocs
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
