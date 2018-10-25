import React from "react";
import { Icon, Content } from "native-base";
import { View, Switch, Text, Picker } from "react-native";
import HeaderBack from "../headers/HeaderBack";
import { MAINCOLOR, GREY } from "../../style/zakStyles";
import customStyle from "../../style/zakStyles";
import RNPickerSelect from "react-native-picker-select";
import {
  material,
  systemWeights,
  materialColors
} from "react-native-typography";

import { connect } from "react-redux";
import {
  majMethodeNissab,
  setDateNissabManu,
  setIsDateNissabManu,
  setMethodeCalcul
} from "../../actions/MesActions";
import momentHijri from "moment-hijri";
import moment from "moment";

class ReglageScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Réglages",
    drawerIcon: (
      <Icon
        type="SimpleLineIcons"
        name="settings"
        style={{ fontSize: 24, color: MAINCOLOR }}
      />
    )
  };

  constructor(props) {
    super(props);
  }
  render() {
    const descriptionM1 =
      "bla bla bla blabla  bla bla blabla bla bla bla blabla bla bla bla bla bla bla blabla bla bla bla";
    const date = momentHijri("11012019", "DDMMYYYY").format("DD MMMM YYYY");

    dateDebut = momentHijri();
    dateDebut.subtract(1, "iYear");
    //dateDebut = dateDebut.format("iYYYY/iM/iD [is] YYYY/M/D");

    dates = [];

    while (dateDebut.format("YYYY-MM-DD") != moment().format("YYYY-MM-DD")) {
      dates.push(dateDebut.format("iDD iMMMM (DD MMMM YYYY)"));
      dateDebut.add(1, "Day");
    }
    //console.log(dates);

    return (
      <Content style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
        <HeaderBack
          backgroundColor={MAINCOLOR}
          title="Réglages"
          navigator={this.props.navigation}
        />
        <View style={{ flex: 1 }}>
          <View style={customStyle.reglageItemTitre}>
            <Text
              style={[
                material.subheading,
                systemWeights.light,
                { color: materialColors.blackSecondary }
              ]}
            >
              CHANGER LA REFERENCE DU NISSAB
            </Text>
          </View>

          <View style={customStyle.reglageItemSwitch}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                type="Entypo"
                name="circle"
                style={{ fontSize: 24, marginRight: 25, color: "#FFD700" }}
              />
              <Text
                style={[
                  material.subheading,
                  systemWeights.semibold,
                  { color: materialColors.blackPrimary }
                ]}
              >
                {"basé sur l'or"}
              </Text>
            </View>

            <Switch
              value={this.props.methodeSelectionnee == "Or"}
              onValueChange={() => this.props.majMethodeNissab("Or")}
            />
          </View>

          <View style={customStyle.lineStyle} />
          <View style={customStyle.reglageItemSwitch}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                type="Entypo"
                name="circle"
                style={{ fontSize: 24, marginRight: 25, color: "#C0C0C0" }}
              />
              <Text
                style={[
                  material.subheading,
                  systemWeights.semibold,
                  { color: materialColors.blackPrimary }
                ]}
              >
                {"basé sur l'argent"}
              </Text>
            </View>
            <Switch
              value={this.props.methodeSelectionnee == "Argent"}
              onValueChange={() => this.props.majMethodeNissab("Argent")}
            />
          </View>

          <View style={customStyle.reglageItemTitre}>
            <Text
              style={[
                material.subheading,
                systemWeights.light,
                { color: materialColors.blackSecondary }
              ]}
            >
              CHOISIR SA METHODE DE CALCUL
            </Text>
          </View>

          <View style={customStyle.reglageItemSwitch}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                type="Ionicons"
                name="md-hand"
                style={{ fontSize: 24, marginRight: 25, color: MAINCOLOR }}
              />
              <Text
                style={[
                  material.subheading,
                  systemWeights.semibold,
                  { color: materialColors.blackPrimary }
                ]}
              >
                {"Méthode des Malikites"}
              </Text>
            </View>

            <Switch
              value={this.props.methodeCalcul == "Malikite"}
              onValueChange={() => this.props.setMethodeCalcul("Malikite")}
            />
          </View>
          <View style={[customStyle.reglageItemSwitch, { paddingLeft: 30 }]}>
            <Text
              style={[material.body1, { color: materialColors.blackSecondary }]}
            >
              {descriptionM1}
            </Text>
          </View>

          <View style={customStyle.lineStyle} />

          <View style={customStyle.reglageItemSwitch}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                type="MaterialIcons"
                name="autorenew"
                style={{ fontSize: 24, marginRight: 25, color: MAINCOLOR }}
              />
              <Text
                style={[
                  material.subheading,
                  systemWeights.semibold,
                  { color: materialColors.blackPrimary }
                ]}
              >
                {"Méthode des Hanbalites"}
              </Text>
            </View>
            <Switch
              value={this.props.methodeCalcul == "Hanbalite"}
              onValueChange={() => this.props.setMethodeCalcul("Hanbalite")}
            />
          </View>
          <View style={[customStyle.reglageItemSwitch, { paddingLeft: 30 }]}>
            <Text
              style={[material.body1, { color: materialColors.blackSecondary }]}
            >
              {descriptionM1}
            </Text>
          </View>

          <View style={customStyle.reglageItemTitre}>
            <Text
              style={[
                material.subheading,
                systemWeights.light,
                { color: materialColors.blackSecondary }
              ]}
            >
              DATE DU PREMIER DEPASSEMENT DE NISSAB
            </Text>
          </View>

          <View style={customStyle.reglageItem}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                type="Entypo"
                name="circle"
                style={{ fontSize: 24, marginRight: 25, color: MAINCOLOR }}
              />
              <Text
                style={[
                  material.subheading,
                  systemWeights.semibold,
                  { color: materialColors.blackPrimary }
                ]}
              >
                {"Définir une date soi même"}
              </Text>
            </View>
            <Switch
              value={this.props.isDateNissabManu}
              onValueChange={() =>
                this.props.setIsDateNissabManu(!this.props.isDateNissabManu)
              }
            />
          </View>
          <View style={customStyle.lineStyle} />

          {this.props.isDateNissabManu ? (
            <View style={customStyle.reglageItem}>
              <Icon
                type="FontAwesome"
                name="calendar-plus-o"
                style={{ fontSize: 24, marginRight: 25, color: MAINCOLOR }}
              />
              <Picker
                style={{
                  flex: 1,
                  borderColor: "black",
                  borderWidth: 1
                }}
                selectedValue={this.props.dateNissabManu}
                onValueChange={(itemValue, itemIndex) =>
                  this.props.setDateNissabManu(itemValue)
                }
              >
                {dates.reverse().map((date, key) => {
                  return <Picker.Item key={key} label={date} value={date} />;
                })}
              </Picker>
            </View>
          ) : null}
        </View>
      </Content>
    );
  }
}

// This function provides access to data in the Redux state in the React component
// In this example, the value of this.props.count will now always have the same value
// As the count value in the Redux state
function mapStateToProps(state) {
  return {
    methodeSelectionnee: state.reglageReducer.methodeSelectionnee,
    isDateNissabManu: state.reglageReducer.isDateNissabManu,
    dateNissabManu: state.reglageReducer.dateNissabManu,
    methodeCalcul: state.reglageReducer.methodeCalcul
  };
}
// This function provides a means of sending actions so that data in the Redux store
// can be modified. In this example, calling this.props.addToCounter() will now dispatch
// (send) an action so that the reducer can update the Redux state.
function mapDispatchToProps(dispatch) {
  return {
    majMethodeNissab: methodeChoisie =>
      dispatch(majMethodeNissab(methodeChoisie)),
    setIsDateNissabManu: value => dispatch(setIsDateNissabManu(value)),
    setDateNissabManu: date => dispatch(setDateNissabManu(date)),
    setMethodeCalcul: methode => dispatch(setMethodeCalcul(methode))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReglageScreen);
