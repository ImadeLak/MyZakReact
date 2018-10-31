import React, {Component} from 'react';
import {View,Text,} from 'react-native';
import {Container,Button} from 'native-base'
//Rredux
import {connect} from 'react-redux'
import {addToCounter} from '../actions/MesActions'


class MonTest extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (

      <View>
          <Text>Hello {this.props.username} {this.props.monCounter} </Text>
          <Button onPress={() => this.props.monAddToCounter()}>
            <Text>Click Me!</Text>
          </Button>
      </View>
    )
  }
}

// This function provides a means of sending actions so that data in the Redux store
// can be modified. In this example, calling this.props.addToCounter() will now dispatch
// (send) an action so that the reducer can update the Redux state.
function mapDispatchToProps(dispatch) {
  return {
    monAddToCounter: () => dispatch(addToCounter())
  }
}

// This function provides access to data in the Redux state in the React component
// In this example, the value of this.props.count will now always have the same value
// As the count value in the Redux state
function mapStateToProps(state) {
  return {
    monCounter: state.monReducer.counter,
    username: state.monReducer.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonTest)
