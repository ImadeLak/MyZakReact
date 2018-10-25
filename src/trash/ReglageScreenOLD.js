import React from 'react'
import {Text, Container, Content, H1, Right,Radio, ListItem, List} from 'native-base'
import HeaderBack from './morceaux/HeaderBack'

export default class ReglageScreen extends React.Component {
  static navigationOptions = {
         //drawerLabel: () => null
    }
  render() {
    const baseOr = "Basé sur l'Or"
    const baseArgent = "Basé sur l'Argent"
    return (
        <Container>

          <HeaderBack title='Réglages' navigator={this.props.navigation}/>
          <Content>
              <H1>Test</H1>
                  <ListItem itemDivider>
                    <Text>Nissab</Text>
                  </ListItem>
                  <ListItem>
                    <Text>{baseOr}</Text>
                    <Right>
                      <Radio selected={false} />
                    </Right>
                  </ListItem>
                  <ListItem>
                    <Text>{baseArgent}</Text>
                    <Right>
                      <Radio selected={true} />
                    </Right>
                  </ListItem>

                  <ListItem itemDivider>
                    <Text>FORWARD</Text>
                  </ListItem>
                  <ListItem >
                    <Text>Aaron Bennet</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Claire Barclay</Text>
                  </ListItem>
                  <ListItem last>
                    <Text>Kelso Brittany</Text>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text>MIDFIELD</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Caroline Aaron</Text>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text>FORWARD</Text>
                  </ListItem>
                  <ListItem >
                    <Text>Aaron Bennet</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Claire Barclay</Text>
                  </ListItem>
                  <ListItem last>
                    <Text>Kelso Brittany</Text>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text>MIDFIELD</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Caroline Aaron</Text>
                  </ListItem><ListItem itemDivider>
                    <Text>FORWARD</Text>
                  </ListItem>
                  <ListItem >
                    <Text>Aaron Bennet</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Claire Barclay</Text>
                  </ListItem>
                  <ListItem last>
                    <Text>Kelso Brittany</Text>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text>MIDFIELD</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Caroline Aaron</Text>
                  </ListItem><ListItem itemDivider>
                    <Text>FORWARD</Text>
                  </ListItem>
                  <ListItem >
                    <Text>Aaron Bennet</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Claire Barclay</Text>
                  </ListItem>
                  <ListItem last>
                    <Text>Kelso Brittany</Text>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text>MIDFIELD</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Caroline Aaron</Text>
                  </ListItem>

          </Content>

        </Container>
    );
  }
}
