import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs,Button, Left, Body, Right, Icon, Title, Item, Input, Form, Textarea, TabHeading } from 'native-base';
import AnaSayfa from './AnaSayfa';
import Galeri from './Galeri.js';



export default class TabsExample extends Component {

  constructor(props){
    super(props);

  }



  render() {

    const {navigation} = this.props;

    return (
      <Container style={{backgroundColor:'#eddada'}}>

          <Header style={{backgroundColor:"purple",alignItems:'center', justifyContent:'center'}} >

              <Body>
                <Title>Günlüğüm</Title>
              </Body>


          </Header>

          <Tabs>
            <Tab heading="AnaSayfa" tabStyle={{backgroundColor: 'purple'}} activeTabStyle={{backgroundColor: 'purple'}}>
              <AnaSayfa />
            </Tab>
            <Tab heading="Galeri" tabStyle={{backgroundColor: 'purple'}} activeTabStyle={{backgroundColor: 'purple'}}>
              <Galeri />
            </Tab>
          </Tabs>




      </Container>
    );
  }
}
