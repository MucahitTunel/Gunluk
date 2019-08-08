/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
/*
import React, {Fragment} from 'react';
import {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

  var SQLite = require('react-native-sqlite-storage');
  var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});



  class App extends Component<Props>{

    constructor(props){
    super(props)


    this.state = {
      petname : "",
    };

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






    render(){
      return (
    <View>

      <Text>
        {"Hoşgeldin " + this.state.petname}
      </Text>

    </View>
  );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
*/

import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import GunluEkleEkrani from './src/screens/GunlukEkle.js';

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
  Home: {screen: App},
  GunlukEkle: { screen: GunluEkleEkrani},
  },

  {
    initialRouteName: 'GunlukEkle',
    headerMode:'none'
  }

);

export default createAppContainer(AppNavigator);
