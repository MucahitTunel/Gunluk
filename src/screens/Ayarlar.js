import React, { Component } from 'react';
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
  TextInput,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import {Icon} from 'native-base';
import { withNavigation } from 'react-navigation';


class Ayarlar extends Component <Props>{
  constructor(props){
      super(props);

      console.log("Constructor Ayarlar");

      console.log("constructor");
      var SQLite = require('react-native-sqlite-storage');
      var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});


      const list = ["Şifre","Yazı Tipi","Yazı Boyutu","Renk","Hatırlatmalar", "Pdf Şeklinde Dışa Ver"]


      this.state = {
        list : list,
        tip:"roboto",
        boyut:15,
        db,
      }

  }



  componentDidMount(){
    //this.yaziTipi();
    this.yaziBoyutuTipi();
    console.log("ayarlar");
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { this.yaziBoyutuTipi() },
    );

  }



  yaziBoyutuTipi(){
    console.log("yaziBoyutuTipi");
    const {db} = this.state;

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM yazi',[], (tx,results) =>{
        var tip;
        var boyut;

        boyut = results.rows.item(0).size;
        tip = results.rows.item(0).tip;

        this.setState({
          boyut : boyut,
          tip:tip,
        })

      });
    })
  }



//-----------------------------------------------------------------------------------------------------------

  nameIcon(name){
    var en = 40;
    var boy = 40;

    if(name === "Şifre"){
      return (<Image style={{width:en, height:boy,borderRadius:25}} source={require('../ayarlaricon/sifre.png')}/>)
    }else if (name === "Yazı Tipi") {
      return (<Image style={{width:en, height:boy, borderRadius:25}} source={require('../ayarlaricon/tip.png')} />)
    }else if (name === "Renk") {
      return(<Image style={{width:en, height:boy,borderRadius:25}} source={require('../ayarlaricon/renk.png')}/>)
    }else if (name === "Yazı Boyutu") {
      return(<Image style={{width:en, height:boy,borderRadius:25}} source={require('../ayarlaricon/boyut.png')}/>)
    }else if (name === "Hatırlatmalar") {
      return(<Image style={{width:en, height:boy,borderRadius:25}} source={require('../ayarlaricon/zil.png')}/>)
    }else {
      return(<Image style={{width:en, height:boy,borderRadius:25}} source={require('../ayarlaricon/pdf.png')}/>)
    }
  }

//------------------------------------------------------------------------------------------------------------
gonder = (name) => {
  if (name === "Şifre") {
    this.props.navigation.navigate("Sifre");
  }else if (name === "Yazı Tipi") {
    this.props.navigation.navigate("YaziTipi");
  }
  else if (name === "Yazı Boyutu") {
    this.props.navigation.navigate("YaziBoyutu");
  }else if (name === "Renk") {
    this.props.navigation.navigate("Renk");
  }

}



//------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------------


  render(){
    console.log("render");
    return(

      <View style={{backgroundColor:'#eddada', flex:1}}>

        <View style={{backgroundColor:'#eddada'}}>

          {this.state.list.map((deger,key) =>{

            return(
              <View key = {key}>
              <TouchableOpacity onPress={this.gonder.bind(this, deger)}>
              <View style={{marginTop:10, height:50,borderStyle:'solid', borderBottomColor:'black',borderBottomWidth: 1}}>

                  <View style={{flex:1, flexDirection:'row', height:60,alignItems:'center', justifyContent:'center'}}>

                      <View style={{flex:1}}>
                        {this.nameIcon(deger)}
                      </View>

                      <View style={{flex:5}}>

                        <Text style={{fontFamily:this.state.tip, fontSize:this.state.boyut}}> {deger} </Text>

                      </View>
                  </View>

              </View>
              </TouchableOpacity>
              </View>
            );


          })}



        </View>

      </View>


    );
  }
}//class
export default withNavigation(Ayarlar);
