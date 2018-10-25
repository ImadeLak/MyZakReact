import React from "react";
import { Text, Container, Content, Icon, Toast } from "native-base";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Font, AppLoading, LinearGradient } from "expo";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  material,
  systemWeights,
  materialColors
} from "react-native-typography";

import { connect } from "react-redux";

import MonModal from "../../MonModal";
import ModalForm from "../../ModalForm";
import { modalText } from "../../../texte/modalText";

import HeaderBackMenu from "../../headers/HeaderBackMenu";

import moment from "moment";
import momentHijri from "moment-hijri";
import fr from "moment/locale/fr";

import { APIgetUserHistorique } from "../../../lib/DjangoAPI";
import { setBlocs, setComptesBancaire } from "../../../actions/MesActions";

import styles, {
  GREEN,
  GREY,
  RED,
  MAINCOLOR,
  PEPS,
  FONCE,
  CLAIR,
  PEPSCERCLE
} from "../../../style/zakStyles";
import sdv from "../../../style/images/sdv.png";
import bokeh from "../../../style/images/bokeh3.png";
import wallet from "../../../style/images/walletcute.png";

class SituationResume extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isModalFormEspeceVisible: false,
      isModalFormImmoVisible: false
    };
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  _toggleModalFormEspece = () =>
    this.setState({
      isModalFormEspeceVisible: !this.state.isModalFormEspeceVisible
    });

  _toggleModalFormImmo = () =>
    this.setState({
      isModalFormImmoVisible: !this.state.isModalFormImmoVisible
    });

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

  componentDidMount() {
    /*   Toast.show({
       text: "Infos mises à jour!",
       buttonText: "Bismillah",
       style:{backgroundColor:CLAIR, height:60},
       duration:2000
     })*/
  }
  TriBlocs(a, b) {
    da = new Date(a.date);
    db = new Date(b.date);
    return da > db ? 1 : -1;
  }
  render() {
    blocs = this.props.blocs;
    //blocs.sort(this.TriBlocs);
    if (blocs.length != 0) {
      // On va chercher le dernier passage de NISSAB (actif)

      // Caca !!
      lastBloc = blocs[blocs.length - 1];
      //console.log("LASTBLOCS", this.props.blocs);
      lastEspece = lastBloc.solde_espece;
      lastImmo = lastBloc.solde_immo;

      //Solde Total compte banque
      soldeTotalBancaire = 0;
      if (Array.isArray(lastBloc.solde_banque))
        lastBloc.solde_banque.forEach(function(item) {
          soldeTotalBancaire = soldeTotalBancaire + item.solde;
        });

      //solde user
      soldeUser = soldeTotalBancaire + lastEspece + lastImmo;
      isSupNissab = soldeUser > 1000 ? true : false;

      if (isSupNissab) {
        dernierBlocNissab = "";
        isBlocPrecedentSupNissab = false;
        for (var i = 1; i < blocs.length; i++) {
          if (blocs[i].etat == "actif") {
            //Calcul du solde Total du bloc
            soldeBanqueBloc = 0;
            if (Array.isArray(blocs[i].solde_banque)) {
              blocs[i].solde_banque.forEach(function(item) {
                soldeBanqueBloc = soldeBanqueBloc + item.solde;
              });
            }
            soldeTotalBloc =
              soldeBanqueBloc + blocs[i].solde_espece + blocs[i].solde_immo;

            // On voit si on est positif ou pas
            isSupNissab = soldeTotalBloc > 1000 ? true : false;

            // Si positif on compare avec le bloc precedent
            if (isSupNissab) {
              if (!isBlocPrecedentSupNissab) {
                //On garde
                dernierBlocNissab = blocs[i];
              }
            }

            isBlocPrecedentSupNissab = isSupNissab;
          }
        }
        console.log("dernierBlocNissab", dernierBlocNissab);

        dateZakat = momentHijri(dernierBlocNissab.date).add(1, "iYear");
        nbJours = dateZakat.diff(moment(), "days");
      }

      moment.updateLocale("fr", fr);

      NissabNOK = (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
            padding: 10
          }}
        >
          <Text
            style={[
              material.display1White,
              systemWeights.regular,
              {
                color: materialColors.whitePrimary
              }
            ]}
          >
            Oula !
          </Text>
          <Image
            style={{ height: 170, width: 144, margin: 10 }}
            source={wallet}
          />
          <Text
            style={[
              material.title,
              systemWeights.light,
              {
                color: materialColors.whitePrimary,
                textAlign: "center"
              }
            ]}
          >
            Vous n'avez pas encore atteint le Nissab
          </Text>
        </View>
      );
    }

    return (
      <Container style={{ flex: 1, backgroundColor: "#d2dae2" }}>
        {this.props.blocs.length == 0 ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ zIndex: 2, elevation: 2 }}>
              <LinearGradient
                start={[1, 1]}
                end={[1, 0]}
                colors={[CLAIR, FONCE]}
              >
                <ImageBackground
                  style={{ height: "auto", width: "auto", elevation: 2 }}
                  source={bokeh}
                >
                  <HeaderBackMenu
                    title="Ma situation"
                    navigator={this.props.screenProps.drawerNavigation}
                  />
                  {isSupNissab ? (
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "transparent",
                        marginVertical: 20,
                        marginBottom: 70,
                        paddingHorizontal: 5
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}
                      >
                        <View style={{ alignItems: "center" }}>
                          <Text
                            style={[
                              material.subheadingWhite,
                              systemWeights.regular
                            ]}
                          >
                            Montant de la Zakat
                          </Text>
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={[
                                material.display1White,
                                systemWeights.light,
                                {
                                  fontSize: 30,
                                  color: materialColors.whitePrimary
                                }
                              ]}
                            >
                              {(soldeUser / 40)
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                                .replace(".", ",")}
                            </Text>
                            <Text
                              style={[
                                material.display1White,
                                systemWeights.light,
                                {
                                  fontSize: 30,
                                  color: materialColors.whitePrimary,
                                  marginLeft: 5
                                }
                              ]}
                            >
                              €
                            </Text>
                          </View>
                        </View>

                        <Image
                          source={sdv}
                          style={{ height: 100, width: 100 }}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1.2,
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <AnimatedCircularProgress
                          size={140}
                          width={4}
                          fill={100 - (nbJours / 365) * 100}
                          tintColor={PEPSCERCLE}
                          backgroundColor="rgba(0, 0, 0, 0.3)"
                          rotation={0}
                          duration={1400}
                          lineCap="round"
                        >
                          {() => (
                            <View
                              style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <Text
                                style={[
                                  material.body1White,
                                  systemWeights.regular
                                ]}
                              >
                                Dans
                              </Text>
                              <Text
                                style={[
                                  material.display1White,
                                  systemWeights.light,
                                  {
                                    fontSize: 30,
                                    color: materialColors.whitePrimary
                                  }
                                ]}
                              >
                                {dateZakat.fromNow(true)}
                              </Text>
                              <Text
                                style={[
                                  material.body1White,
                                  systemWeights.regular
                                ]}
                              >
                                soit {nbJours} jr
                              </Text>
                            </View>
                          )}
                        </AnimatedCircularProgress>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap"
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              alignItems: "center",
                              marginTop: 10,
                              borderWidth: 1,
                              borderColor: "white",
                              borderRadius: 10,
                              padding: 5
                            }}
                            onPress={this._toggleModal}
                          >
                            <Text
                              style={[
                                material.body1White,
                                systemWeights.regular
                              ]}
                            >
                              {dateZakat.format("DD MMMM YYYY")}
                            </Text>
                            <Text
                              style={[
                                material.body1White,
                                systemWeights.regular
                              ]}
                            >
                              {dateZakat.format("iDD iMMMM iYYYY")}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ) : (
                    NissabNOK
                  )}
                </ImageBackground>
              </LinearGradient>
              <View>
                <MonModal
                  isModalVisible={this.state.isModalVisible}
                  toggleModal={this._toggleModal}
                  titre={modalText.DatePaiement.titre}
                  texte={modalText.DatePaiement.texte}
                />

                <ModalForm
                  isModalVisible={this.state.isModalFormEspeceVisible}
                  toggleModal={this._toggleModalFormEspece}
                  titre="Montant en espèce"
                  icon="money"
                  texte={lastEspece}
                />

                <ModalForm
                  isModalVisible={this.state.isModalFormImmoVisible}
                  toggleModal={this._toggleModalFormImmo}
                  titre="Valeur biens immo."
                  icon="home"
                  texte={lastImmo}
                />
              </View>
            </View>

            <Content style={{ zIndex: 5, marginTop: -30, elevation: 10 }}>
              <View style={[styles.tuile]}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("ListeBanques")}
                >
                  <View style={styles.tuileLigneUne}>
                    <Icon
                      type="SimpleLineIcons"
                      name="credit-card"
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
                          material.body1,
                          systemWeights.regular,
                          { color: materialColors.blackSecondary }
                        ]}
                      >
                        Comptes bancaires
                      </Text>
                    </View>
                    <Text
                      style={[
                        material.subheading,
                        systemWeights.light,
                        { color: MAINCOLOR }
                      ]}
                    >
                      {soldeTotalBancaire
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

                    <Icon
                      type="Entypo"
                      name="chevron-small-right"
                      style={{ fontSize: 20, color: MAINCOLOR, marginLeft: 15 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.tuile}>
                <TouchableOpacity onPress={this._toggleModalFormEspece}>
                  <View style={styles.tuileLigneUne}>
                    <Icon
                      type="FontAwesome"
                      name="money"
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
                          material.body1,
                          systemWeights.regular,
                          { color: materialColors.blackSecondary }
                        ]}
                      >
                        Espèces
                      </Text>
                    </View>
                    <Text
                      style={[
                        material.subheading,
                        systemWeights.light,
                        { color: MAINCOLOR }
                      ]}
                    >
                      {lastEspece
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

                    <Icon
                      type="Feather"
                      name="edit-2"
                      style={{ fontSize: 20, color: MAINCOLOR, marginLeft: 15 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={[styles.tuile, { marginBottom: 5 }]}>
                <TouchableOpacity onPress={this._toggleModalFormImmo}>
                  <View style={styles.tuileLigneUne}>
                    <Icon
                      type="SimpleLineIcons"
                      name="home"
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
                          material.body1,
                          systemWeights.regular,
                          { color: materialColors.blackSecondary }
                        ]}
                      >
                        Immobiliers
                      </Text>
                    </View>
                    <Text
                      style={[
                        material.subheading,
                        systemWeights.light,
                        { color: MAINCOLOR }
                      ]}
                    >
                      {lastImmo
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

                    <Icon
                      type="Feather"
                      name="edit-2"
                      style={{ fontSize: 20, color: MAINCOLOR, marginLeft: 15 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </Content>
          </View>
        )}
      </Container>
    );
  }
}

// This function provides access to data in the Redux state in the React component
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
)(SituationResume);
