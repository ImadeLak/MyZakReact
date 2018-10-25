import React, { Component } from "react";
import { Container, Content, Text, Icon, Button, Toast } from "native-base";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  ListView,
  RefreshControl,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { LinearGradient } from "expo";

import styles, { CLAIR, GREY, FONCE, MAINCOLOR } from "../../style/zakStyles";
import bokeh from "../../style/images/bokeh3.png";

import HeaderBack from "../headers/HeaderBack";
import {
  material,
  systemWeights,
  materialColors
} from "react-native-typography";

import { APIupdateEtatBloc } from "../../lib/DjangoAPI";
import { setBlocs } from "../../actions/MesActions";

import { connect } from "react-redux";

import Swipeout from "react-native-swipeout";
import moment from "moment";
import momentHijri from "moment-hijri";

//import LottieView from 'lottie-react-native';

class Test extends React.Component {
  constructor(props) {
    super(props);
    rows = this._preparerRows(this.props.blocs);
    this.state = {
      rows: rows.reverse(),
      refreshing: false,
      scrollEnabled: false
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    console.log("REFRESH LIST ETAT BLOCS");

    rows = this._preparerRows(this.props.blocs);

    this.setState({ rows: rows.reverse() });
    this.setState({ refreshing: false });
    Toast.show({
      text: "Infos mises à jour!",
      buttonText: "Ok",
      style: { backgroundColor: CLAIR, height: 60 },
      duration: 2000
    });
  };

  _preparerRows(blocs) {
    var rows = [];
    data = blocs;

    for (var i = 0; i < data.length; i++) {
      solde = 0;
      if (Array.isArray(data[i].solde_banque))
        data[i].solde_banque.forEach(function(item) {
          solde = solde + item.solde;
        });
      solde = solde + data[i].solde_espece + data[i].solde_immo;

      //icon

      icon = { famille: "MaterialCommunityIcons", icon: "server" };
      if (data[i].nature == "maj_banque_manu")
        icon = { famille: "FontAwesome", icon: "user-o" };
      if (data[i].nature == "maj_immo")
        icon = { famille: "SimpleLineIcons", icon: "home" };
      if (data[i].nature == "maj_espece")
        icon = { famille: "MaterialCommunityIcons", icon: "coin" };
      if (data[i].nature == "maj_banque_auto")
        icon = { famille: "MaterialCommunityIcons", icon: "server" };

      action = { famille: "MaterialCommunityIcons", icon: "close" };
      if (data[i].etat == "inactif")
        action = { famille: "MaterialCommunityIcons", icon: "check" };

      //Si c'est en dessous du nissab c'est rouge
      if (solde > 1000) color = MAINCOLOR;
      else {
        color = "red";
      }
      //Si pas actif on le met a gris

      if (data[i].etat != "actif") color = "grey";

      ligne = {
        text: momentHijri(data[i].date).format("HH:mm - ddd DD MMM"),
        color: color,
        nature: data[i].nature,
        solde:
          solde
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            .replace(".", ",") + " €",
        icon: icon,
        ID: data[i].ID,
        etat: data[i].etat,
        action: action,
        rang: i
      };
      rows.push(ligne);
    }
    return rows;
  }

  _majEtat(id, etat) {
    APIupdateEtatBloc(id, etat).then(responseData => {
      this.props.setBlocs(responseData);
      console.log("Maj des blocs suite a changement detat");
      rows = this._preparerRows(this.props.blocs);
      this.setState({ rows: rows.reverse() });
      //this.forceUpdate();
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 2, elevation: 2 }}>
          <LinearGradient start={[1, 1]} end={[1, 0]} colors={[FONCE, FONCE]}>
            <ImageBackground
              style={{ height: "auto", width: "auto", elevation: 2 }}
              source={bokeh}
            >
              <HeaderBack
                title="Blocs"
                navigator={this.props.navigation}
                backgroundColor="transparent"
              />
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  paddingHorizontal: 10,
                  marginTop: 20,
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    type="FontAwesome"
                    name="chain"
                    style={{
                      fontSize: 30,
                      color: materialColors.whitePrimary,
                      marginRight: 20
                    }}
                  />

                  <Text
                    style={[
                      material.titleWhite,
                      systemWeights.regular,
                      { color: materialColors.whitePrimary }
                    ]}
                  >
                    Les blocs
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </LinearGradient>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          style={{ flex: 1 }}
        >
          {this.state.rows.map((rowData, key) => {
            return (
              <View
                key={key}
                style={{
                  backgroundColor: "#fff",
                  borderBottomColor: "#eee",
                  borderColor: "transparent",
                  borderWidth: 1,
                  padding: 15,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    type={rowData.icon.famille}
                    name={rowData.icon.icon}
                    style={{
                      fontSize: 24,
                      color: rowData.color,
                      marginRight: 25
                    }}
                  />
                  <Text
                    style={{
                      color: "#333",
                      fontSize: 16
                    }}
                  >
                    {rowData.text}
                  </Text>
                </View>

                <Text
                  style={{
                    color: "#333",
                    fontSize: 16
                  }}
                >
                  {rowData.solde}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    console.log(this.state.rows.length);
                    if (rowData.rang == this.state.rows.length - 1) {
                      alert(
                        "Vous ne pouvez pas désactiver le bloc le plus récent"
                      );
                      return;
                    }

                    rows = this.state.rows;
                    //SI on clik, on met l'icone updating et on maj letat
                    for (i = 0; i < rows.length; i++) {
                      if (rows[i].ID == rowData.ID) {
                        rows[i].action.famille = "MaterialCommunityIcons";
                        rows[i].action.icon = "dots-horizontal";

                        this.setState({ row: rows });
                        this._majEtat(
                          rowData.ID,
                          rowData.etat == "actif" ? "inactif" : "actif"
                        );
                        break;
                      }
                    }
                  }}
                >
                  <Icon
                    type={rowData.action.famille}
                    name={rowData.action.icon}
                    style={{
                      fontSize: 24,
                      color: rowData.color,
                      marginRight: 25
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

// This function provides access to data in the Redux state in the React component
function mapStateToProps(state) {
  return {
    blocs: state.dataReducer.blocs
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setBlocs: data => dispatch(setBlocs(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
