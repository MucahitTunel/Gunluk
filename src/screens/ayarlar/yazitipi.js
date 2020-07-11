import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, TextInput, Alert,ToastAndroid,SafeAreaView, FlatList, StyleSheet,  BackHandler} from 'react-native';
import { Container, Header, Content, Tab, Tabs,Button, Left, Body, Right, Icon, Title, Item, Input, Form, Textarea, TabHeading } from 'native-base';

import {Fonts} from '../../fonts/Fonts';


class YaziTipi extends Component<Props>{


  constructor(props){
    super(props);

    console.log("constructor--------------------------------------------------------");
    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});

    this.state = {

      boyut : 13,
      tip:"Roboto",
      list:[Fonts.BigShouldersText,Fonts.Inconsolata, Fonts.Lobster, Fonts.Merriweather, Fonts.OpenSansCondensed, Fonts.PlayfairDisplay, Fonts.Roboto, Fonts.RobotoMedium, Fonts.WorkSans, Fonts.ZhiMangXing],
      db,
      body:"",
      header:"",
    }

    console.log("constructor--------------------------------------------------------");
  }

componentDidMount(){
  this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  console.log("didmount---------------------------------------------------------");

  var size;
  var tip;
  const {db} = this.state;

  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM yazi",[], (tx,results) =>{
      console.log("sonuc :    "  +results);
       size = results.rows.item(0).size;
       tip = results.rows.item(0).tip;
       console.log("size: " + size);
       console.log(tip);

       this.setState({
         boyut:size,
         tip:tip,
       })

    });

  })

/*  var body;
  var header;


  console.log(Fonts);

  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM renksecimi",[], (tx,results) =>{
      console.log("sonuc :    "  +results);
      body = results.rows.item(0).arkaplanbody;
      header = results.rows.item(0).arkaplanheader;

      console.log(body);
      console.log(header);

      this.setState({

        body:body,
        header:header,
      })

    });

  })*/
  console.log("didmount---------------------------------------------------------");
}

handleBackPress = () => {

    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
}

//-----------------------------------------------------------------------------
kaydet(){

  const {db} = this.state;
  console.log(this.state.tip);
        db.transaction((tx) => {
          tx.executeSql("UPDATE yazi SET tip = ?",[this.state.tip], (tx, results) => {
              if(results.rowsAffected > 0){
                ToastAndroid.show('Kaydedildi', ToastAndroid.SHORT);
                this.props.navigation.goBack()
              }else {
                ToastAndroid.show('Kaydedildi', ToastAndroid.SHORT);
              }
            });
        });

  }



  gonder = (tip) => {


    this.setState({
      tip : tip,
    })
  }

//-----------------------------------------------------------------------------



  render(){

    console.log("render---------------------------------------------------------------");
    console.log(this.state.boyut);


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

          {this.state.list.map((deger, key) => {
            console.log("Değer değeri "+deger);
            console.log(this.state.boyut);
            return(

              <View key={key}>
                <View style={{marginTop:10}}>
                {this.state.tip === deger ?

                  <TouchableOpacity onPress={this.gonder.bind(this,deger)}>
                    <View style={{flexDirection:'row', height:30, flex:1}}>

                      <View style={{flex:5}}>
                        <Text style={{fontFamily:deger, marginLeft:20, fontSize:15}}>Lütfen yazı tipini seçiniz</Text>
                      </View>

                      <View style={{flex:1}}>
                          <Image style={{width:20, height:20, borderRadius:20}} source={require('../../radiobuton/noktali.png')}/>
                      </View>
                    </View>
                  </TouchableOpacity>



                  :

                  <TouchableOpacity onPress={this.gonder.bind(this,deger)}>
                    <View style={{flexDirection:'row', height:30, flex:1}}>
                      <View style={{flex:5}}>
                        <Text style={{fontSize:15, marginLeft:20,fontFamily:deger}}>Lütfen yazı tipini seçiniz</Text>
                      </View>

                      <View style={{flex:1,}}>
                          <Image style={{width:20, height:20, borderRadius:20}} source={require('../../radiobuton/dolu.png')}/>
                      </View>
                    </View>
                  </TouchableOpacity>

                }
                </View>

              </View>

            )}
        )}

      </Content>

      </Container>

    );
  }

}




export default YaziTipi;
