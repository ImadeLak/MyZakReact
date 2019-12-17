import React, { Component } from "react";
import { Container, Content, Text, Icon, Button, Toast } from "native-base";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  SectionList,
  Alert,
  StyleSheet
} from "react-native";

import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

import styles, { CLAIR, GREY, FONCE, MAINCOLOR } from "../../style/zakStyles";
import bokeh from "../../style/images/bokeh3.png";

import HeaderBack from "../headers/HeaderBack";
import {
  material,
  systemWeights,
  materialColors
} from "react-native-typography";
import { iOSColors } from "react-native-typography";

import { APIgetUserHistorique } from "../../lib/DjangoAPI";
import { setBlocs } from "../../actions/MesActions";

import { connect } from "react-redux";

class TabStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
    this.mounted = true;
  }

  GetSectionListItem = item => {
    Alert.alert(item);
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });

    APIgetUserHistorique().then(responseData => {
      if (this.mounted) {
        console.log("REFRESH LISTE");
        this.props.setBlocs(responseData.situation.blocs.blocs);
        this.setState({ refreshing: false });
        Toast.show({
          text: "Infos mises à jour!",
          buttonText: "Bismillah",
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
    //sections
    var sections = [];
    //console.log("BLOCS", this.props.blocs);
    this.props.blocs.forEach(function(date) {
      var title = moment(date.date).format("MMMM YYYY");
      var solde = 0;
      //console.log("TEST", date);
      if (date.solde_banque.length > 0) {
        date.solde_banque.forEach(function(item) {
          solde = solde + item.solde;
        });
      }

      if ((date.type = "maj_banque_auto")) {
        isPresent = false;
        sections.forEach(function(item) {
          if (item.title == title) {
            isPresent = true;
            item.data.unshift({
              date: moment(date.date).format("ddd DD MMM à HH:mm"),
              solde: solde
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                .replace(".", ",")
            });
            return;
          }
        });
        if (!isPresent) {
          sections.unshift({
            title: title,
            data: [
              {
                date: moment(date.date).format("ddd DD MMM à HH:mm"),
                solde: solde
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  .replace(".", ",")
              }
            ]
          });
        }
      }
      /*
      if (sections[title]) {
        sections[title].push(solde)
      }else{
        sections[title]=[]
        sections[title].push(solde)
      }*/
    });
    //console.log(sections)

    return (
      <Container style={{ flex: 1, backgroundColor: "#d2dae2" }}>
        <View style={{ zIndex: 2, elevation: 2 }}>
          <LinearGradient start={[1, 1]} end={[1, 0]} colors={[FONCE, FONCE]}>
            <ImageBackground
              style={{ height: "auto", width: "auto", elevation: 2 }}
              source={bokeh}
            >
              <HeaderBack
                title="Historique"
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
                    type="MaterialCommunityIcons"
                    name="update"
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
                    Relevés de solde total bancaire
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </LinearGradient>
        </View>

        <SectionList
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          stickySectionHeadersEnabled={true}
          sections={sections}
          renderSectionHeader={({ section }) => (
            <Text
              style={[
                material.subheadingWhite,
                systemWeights.semibold,
                { padding: 10, backgroundColor: FONCE }
              ]}
            >
              {" "}
              {section.title}{" "}
            </Text>
          )}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#F5F5F5",
                borderColor: GREY,
                borderBottomWidth: 0.5,
                paddingVertical: 5
              }}
            >
              <Text
                style={[
                  material.body2,
                  { marginLeft: 25, color: materialColors.blackSecondary }
                ]}
              >
                {" "}
                {item.date}
              </Text>
              <Text
                style={[
                  material.body1,
                  { marginRight: 25, color: materialColors.blackPrimary }
                ]}
              >
                {" "}
                {item.solde} €
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </Container>
    );
  }
}

const styles2 = StyleSheet.create({
  SectionHeaderStyle: {
    backgroundColor: FONCE,
    fontSize: 20,
    padding: 5,
    color: "#fff"
  }
});

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
)(TabStats);
