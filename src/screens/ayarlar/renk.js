import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, TextInput, Alert,ToastAndroid,SafeAreaView, FlatList} from 'react-native';
import { Container, Header, Content, Tab, Tabs,Button, Left, Body, Right, Icon, Title, Item, Input, Form, Textarea, TabHeading } from 'native-base';


class Renk extends Component<Props>{



  constructor(props){
    super(props);

    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});


    const list = [
      {id: 1, renk:"#f25e6d"},
      {id: 2, renk:"#f0051d"},
      {id: 3, renk:"#80000a"},
      {id: 4, renk:"#752830"},
      {id: 5, renk:"#eaa427"},
      {id: 6, renk:"#e4bb72"},
      {id: 7, renk:"#7c653b"},
      {id: 8, renk:"#94e203"},
      {id: 9, renk:"#bbe865"},
      {id: 10, renk:"#47572a"},
      {id: 11, renk:"#243504"},
      {id: 12, renk:"#96ed97"},
      {id: 13, renk:"#3f7e3f"},
      {id: 14, renk:"#0bf8cc"},
      {id: 15, renk:"#025d4c"},
      {id: 16, renk:"#3d5f59"},
      {id: 17, renk:"#0e72ed"},
      {id: 18, renk:"#032146"},
      {id: 19, renk:"#93b6e2"},
      {id: 20, renk:"#cd03f5"},
      {id: 21, renk:"#3f044b"},
      {id: 22, renk:"#847986"},
      {id: 23, renk:"#e80579"}];


    this.state = {
      list : list,
      renk : "#eddada",
      db,
    }


  }


componentWillMount(){
  const {db} = this.state;


  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM renksecimi",[], (tx,results) =>{
      console.log("sonuc :    "  +results);
      var body = results.rows.item(0).arkaplanbody;
      var header = results.rows.item(0).arkaplanheader;

      console.log(body);
      console.log(header);

      this.setState({
        renk : body,
      })

    });

  })
}


componentWillUnmount(){
  const {db} = this.state;

  db.close();
}


//-----------------------------------------------------------------------------
kaydet(){

  const {db} = this.state;

        db.transaction((tx) => {
          tx.executeSql("UPDATE renksecimi SET arkaplanbody = ?",[this.state.renk], (tx, results) => {
              if(results.rowsAffected > 0){
                ToastAndroid.show('Kaydedildi', ToastAndroid.SHORT);
                this.props.navigation.goBack()
              }else {
                ToastAndroid.show('Kaydedildi', ToastAndroid.SHORT);
              }
            });
        });

  }



  gonder = (renk) => {

    this.setState({
      renk : renk,
    })
  }

//-----------------------------------------------------------------------------
//format-letter-case

    renderItem = ({ item }) => {

      return(
        <TouchableOpacity style = {{backgroundColor:item.renk, height:60, width:60, margin:10, borderRadius:30, borderWidth:1}} onPress={this.gonder.bind(this, item.renk)}>


        </TouchableOpacity>
      )

    }


  //------------------------------------------------------------------------------------------------------------



  render(){
    return(

      <Container style={{backgroundColor:this.state.renk}}>


      <Header style={{backgroundColor:"purple"}}>

      <Left>
        <Button transparent>
            <Icon name='arrow-back' />
        </Button>
      </Left>

      <Right>


        <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}} onPress={this.kaydet.bind(this)}>

          <Icon name='md-done-all' style={{fontSize:30, color:'white'}} />

        </TouchableOpacity>


      </Right>

      </Header>




      <Content>

      <View style={{flex:1}}>

        <View>

            <SafeAreaView style={{margin:10}}>

              <FlatList
                data={this.state.list}
                renderItem={this.renderItem}
                keyExtractor={item=>item.id.toString()}
                numColumns={5}
              >

              </FlatList>

            </SafeAreaView>

        </View>

      </View>

      </Content>







      </Container>

    );
  }

}

export default Renk;
