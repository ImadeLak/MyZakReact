import React from "react";
import { createStackNavigator } from "react-navigation";

import SituationResume from "../screens/Situation/SituationResume";
import ListeBanques from "../screens/Situation/ListeBanques";
import {
  ChoisirBanque,
  SaisirLogin,
  SaisirPassword
} from "../screens/Situation/AddBank";

/*export default class TabSituation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RootStackNav screenProps = {this.props.screenProps}/>
    );
  }
}*/

export const StackNavigatorSituation = createStackNavigator({
  Demarrage: {
    screen: SituationResume,
    navigationOptions: {
      header: null
    }
  },
  ListeBanques: {
    screen: ListeBanques,
    navigationOptions: {
      header: null
    }
  },
  ChoisirBanque: {
    screen: ChoisirBanque,
    navigationOptions: {
      header: null
    }
  },
  SaisirLogin: {
    screen: SaisirLogin,
    navigationOptions: {
      header: null
    }
  },
  SaisirPassword: {
    screen: SaisirPassword,
    navigationOptions: {
      header: null
    }
  }
});
