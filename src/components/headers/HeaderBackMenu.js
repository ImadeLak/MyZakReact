import React from "react";
import {
  Header,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import { MAINCOLOR, GREEN } from "../../style/zakStyles";
import MonModal from "../MonModal";
import { modalText } from "../../texte/modalText";
import { LinearGradient } from "expo";
import { material, systemWeights } from "react-native-typography";

import { connect } from "react-redux";

class HeaderBackMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 75,
          paddingTop: 30,
          margin: 0,
          justifyContent: "space-between"
        }}
      >
        <Button transparent onPress={() => this.props.navigator.openDrawer()}>
          <Icon name="menu" style={{ fontSize: 30, color: "white" }} />
        </Button>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={[
              material.titleWhite,
              systemWeights.regular,
              { marginTop: 2 }
            ]}
          >
            {this.props.title}
          </Text>
        </View>

        <TouchableOpacity onPress={this._toggleModal}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.4)",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: "rgba(0,0,0,0.4)",
              paddingHorizontal: 10
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-end",
                marginRight: 0
              }}
            >
              <Text style={[material.body1White, systemWeights.light]}>
                Nissab - {this.props.methodeSelectionnee}
              </Text>
              <Text style={[material.body1White, systemWeights.light]}>
                3 120,54 €
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <MonModal
          isModalVisible={this.state.isModalVisible}
          toggleModal={this._toggleModal}
          titre={modalText.Nissab.titre}
          texte={modalText.Nissab.texte}
        />
      </View>
    );
  }
}

// This function provides access to data in the Redux state in the React component
// In this example, the value of this.props.count will now always have the same value
// As the count value in the Redux state
function mapStateToProps(state) {
  return {
    methodeSelectionnee: state.reglageReducer.methodeSelectionnee
  };
}

export default connect(
  mapStateToProps,
  {}
)(HeaderBackMenu);
