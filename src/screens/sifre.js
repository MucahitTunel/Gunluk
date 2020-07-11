import React, {Fragment} from 'react';
import {Component} from 'react';
//import { Tabs, Tab, Icon, Header } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,

} from 'react-native';

  class sifre extends Component<Props>{

    constructor(props){
    super(props)

    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});

    this.state = {
      sifre:'',
      onay : false,
      db,
    };

    this.sifre = this.sifre.bind(this);
  }

  veritabani = () =>{

    const {db} = this.state;
    console.log(this.state.sifre);
    console.log("kontrol");
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM sifre WHERE sifre=?',[this.state.sifre], (tx, results) => {

          if(results.rows.length > 0){
            this.setState({
              onay:true,
              sifre: '',
            })
          }else {
            this.setState({
              sifre: '',
            })
            ToastAndroid.show('ŞİFRE HATALI', ToastAndroid.SHORT);
          }

        });
    });
  }


  sifre(a){
    this.setState({
      sifre : a,
    });
  }


  sayfaTabs(){
    this.props.navigation.navigate("Tabs");
  }


    render(){

      console.log(this.state.sifre);
      if (this.state.onay === true) {
        this.sayfaTabs();
      }


      return (

        <View style={styles.container}>

          <View style={styles.textPanel}>
            <Text style={{fontSize:42, fontWeight:'bold'}}>ŞİFRENİZ</Text>
          </View>

          <View style={styles.inputPanel}>
            <TextInput
              placeholder="Şifre"
              secureTextEntry={true}
              style={{backgroundColor:"white",width:250, height:60,}}
              onChangeText={this.sifre}
              />


              <TouchableOpacity
                onPress={this.veritabani}
                style={{width:120, height:60, backgroundColor:'red', marginTop:20, alignItems:'center', justifyContent:'center'}}
              >

              <Text style={{fontSize:26}}> TAMAM </Text>

              </TouchableOpacity>

          </View>

        </View>

  );
  }
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#4fbdee'
  },
  textPanel:{
    alignItems:'center',
    justifyContent:'center',
    flex:2,
  },
  inputPanel:{
    alignItems:'center',
    flex:4,
  },

});

export default  sifre;
