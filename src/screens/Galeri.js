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
  TouchableOpacity
} from 'react-native';

import { Container, Header,Button, Left, Body, Right, Icon, Title, Content, Item, Input, Form, Textarea, Tab, Tabs, TabHeading} from 'native-base';




class Galeri extends Component <Props>{


  constructor(props){
    super(props);

    console.log("Constructor Galeri");

    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});


    this.state = {

      data: [],
      fotodata:[],
      db,
    };


    db.transaction((tx) => {
      tx.executeSql('SELECT uri FROM gunlugum',[], (tx,results) =>{
        var uriler = '';
        var uzunluk = results.rows.length;

        for(let i = 0 ; i < uzunluk ; i++){
            if(uriler === ""){
              if(results.rows.item(i).uri !== ""){
                uriler = uriler + results.rows.item(i).uri;
              }
            }else {
              if(results.rows.item(i).uri !== ""){
                uriler = uriler + "," + results.rows.item(i).uri;
              }
            }

        }

        sonuc = uriler.split(',');
        var arr = [];

        console.log("uriler:    "+uriler);

        for(let i = 0 ; i < sonuc.length; i++){

            arr.push({
              uri: sonuc[i]
            });
        }

        this.setState({
          fotodata: arr
        })

      });

  })




  }

//----------------------------------------------------------------------------------------------------------

    componentWillUnmount(){
      const {db} = this.state;

      db.close()
    }

//----------------------------------------------------------------------------------------------------------
/*    componentDidMount(){

}*/

//----------------------------------------------------------------------------------------------------------


  renderItem = ({ item }) => {

    return (

      <View style={{margin:15}}>

        <Image style={{width:100, height:100}} source={{uri:item.uri}}>

        </Image>

      </View>

    );
  }

//----------------------------------------------------------------------------------------------------------
  render() {
    return (

      <View style={styles.container}>

        <SafeAreaView  style={{margin:10}}>

          <FlatList
            data={this.state.fotodata}
            renderItem={this.renderItem}
            refreshing={this.state.refreshing}
            numColumns={3}
            extraData={this.state.data}
            keyExtractor={item=>item.uri}
          >

          </FlatList>

      </SafeAreaView>
  </View>


  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eddada',

  },
  head: {
    flex:6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body:{
    flex:2,

  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default Galeri;
