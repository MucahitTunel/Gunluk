import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Item, Input } from 'native-base';

export default class RoundedTextboxExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Item rounded>
            <Input placeholder='Rounded Textbox'/>
          </Item>
        </Content>
      </Container>
    );
  }
}



const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 300,
    height: 300,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  kitap:{
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
