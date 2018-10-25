import React, { Component } from "react";
import { Container, Content, Text, Icon, Button, Toast } from "native-base";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  ListView,
  FlatList,
  TouchableOpacity
} from "react-native";
import { LargeList } from "react-native-largelist";
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
    //    this._majEtat = this._majEtat.bind(this);
    this.state = {
      scrollEnabled: true
      //refreshing: false
    };
  }

  _preparerRows() {
    var rows = [];
    data = this.props.blocs;

    for (var i = 0; i < data.length; i++) {
      solde = 0;
      if (Array.isArray(data[i].solde_banque))
        data[i].solde_banque.forEach(function(item) {
          solde = solde + item.solde;
        });
      solde_banque = solde;
      solde = solde + data[i].solde_espece + data[i].solde_immo;

      //icon

      icon = { famille: "MaterialCommunityIcons", icon: "server" };
      if (data[i].nature == "maj_banque_manu")
        icon = { famille: "Ionicons", icon: "refresh" };
      if (data[i].nature == "maj_immo")
        icon = { famille: "SimpleLineIcons", icon: "home" };
      if (data[i].nature == "maj_espece")
        icon = { famille: "MaterialCommunityIcons", icon: "coin" };
      if (data[i].nature == "maj_banque_auto")
        icon = { famille: "MaterialCommunityIcons", icon: "server" };

      //Si c'est en dessous du nissab c'est rouge

      if (solde > 1000) {
        isSupNissab = true;
        color = MAINCOLOR;
      } else {
        isSupNissab = false;
        color = "#F39C12";
      }
      //Si pas actif on le met a gris

      if (data[i].etat != "actif") color = "grey";

      action = { famille: "MaterialCommunityIcons", icon: "close" };
      if (data[i].etat == "inactif")
        action = { famille: "MaterialCommunityIcons", icon: "check" };

      ligne = {
        date: momentHijri(data[i].date),
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
        isSupNissab: isSupNissab,
        solde_banque: solde_banque,
        solde_immo: data[i].solde_immo,
        solde_espece: data[i].solde_espece,
        rang: i,
        action: action
      };
      rows.push(ligne);
    }
    return rows;
  }

  _majEtat(id, etat) {
    APIupdateEtatBloc(id, etat).then(responseData => {
      this.props.setBlocs(responseData);
      console.log("Maj des blocs suite a changement detat");

      //rows = this._preparerRows();
      //this.setState({ rows: rows.reverse() });
      //var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });
      //this.setState({ dataSource: ds.cloneWithRows(rows.reverse()) });

      //this.forceUpdate();
    });
  }

  _renderRow = ({ item }) => {
    //console.log("ROW DATA", item);

    if (item.rang == this.dataSource.length - 1) {
      var right = [
        {
          component: (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
              }}
            >
              <Icon
                type="MaterialIcons"
                name="do-not-disturb-alt"
                style={{
                  fontSize: 34,
                  color: "white"
                }}
              />
            </View>
          ),
          onPress: () => {
            alert("Vous ne pouvez pas ignorer le bloc le plus récent");
          },
          type: "secondary"
        }
      ];
    } else {
      var right = [
        {
          component: (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
              }}
            >
              <Icon
                type="MaterialIcons"
                name={item.etat == "actif" ? "do-not-disturb-alt" : "done"}
                style={{
                  fontSize: 34,
                  color: "white"
                }}
              />
            </View>
          ),

          onPress: () => {
            this._majEtat(item.ID, item.etat == "actif" ? "inactif" : "actif");
          },
          type: item.etat == "actif" ? "delete" : "primary"
        }
      ];
    }

    backgroundColor = "#fff";
    if (item.isSupNissab) {
      backgroundColor = "#fff";
    } else {
      backgroundColor = "#fff";
    }

    if (item.etat == "inactif") backgroundColor = "#D5D8DC";

    if (item.nature == "maj_immo")
      infoMajeure =
        item.solde_immo
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          .replace(".", ",") + " €";
    if (item.nature == "maj_espece")
      infoMajeure =
        item.solde_espece
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          .replace(".", ",") + " €";
    if (item.nature == "maj_banque_auto" || item.nature == "maj_banque_manu")
      infoMajeure =
        item.solde_banque
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          .replace(".", ",") + " €";

    return (
      <View
        style={{
          backgroundColor: backgroundColor,
          borderBottomColor: "#eee",
          borderColor: "transparent",
          borderWidth: 1,
          height: 65,
          padding: 15,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            type={item.icon.famille}
            name={item.icon.icon}
            style={{
              fontSize: 24,
              color: item.color,
              marginRight: 25
            }}
          />
          <View style={{ justifyContent: "space-between" }}>
            <Text
              style={{
                color: materialColors.blackSecondary,
                fontSize: 16,
                marginBottom: 10
              }}
            >
              {infoMajeure}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#A6ACAF",
                  fontSize: 10,
                  marginRight: 7
                }}
              >
                TOTAL:
              </Text>
              <Text
                style={{
                  color: item.color,
                  fontSize: 10
                }}
              >
                {item.solde}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ justifyContent: "space-between", marginRight: 20 }}>
            <Text
              style={{
                color: materialColors.blackSecondary,
                fontSize: 14
              }}
            >
              {item.date.format("ddd DD MMM")}
            </Text>
            <Text
              style={{
                color: "#A6ACAF",
                fontSize: 14
              }}
            >
              {item.date.format("HH:mm")}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (item.rang == this.dataSource.length - 1) {
                alert("Vous ne pouvez pas désactiver le bloc le plus récent");
                return;
              }

              this._majEtat(
                item.ID,
                item.etat == "actif" ? "inactif" : "actif"
              );

              //rows = this.dataSource;
              //SI on clik, on met l'icone updating et on maj letat
              //for (i = 0; i < rows.length; i++) {
              //if (rows[i].ID == item.ID) {
              //rows[i].action.famille = "MaterialCommunityIcons";
              //rows[i].action.icon = "dots-horizontal";

              //this.props.setBlocs(rows.reverse());

              //  break;
              //}
              //}
            }}
          >
            <Icon
              type={item.action.famille}
              name={item.action.icon}
              style={{
                fontSize: 24,
                color: item.color
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    rows = this._preparerRows();
    this.dataSource = rows.reverse();

    return (
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 2, elevation: 2 }}>
          <LinearGradient start={[1, 1]} end={[1, 0]} colors={[FONCE, FONCE]}>
            <ImageBackground
              style={{ height: "auto", width: "auto", elevation: 2 }}
              source={bokeh}
            >
              <HeaderBack
                title={this.props.blocs.length + " Blocs"}
                navigator={this.props.navigation}
                backgroundColor="transparent"
              />
            </ImageBackground>
          </LinearGradient>
        </View>

        <FlatList
          scrollEnabled={this.state.scrollEnabled}
          data={this.dataSource}
          keyExtractor={item => item.ID.toString()}
          renderItem={this._renderRow}
          style={{ flex: 1 }}
        />
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
