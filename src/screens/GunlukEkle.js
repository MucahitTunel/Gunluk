import React, {Fragment} from 'react';
import {Component} from 'react';
//import { Tabs, Tab, Icon, Header } from 'react-native-elements';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  TextInput
} from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input, Form, Textarea} from 'native-base';
const window = Dimensions.get('window');






  class App extends Component<Props>{

    constructor(props){
    super(props)

    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});


    this.state = {
      petname : "",
      baslik: "",
      tarih:'',
    };

    this.handleChangeBaslik = this.handleChangeBaslik.bind(this);
    this.handleChangeGunluk = this.handleChangeGunluk.bind(this);



    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM baslangic WHERE deger=?',[1], (tx, results) => {
          var len = results.rows.length;
          console.log("Uzunluk: "+len);
          if(len > 0){
            var row = results.rows.item(0);
            console.log(row);
            this.setState({petname: row.deger});
          }
        });
    });
  }

  componentDidMount(){
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    this.setState({
      tarih: date + '.' + month + '.' + year,
    });
  }




  handleChangeBaslik(a){
    this.setState({
      baslik : a,
    });
    console.log(this.state.baslik);
  }


  handleChangeGunluk(a){
    this.setState({
      gunluk: a,
    });
    console.log(this.state.gunluk);
  }


    render(){
      return (

          <Container style={styles.container}>

          <Header style={{backgroundColor:"purple"}}>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Header</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='search' />
              </Button>
              <Button transparent>
                <Icon name='heart' />
              </Button>
              <Button transparent>
                <Icon name='more' />
              </Button>

            </Right>
          </Header>


          <Content style={styles.content}>

          <ImageBackground
            source={ require("../pages/bos.png")}
            style={{
              height: window.height,
              width: window.width,

              resizeMode: 'stretch',

            }}
            >
            <Text style={{marginTop:(window.height/10)-10,marginLeft:(window.width*3)/4, alignItems: 'center', justifyContent:'flex-end', fontSize:14}}>
              Tarih: {this.state.tarih}
            </Text>

            <TextInput
              placeholder="Başlık"
              style={{marginTop:20, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:25,fontSize:12, color:'black', height:35}}
              onChangeText={this.handleChangeBaslik}
              />

            <Form>
              <Textarea
                rowSpan={10}
                bordered
                placeholder="Textarea"
                style={{marginTop:10, marginLeft:20, marginRight:20,marginBottom:30, backgroundColor:"white", fontSize:16, color:"black", borderRadius:25}}
                onChangeText={this.handleChangeGunluk}/>
            </Form>

          </ImageBackground>


          </Content>
      </Container>







  );
  }
};

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  Content:{
    flex: 1
  }

});

export default App;
