import React from 'react'
import {Text,View,TouchableOpacity,ScrollView} from 'react-native';
import {Icon} from 'native-base';
import Modal from "react-native-modal"
import PropTypes from 'prop-types'
import {MAINCOLOR} from '../style/zakStyles'


export default class MonModal extends React.Component{

    constructor(props){
        super(props);

    }



    render(){

        return (
          <Modal isVisible={this.props.isModalVisible} onBackdropPress={this.props.toggleModal} transparent={true} >

            <View style={{ height: 420, marginVertical:50, padding:20, backgroundColor:'rgba(255, 255, 255, 0.9)', borderRadius:20}}>

                <TouchableOpacity onPress={this.props.toggleModal} style={{position:'absolute', top:10, right:15, zIndex:99,}}>
                  <Icon type="SimpleLineIcons" name="close"  style={{fontSize: 30, color:MAINCOLOR}}/>
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems:'flex-start', justifyContent:'flex-start'}}>
                    <Text style={{color:MAINCOLOR, fontSize: 20, marginTop:20}}>  {this.props.titre}</Text>
                </View>

                <View style={{ flex: 3}}>
                    <ScrollView >
                      <Text style={{color:'black', fontSize: 14}}>
                        {this.props.texte}
                      </Text>
                    </ScrollView>
                </View>

            </View>

          </Modal>
        );
    }
}

MonModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
}
MonModal.defaultProps = {
  titre: 'TITRE',
  texte: 'TEXTE',
};
