import React from "react";
import AppNavigator from "./src/components/navigators/AppNavigator";
import { StatusBar, View, AppState } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppLoading } from "expo";

import configureStore from "./src/store/store.js";

const store = configureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
