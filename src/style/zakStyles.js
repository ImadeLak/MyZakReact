import { StyleSheet } from "react-native";
import Dimensions from "Dimensions";
import { materialColors } from "react-native-typography";

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const MARGIN = 40;
//export const MAINCOLOR = '#0984e3';
export const MAINCOLOR = "#00b894";
//export const MAINCOLOR = '#2980b9';
export const GREY = "#b2bec3";
export const RED = "#ff6b6b";
export const GREEN = "#2ecc71";
export const PEPS = "#e84393";
export const PEPSCERCLE = "#55efc4";
export const FONCE = "#00b894";
export const CLAIR = "#0984e3";

export const TRANSPARENCE = "rgba(255,255,255,0.4)";

export default StyleSheet.create({
  lineStyle: {
    borderWidth: 0.3,
    borderColor: "#f0f0f0"
  },

  reglageItemSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: "white"
  },
  reglageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white"
  },
  reglageItemTitre: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0"
  },

  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: "#f0f0f0" //"#ecf0f1" // Un genre de gris
  },

  tuile: {
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 1,
    marginBottom: 15
  },
  tuileDesactivee: {
    justifyContent: "space-between",
    backgroundColor: GREY,
    paddingTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 1,
    marginBottom: 15
  },
  tuileLigneUne: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    paddingHorizontal: 15
  },
  tuileLigneDeux: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 5

    //backgroundColor:'materialColors.blackSecondary' //'#1289A7',
  },
  pictureBackground: {
    flex: 1
  },
  containerLogo: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageLogo: {
    width: 80,
    height: 80,
    marginTop: 10
  },
  textLogo: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "transparent",
    marginTop: 20
  },

  containerForm: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    marginTop: 0
  },
  champsForm: {
    flex: 1,
    backgroundColor: "transparent"
  },
  btnEyeForm: {
    position: "absolute",
    zIndex: 99,
    width: 22,
    height: 22,
    right: 28,
    top: 9
  },
  iconEyeForm: {
    width: 25,
    height: 25,
    tintColor: "rgba(0,0,0,0.2)"
  },
  containerBoutonForm: {
    top: 0,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  buttonForm: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MAINCOLOR,
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    width: DEVICE_WIDTH - MARGIN
  },
  circleForm: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: MAINCOLOR,
    borderRadius: 100,
    alignSelf: "center",
    zIndex: 99,
    backgroundColor: MAINCOLOR
  },
  textForm: {
    color: "white",
    backgroundColor: "transparent"
  },
  loginfailedForm: {
    color: "red",

    alignItems: "center",

    fontSize: 20
  },
  imageForm: {
    width: 24,
    height: 24
  },
  inputForm: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: "#ffffff"
  },
  inputWrapperForm: {
    backgroundColor: "transparent"
  },
  inlineImgForm: {
    position: "absolute",
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9
  },

  containerHome: {
    flex: 1,
    margin: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },

  texteHome: {
    fontSize: 40,
    color: "black",
    alignItems: "center",
    justifyContent: "center"
  }
});
