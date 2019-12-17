import React, { Component } from "react";
import { Container, Content, Text, Icon, Button, Toast } from "native-base";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";

import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

import styles, {
  CLAIR,
  GREY,
  FONCE,
  MAINCOLOR
} from "../../../style/zakStyles";
import bokeh from "../../../style/images/bokeh3.png";

import HeaderBack from "../../headers/HeaderBack";
import {
  material,
  systemWeights,
  materialColors
} from "react-native-typography";
import { iOSColors } from "react-native-typography";

import { setBlocs } from "../../../actions/MesActions";
import { APIgetUserHistorique, APImajSolde } from "../../../lib/DjangoAPI";

import { connect } from "react-redux";

class ListeBanques extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
    this.mounted = true;
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    // On met à jour les infos en base de tous les comptes
    APImajSolde().then(responseData => {
      // Une fois fait, on vérifie que qu'on est toujours la et on fait une request
      // Pour recuperer les dernieres infos
      if (this.mounted) {
        console.log("REFRESH CPT");
        this.props.setBlocs(responseData);
        this.setState({ refreshing: false });
        Toast.show({
          text: "Infos mises à jour!",
          buttonText: "Ok",
          style: { backgroundColor: CLAIR, height: 60 },
          duration: 2000
        });
      }
    });
  };
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    lastBloc = this.props.blocs[this.props.blocs.length - 1];
    lesComptesBancaires = lastBloc.solde_banque;
    console.log(lastBloc);
    //Solde Total compte banque
    soldeTotalBancaire = 0;
    if (Array.isArray(lesComptesBancaires))
      lesComptesBancaires.forEach(function(item) {
        soldeTotalBancaire = soldeTotalBancaire + item.solde;
      });

    //Date maj = date maj du premier compte bancaire
    datemaj = lesComptesBancaires[0]["date"];

    return (
      <View style={{ flex: 1, backgroundColor: "#d2dae2" }}>
        <View style={{ zIndex: 2, elevation: 2 }}>
          <LinearGradient start={[1, 1]} end={[1, 0]} colors={[CLAIR, CLAIR]}>
            <ImageBackground
              style={{ height: "auto", width: "auto", elevation: 2 }}
              source={bokeh}
            >
              <HeaderBack
                title="Mes comptes"
                navigator={this.props.navigation}
                backgroundColor="transparent"
              />
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  paddingHorizontal: 20,
                  marginTop: 20,
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    type="SimpleLineIcons"
                    name="wallet"
                    style={{
                      fontSize: 30,
                      color: materialColors.whitePrimary,
                      marginRight: 15
                    }}
                  />
                  {this.state.refreshing ? (
                    <Text
                      style={[
                        material.display1White,
                        systemWeights.regular,
                        { color: materialColors.whitePrimary }
                      ]}
                    >
                      chargement ...
                    </Text>
                  ) : (
                    <Text
                      style={[
                        material.display1White,
                        systemWeights.regular,
                        { color: materialColors.whitePrimary }
                      ]}
                    >
                      {soldeTotalBancaire
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        .replace(".", ",")}{" "}
                      €
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ChoisirBanque")
                  }
                >
                  <Icon
                    type="Entypo"
                    name="circle-with-plus"
                    style={{ fontSize: 45, color: materialColors.whitePrimary }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  marginBottom: 70
                }}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name="update"
                  style={{
                    fontSize: 30,
                    color: materialColors.whitePrimary,
                    marginRight: 15
                  }}
                />
                <Text
                  style={[
                    material.titleWhite,
                    systemWeights.light,
                    { color: materialColors.whitePrimary }
                  ]}
                >
                  {moment(datemaj).format("DD/MM")} à{" "}
                  {moment(datemaj).format("HH:mm")}
                </Text>
              </View>
            </ImageBackground>
          </LinearGradient>
        </View>

        <ScrollView
          style={{ zIndex: 5, marginTop: -30, elevation: 10 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {lesComptesBancaires.map((compteBancaire, key) => {
            if (compteBancaire.status == "OK") {
              textSoldeComponent = (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      material.title,
                      systemWeights.regular,
                      { color: MAINCOLOR }
                    ]}
                  >
                    {compteBancaire.solde
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      .replace(".", ",")}
                  </Text>
                  <Text
                    style={[
                      material.title,
                      systemWeights.regular,
                      { marginLeft: 5, color: MAINCOLOR }
                    ]}
                  >
                    €
                  </Text>
                </View>
              );
            } else {
              textSoldeComponent = (
                <Text
                  style={[
                    material.subheading,
                    systemWeights.regular,
                    { color: "red" }
                  ]}
                >
                  {"Erreur de connexion"}
                </Text>
              );
            }
            return (
              <View
                key={key}
                style={
                  compteBancaire.status == "OK"
                    ? styles.tuile
                    : styles.tuileDesactivee
                }
              >
                <View style={styles.tuileLigneUne}>
                  <Icon
                    type="SimpleLineIcons"
                    name="wallet"
                    style={{ fontSize: 24, color: MAINCOLOR }}
                  />
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 20,
                      justifyContent: "flex-start"
                    }}
                  >
                    <Text
                      style={[
                        material.title,
                        systemWeights.regular,
                        { color: materialColors.blackSecondary }
                      ]}
                    >
                      {compteBancaire.nom_banque}
                    </Text>
                  </View>
                  {this.state.refreshing ? (
                    <Text
                      style={[
                        material.title,
                        systemWeights.regular,
                        { color: MAINCOLOR }
                      ]}
                    >
                      chargement...
                    </Text>
                  ) : (
                    textSoldeComponent
                  )}
                </View>

                {compteBancaire.details.map((detail, key) => {
                  return (
                    <View
                      key={key}
                      style={[styles.tuileLigneUne, { paddingRight: 15 }]}
                    >
                      <Icon
                        type="Feather"
                        name="minus"
                        style={{
                          fontSize: 24,
                          color: materialColors.blackSecondary
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          marginLeft: 20,
                          justifyContent: "flex-start"
                        }}
                      >
                        <Text
                          style={[
                            material.body1,
                            systemWeights.regular,
                            { color: materialColors.blackSecondary }
                          ]}
                        >
                          {detail.libelle}
                        </Text>
                      </View>
                      <Text
                        style={[
                          material.subheading,
                          systemWeights.light,
                          { color: MAINCOLOR }
                        ]}
                      >
                        {detail.solde
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          .replace(".", ",")}
                      </Text>
                      <Text
                        style={[
                          material.subheading,
                          systemWeights.light,
                          { marginLeft: 5, color: MAINCOLOR }
                        ]}
                      >
                        €
                      </Text>
                    </View>
                  );
                })}
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
)(ListeBanques);
