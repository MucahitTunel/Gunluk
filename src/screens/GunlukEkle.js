import React, {Fragment} from 'react';
import {Component} from 'react';
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

import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Item, Input, Form, Textarea} from 'native-base'
const window = Dimensions.get('window');


  var SQLite = require('react-native-sqlite-storage');
  var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});



  class App extends Component<Props>{

    constructor(props){
    super(props)


    this.state = {
      petname : "",
      baslik: "",
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

            <TextInput
              placeholder="Başlık"
              style={{marginTop:50, marginLeft:20, marginRight:20, backgroundColor:"gray", borderRadius:25,fontSize:16, color:'white'}}
              onChangeText={this.handleChangeBaslik}
              />

            <Form>
              <Textarea
                rowSpan={2}
                bordered
                placeholder="Textarea"
                style={{marginTop:20, marginLeft:20, marginRight:20,marginBottom:30, backgroundColor:"gray", fontSize:30}}
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
