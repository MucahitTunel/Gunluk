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
  TextInput,
  Animated,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';





  class App extends Component<Props>{



    constructor(props){
    super(props);
    this.animated = new Animated.Value(0);

    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});


    this.state = {
      db,
      gunlukAdi : "",
    };

    this.handleChangeGunlukAdi = this.handleChangeGunlukAdi.bind(this);

  }


    componentDidMount(){
      this.yukle();
    }



    handleChangeGunlukAdi(a){
      this.setState({
        gunlukAdi : a,
      });
      console.log(this.state.gunlukAdi);
    }

    yukle(){
      Animated.timing(this.animated,{
        toValue: 1,
        duration: 2000,
      }).start();
    }


    kaydet(){
      const {db} = this.state;
      const {gunlukAdi} = this.state;


      console.log(gunlukAdi);

      //db.executeSql('INSERT INTO gunlukAdi(isim) VALUES(?)', [this.state.gunlukAdi]);
      db.transaction((tx) => {
        console.log('transaction işlemi');
        tx.executeSql('INSERT INTO gunlukAdi(isim) VALUES(?)',
        [gunlukAdi],
        (tx,results) => {
          if(results.rowsAffected > 0){
            console.log(results);
            tx.executeSql('UPDATE baslangic SET deger = ?',[0], (tx, results) => {
                if(results.rowsAffected > 0){
                  this.props.navigation.navigate("Tabs");
                }
            });

          }
          else {
            Alert.alert('Unsuccesfull')
          }
        });
      })

    }



    render(){
      const opacity= this.animated.interpolate({
        inputRange:[0,1],
        outputRange:[0,1]
      });

      const spin = this.animated.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })

      return (

        <View style={styles.container}>
          <StatusBar hidden={true}/>

          <View style={styles.Head}>

            <Animated.Text style={{ backgroundColor: 'transparent',fontSize:40,opacity}}>
                Günlük Adı
            </Animated.Text>

          </View>


          <View style={styles.Content}>

            <Animated.Image
              style={{
                width: 300,
                height: 300,
                borderRadius:25,
                transform: [{scale: opacity}] }}
                source={require('../pages/diary1.png')}>

            </Animated.Image>
          </View>

          <View style={styles.Input}>

          <TextInput
            placeholder="  Günlük Adı"
            style={{width:300,borderColor:'yellow',backgroundColor:"white", borderRadius:25,fontSize:16, color:'black'}}
            onChangeText={this.handleChangeGunlukAdi}
            />
          </View>

          <View style={styles.Buton}>

          <TouchableOpacity
            style={{width:300,height:50,alignItems:'center',justifyContent:'center', backgroundColor:'lightblue', borderRadius:25}}
            onPress={this.kaydet.bind(this)}>
            <Text style={{fontSize:20, alignItems:'center', color:'red'}}> KAYDET </Text>

          </TouchableOpacity>


          </View>





        </View>

  );
  }
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#4fbdee'
  },
  Content:{
    flex: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  Head:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Input:{
    flex:1,
    alignItems: 'center',
  },
  Buton:{
    flex:3,
    alignItems: 'center',
  }

});

export default App;
