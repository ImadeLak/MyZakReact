// We speciify the name of the action as a variable
export const MAJ_METHODE_NISSAB = "MAJ_METHODE_NISSAB";
export const MAJ_USERNAME = "MAJ_USERNAME";
export const MAJ_PASSWORD = "MAJ_PASSWORD";
export const SET_BLOCS = "SET_BLOCS";
export const SET_COMPTES_BANCAIRE = "SET_COMPTES_BANCAIRE";
export const ADD_BANK_BANK = "ADD_BANK_BANK";
export const ADD_BANK_LOGIN = "ADD_BANK_LOGIN";
export const ADD_BANK_MDP = "ADD_BANK_MDP";
export const SET_DATE_NISSAB_MANU = "SET_DATE_NISSAB_MANU";
export const SET_IS_DATE_NISSAB_MANU = "SET_IS_DATE_NISSAB_MANU";
export const SET_METHODE_CALCUL = "SET_METHODE_CALCUL";

export function majMethodeNissab(methodeChoisie = "") {
  return {
    type: MAJ_METHODE_NISSAB,
    methodeNissab: methodeChoisie
  };
}

export function majUsername(username = "") {
  return {
    type: MAJ_USERNAME,
    username: username
  };
}

export function majPassword(password = "") {
  return {
    type: MAJ_PASSWORD,
    password: password
  };
}

export function setBlocs(blocs = "") {
  return {
    type: SET_BLOCS,
    blocs: blocs
  };
}

export function setComptesBancaire(comptesBancaire = "") {
  return {
    type: SET_COMPTES_BANCAIRE,
    comptesBancaire: comptesBancaire
  };
}

export function addBankBank(addBankBank = "") {
  return {
    type: ADD_BANK_BANK,
    addBankBank: addBankBank
  };
}
export function addBankLogin(addBankLogin = "") {
  return {
    type: ADD_BANK_LOGIN,
    addBankLogin: addBankLogin
  };
}
export function addBankMdp(addBankMdp = "") {
  return {
    type: ADD_BANK_MDP,
    addBankMdp: addBankMdp
  };
}

export function setIsDateNissabManu(isDateNissabManu = "") {
  return {
    type: SET_IS_DATE_NISSAB_MANU,
    isDateNissabManu: isDateNissabManu
  };
}
export function setDateNissabManu(dateNissabManu = "") {
  return {
    type: SET_DATE_NISSAB_MANU,
    dateNissabManu: dateNissabManu
  };
}
export function setMethodeCalcul(methodeCalcul = "") {
  return {
    type: SET_METHODE_CALCUL,
    methodeCalcul: methodeCalcul
  };
}
