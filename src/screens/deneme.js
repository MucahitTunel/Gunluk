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


    componentWillUnmount(){
      const {db} = this.state;

      db.close()
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
            tx.executeSql('SELECT * FROM gunlukAdi',[], (tx, results) => {
                var len = results.rows.length;
                console.log("Uzunluk: "+len);
                if(len > 0){
                  var row = results.rows.item(0);
                }
              });
            Alert.alert('Success')
            db.close();
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


          <View style={styles.Head}>

            <Animated.Text style={{ backgroundColor: 'transparent',fontSize:30, color:'red',opacity}}>
                Günlük Adı
            </Animated.Text>

          </View>


          <View style={styles.Content}>

            <Animated.Image
              style={{
                width: 300,
                height: 300,
                transform: [{scale: opacity}] }}
                source={{uri: 'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'}}>

            </Animated.Image>
          </View>

          <View style={styles.Input}>

          <TextInput
            placeholder="  İsim"
            style={{width:300,borderColor:'yellow',backgroundColor:"gray", borderRadius:25,fontSize:16, color:'black'}}
            onChangeText={this.handleChangeGunlukAdi}
            onBlur={this.yukle}
            />

          </View>

          <View style={styles.Buton}>

          <TouchableOpacity
            style={{width:300,height:50,alignItems:'center',justifyContent:'center', backgroundColor:'red', borderRadius:25}}
            onPress={this.kaydet.bind(this)}>
            <Text style={{fontSize:20, alignItems:'center'}}> KAYDET </Text>

          </TouchableOpacity>


          </View>





        </View>

  );
  }
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#dbedcd'
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
