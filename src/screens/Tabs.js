import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs,Button, Left, Body, Right, Icon, Title, Item, Input, Form, Textarea, TabHeading,StatusBar } from 'native-base';
import {TouchableOpacity} from 'react-native';
import AnaSayfa from './AnaSayfa';
import Galeri from './Galeri.js';
import Ayarlar from './Ayarlar.js';
import RNRestart from 'react-native-restart';



export default class TabsExample extends Component {

  constructor(props){
    super(props);

    console.log("tabs constructor");
    this.state = {
      refreshing : false,
      deger : 0,
    }

      console.log("tabs const");
  }




  yenile = () => {
    console.log("sayfa yenilendi************************************");
    if (this.state.deger === 0) {
      this.setState({
        deger : 1
      })
    }else {
      this.setState({
        deger : 0
      })
    }

  }//Yenile Sayfası

  componentDidMount() {
    console.log("didmount");
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { this.yenile.bind(this) },
    );
  }

  componentWillUnmount() {
    console.log("remove");
    this.didFocusListener.remove();
  }


  render() {

    const {navigation} = this.props;
    console.log("Tabs render");

    return (
      <Container style={{backgroundColor:'#eddada'}}>

          <Header style={{backgroundColor:"purple",alignItems:'center', justifyContent:'center'}} >

              <Body>
                <Title>Günlüğüm</Title>
              </Body>

              <Right>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("GunlukEkle",{onGoBack:this.yenile})}>
                  <Icon
                    name='md-add-circle'
                    style={{color:'white',marginRight:20, fontSize:40}}
                  />
                </TouchableOpacity>

              </Right>


          </Header>

          {this.state.deger === 1 ?

          <Tabs initialPage = {0}>
            <Tab heading="AnaSayfa" tabStyle={{backgroundColor: 'purple'}} activeTabStyle={{backgroundColor: 'purple'}}>
              <AnaSayfa />
            </Tab>
            <Tab heading="Galeri" tabStyle={{backgroundColor: 'purple'}} activeTabStyle={{backgroundColor: 'purple'}}>
              <Galeri />
            </Tab>
            <Tab heading="Ayarlar" tabStyle={{backgroundColor: 'purple'}} activeTabStyle={{backgroundColor: 'purple'}}>
              <Ayarlar />
            </Tab>
          </Tabs>

          :

          <Tabs initialPage = {0}>
            <Tab heading="AnaSayfa" tabStyle={{backgroundColor: 'purple'}} activeTabStyle={{backgroundColor: 'purple'}}>
              <AnaSayfa />
            </Tab>
            <Tab heading="Galeri" tabStyle={{backgroundColor: 'purple'}} activeTabStyle={{backgroundColor: 'purple'}}>
              <Galeri />
            </Tab>
            <Tab heading="Ayarlar" tabStyle={{backgroundColor: 'purple'}} activeTabStyle={{backgroundColor: 'purple'}}>
              <Ayarlar />
            </Tab>
          </Tabs>


          }



      </Container>
    );
  }
}
