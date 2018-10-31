import React from 'react';
import { Button, Icon} from "native-base";
import {View, Text} from "react-native";
import {MAINCOLOR,FONCE,CLAIR } from '../../style/zakStyles'
import { LinearGradient } from 'expo';
import { material,systemWeights } from 'react-native-typography'


export default class HeaderBack extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    //console.log(this.props.navigator)
    return (


      <View style={{flexDirection:'row',height:75, paddingTop:30,
     margin:0, justifyContent: 'flex-start', alignItems:'center', backgroundColor:this.props.backgroundColor}}>


          <Button transparent onPress={()=> this.props.navigator.goBack()}>
            <Icon name="arrow-back"  style={{fontSize: 30, color:"white"}}/>
          </Button>


          <Text style={[material.titleWhite, systemWeights.regular,{marginLeft:10}]}>{this.props.title}</Text>

          <Text />
      </View>

    );
  }
}

HeaderBack.defaultProps = {
  backgroundColor: FONCE,
};
