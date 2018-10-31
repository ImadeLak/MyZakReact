import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Icon, Input, Form, Item, Label, Button } from "native-base";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { MAINCOLOR, CLAIR, FONCE, GREY } from "../style/zakStyles";

import {
  material,
  materialColors,
  systemWeights
} from "react-native-typography";

import { connect } from "react-redux";
import { setBlocs, setComptesBancaire } from "../actions/MesActions";

import {
  APIupdateEspece,
  APIgetUserHistorique,
  APIupdateImmo
} from "../lib/DjangoAPI";

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saisi: 0
    };
  }

  render() {
    return (
      <Modal
        animationInTiming={800}
        animationOutTiming={300}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={this.props.isModalVisible}
        onBackdropPress={this.props.toggleModal}
        transparent={true}
      >
        <View
          style={{
            height: 200,
            backgroundColor: materialColors.whitePrimary,
            borderRadius: 20
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: MAINCOLOR,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 20
            }}
          >
            <Icon
              type="FontAwesome"
              name={this.props.icon}
              style={{ fontSize: 30, color: materialColors.whitePrimary }}
            />
            <Text style={[material.titleWhite, systemWeights.regular]}>
              {" "}
              {this.props.titre}
            </Text>
            <TouchableOpacity onPress={this.props.toggleModal}>
              <Icon
                type="SimpleLineIcons"
                name="close"
                style={{ fontSize: 30, color: materialColors.whitePrimary }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
            <TextInput
              underlineColorAndroid={"rgba(0,0,0,0)"}
              autoFocus={true}
              keyboardType="numeric"
              placeholderTextColor={materialColors.blackTertiary}
              placeholder={this.props.texte.toString()}
              style={{
                fontSize: 18,
                backgroundColor: "#d2dae2",
                borderRadius: 10,
                padding: 15
              }}
              onChangeText={value => this.setState({ saisi: value })}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 20
            }}
          >
            <TouchableOpacity onPress={this.props.toggleModal}>
              <Text style={[material.subheading, systemWeights.regular]}>
                Annuler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginLeft: 30 }}
              onPress={() => {
                this.state.saisi =
                  this.state.saisi == "" ? 0 : this.state.saisi;

                if (this.props.icon == "money") {
                  APIupdateEspece(Number(this.state.saisi)).then(
                    responseData => {
                      this.props.setBlocs(responseData);
                      this.setState({ isLoading: false });
                    }
                  );
                }

                if (this.props.icon == "home") {
                  APIupdateImmo(Number(this.state.saisi)).then(responseData => {
                    this.props.setBlocs(responseData);
                    this.setState({ isLoading: false });
                  });
                }
                this.props.toggleModal();
              }}
            >
              <Text style={[material.subheading, systemWeights.regular]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

ModalForm.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};
ModalForm.defaultProps = {
  titre: "TITRE",
  texte: "TEXTE"
};

// This function provides access to data in the Redux state in the React component

function mapDispatchToProps(dispatch) {
  return {
    setBlocs: espece => dispatch(setBlocs(espece)),
    setComptesBancaire: cpt => dispatch(setComptesBancaire(cpt))
  };
}

function mapStateToProps(state) {
  return {
    username: state.loginReducer.username //useless
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalForm);
