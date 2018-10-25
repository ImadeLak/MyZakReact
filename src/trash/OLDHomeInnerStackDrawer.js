import React from 'react';

import HomeTabsNavigator from './HomeTabsNavigator';

import {createStackNavigator} from 'react-navigation'

import {View, Text} from 'react-native';

import Test from './Test'

export default class HomeInnerStackDrawer extends React.Component {

  static navigationOptions = {
    //header: null,
  }
  render() {
      return (
        <MonInnerStack navigationDrawer={this.props.navigation}/>
      );
    }
}



export const MonInnerStack = createStackNavigator ({
Inner1Tabs: {  screen: HomeTabsNavigator},
InnerTest: {  screen: Test },

})
