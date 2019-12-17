import * as SecureStore from "expo-secure-store";

//const DJANGO_URL = "http://192.168.1.14:8000";
//const DJANGO_URL = "http://192.168.205.182:8000";
const DJANGO_URL = "http://137.74.28.217:8000";
//const DJANGO_URL = "http://192.168.205.182:8000";

export const APIlogin = (username, password) => {
  var obj = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify({
      username: username,
      password: password
    })
  };

  return fetch(DJANGO_URL + "/get_auth_token/", obj).then(response => {
    return response.json();
  });
};

export const APIgetUserHistorique = async () => {
  APIToken = await SecureStore.getItemAsync("APIToken");
  var header_request = {
    headers: new Headers({
      Authorization: "Token " + APIToken
    })
  };
  console.log(header_request);
  return fetch(DJANGO_URL + "/get_historique/", header_request).then(
    response => {
      return response.json();
    }
  );
};

export const APIpostCompteBancaire = async (idBank, login, mdp) => {
  APIToken = await SecureStore.getItemAsync("APIToken");
  var obj = {
    headers: {
      Authorization: "Token " + APIToken,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify({
      login_compteBancaire: login,
      password_compteBancaire: mdp,
      banque: idBank
    })
  };
  console.log(obj);

  return fetch(DJANGO_URL + "/compte_bancaire/", obj).then(response => {
    return response.json();
  });
};

export const APIdeleteCompteBancaire = async id_compteBancaire => {
  APIToken = await SecureStore.getItemAsync("APIToken");
  var obj = {
    headers: {
      Authorization: "Token " + APIToken,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "delete"
  };
  console.log(obj);
  return fetch(
    DJANGO_URL + "/edit_compte_bancaire/" + id_compteBancaire + "/",
    obj
  ).then(response => {
    return "suppression faite askip";
  });
};

export const APIupdateEspece = async espece => {
  APIToken = await SecureStore.getItemAsync("APIToken");
  var obj = {
    headers: {
      Authorization: "Token " + APIToken,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "put",
    body: JSON.stringify({
      montant: espece
    })
  };
  console.log(obj);
  return fetch(DJANGO_URL + "/historique_espece/", obj).then(response => {
    return response.json();
  });
};

export const APIupdateImmo = async immo => {
  APIToken = await SecureStore.getItemAsync("APIToken");
  var obj = {
    headers: {
      Authorization: "Token " + APIToken,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "put",
    body: JSON.stringify({
      montant: immo
    })
  };
  console.log(obj);
  return fetch(DJANGO_URL + "/historique_immo/", obj).then(response => {
    return response.json();
  });
};

export const APIupdateEtatBloc = async (ID, etat) => {
  APIToken = await SecureStore.getItemAsync("APIToken");
  var obj = {
    headers: {
      Authorization: "Token " + APIToken,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "put",
    body: JSON.stringify({
      etat: etat,
      ID: ID
    })
  };
  console.log(obj);
  return fetch(DJANGO_URL + "/maj_etat_bloc/", obj).then(response => {
    return response.json();
  });
};

export const APImajSolde = async () => {
  APIToken = await SecureStore.getItemAsync("APIToken");
  var header_request = {
    headers: new Headers({
      Authorization: "Token " + APIToken
    })
  };
  return fetch(DJANGO_URL + "/maj_solde/", header_request).then(response => {
    return response.json();
  });
};

export const getBonjour = token => {
  var obj1 = {
    headers: new Headers({
      Authorization: "Token " + token
    })
  };
  return fetch(DJANGO_URL + "/bonjour/", obj1).then(response => {
    return response.json();
  });
};
