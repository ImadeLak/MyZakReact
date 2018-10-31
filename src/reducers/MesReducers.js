import * as MesActions from "../actions/MesActions";
import { combineReducers } from "redux";

// This is the default state of the app i.e. when the app starts for the first time
//4b1b6d129f42bf044920f0821bfdd72fbd060eb9
/*
const initialState = {
  methodeSelectionnee: "Or",
  isDateNissabManu: false,
  dateNissabManu: "",
  methodeCalcul: "Malikite",

  username: "",
  password: "",

  APIToken: "646ef4812dd33eda1be8ad61acfd8aab35854009",

  blocs: [],
  comptesBancaire: [],

  addBankBank: 1, //LCL
  addBankLogin: "",
  addBankMdp: ""
};

// This is a reducer which listens to actions and modifies the state
export const monReducer = (state = initialState, action) => {
  // A switch is used since if more actions are added in the future, it will be easy
  // to be able to handle this in the reducer since we just add another 'case'.

  switch (action.type) {
    case MesActions.MAJ_METHODE_NISSAB:
      return {
        ...state,
        methodeSelectionnee: action.methodeNissab
      };
    case MesActions.MAJ_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    case MesActions.MAJ_USERNAME:
      return {
        ...state,
        username: action.username
      };

    case MesActions.SET_BLOCS:
      //console.log("ACTION SET_BLOCS ", action.blocs);
      return {
        ...state,
        blocs: action.blocs
      };
    case MesActions.SET_COMPTES_BANCAIRE:
      //console.log("ACTION SET_COMPTES_BANCAIRE ", action.comptesBancaire);
      return {
        ...state,
        comptesBancaire: action.comptesBancaire
      };
    case MesActions.SET_IDTOKEN:
      return {
        ...state,
        APIToken: action.APIToken
      };

    case MesActions.ADD_BANK_BANK:
      return {
        ...state,
        addBankBank: action.addBankBank
      };

    case MesActions.ADD_BANK_LOGIN:
      return {
        ...state,
        addBankLogin: action.addBankLogin
      };
    case MesActions.ADD_BANK_MDP:
      return {
        ...state,
        addBankMdp: action.addBankMdp
      };
    case MesActions.SET_DATE_NISSAB_MANU:
      return {
        ...state,
        dateNissabManu: action.dateNissabManu
      };

    case MesActions.SET_IS_DATE_NISSAB_MANU:
      return {
        ...state,
        isDateNissabManu: action.isDateNissabManu
      };

    case MesActions.SET_METHODE_CALCUL:
      return {
        ...state,
        methodeCalcul: action.methodeCalcul
      };

    default:
      return state;
  }
};
*/

const initialStateData = {
  blocs: [],
  comptesBancaire: []
};

// This is a reducer which listens to actions and modifies the state
export const dataReducer = (state = initialStateData, action) => {
  // A switch is used since if more actions are added in the future, it will be easy
  // to be able to handle this in the reducer since we just add another 'case'.

  switch (action.type) {
    case MesActions.SET_BLOCS:
      //console.log("ACTION SET_BLOCS ", action.blocs);
      return {
        ...state,
        blocs: action.blocs
      };
    case MesActions.SET_COMPTES_BANCAIRE:
      //console.log("ACTION SET_COMPTES_BANCAIRE ", action.comptesBancaire);
      return {
        ...state,
        comptesBancaire: action.comptesBancaire
      };

    default:
      return state;
  }
};
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

const initialStateReglage = {
  methodeSelectionnee: "Or",
  isDateNissabManu: false,
  dateNissabManu: "",
  methodeCalcul: "Malikite"
};

// This is a reducer which listens to actions and modifies the state
export const reglageReducer = (state = initialStateReglage, action) => {
  // A switch is used since if more actions are added in the future, it will be easy
  // to be able to handle this in the reducer since we just add another 'case'.

  switch (action.type) {
    case MesActions.MAJ_METHODE_NISSAB:
      return {
        ...state,
        methodeSelectionnee: action.methodeNissab
      };
    case MesActions.SET_DATE_NISSAB_MANU:
      return {
        ...state,
        dateNissabManu: action.dateNissabManu
      };

    case MesActions.SET_IS_DATE_NISSAB_MANU:
      return {
        ...state,
        isDateNissabManu: action.isDateNissabManu
      };

    case MesActions.SET_METHODE_CALCUL:
      return {
        ...state,
        methodeCalcul: action.methodeCalcul
      };

    default:
      return state;
  }
};

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

const initialStateLogin = {
  username: "",
  password: ""
};

// This is a reducer which listens to actions and modifies the state
export const loginReducer = (state = initialStateLogin, action) => {
  // A switch is used since if more actions are added in the future, it will be easy
  // to be able to handle this in the reducer since we just add another 'case'.

  switch (action.type) {
    case MesActions.MAJ_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    case MesActions.MAJ_USERNAME:
      return {
        ...state,
        username: action.username
      };

    default:
      return state;
  }
};

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

const initialStateAaddCptBank = {
  addBankBank: 1, //LCL
  addBankLogin: "",
  addBankMdp: ""
};

// This is a reducer which listens to actions and modifies the state
export const addCptBankReducer = (state = initialStateAaddCptBank, action) => {
  // A switch is used since if more actions are added in the future, it will be easy
  // to be able to handle this in the reducer since we just add another 'case'.

  switch (action.type) {
    case MesActions.ADD_BANK_BANK:
      return {
        ...state,
        addBankBank: action.addBankBank
      };

    case MesActions.ADD_BANK_LOGIN:
      return {
        ...state,
        addBankLogin: action.addBankLogin
      };
    case MesActions.ADD_BANK_MDP:
      return {
        ...state,
        addBankMdp: action.addBankMdp
      };

    default:
      return state;
  }
};
