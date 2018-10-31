import { createStore, combineReducers } from "redux";

import {
  dataReducer,
  loginReducer,
  addCptBankReducer,
  reglageReducer
} from "../reducers/MesReducers";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["loginReducer", "dataReducer", "addCptBankReducer"]
};

/*
const monReducerPersistConfig = {
  key: "monReducer",
  storage: storage,
  blacklist: ["methodeSelectionnee", "blocs", "comptesBancaire"]
};*/

const rootReducer = combineReducers({
  //monReducer: persistReducer(monReducerPersistConfig, monReducer)
  dataReducer: dataReducer,
  loginReducer: loginReducer,
  addCptBankReducer: addCptBankReducer,
  reglageReducer: reglageReducer
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
