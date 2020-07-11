import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, TextInput, Alert,ToastAndroid,SafeAreaView, FlatList} from 'react-native';
import { Container, Header, Content, Tab, Tabs,Button, Left, Body, Right, Icon, Title, Item, Input, Form, Textarea, TabHeading } from 'native-base';


class Pdf extends Component<Props>{



  constructor(props){
    super(props);

    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});
  }


  render(){
    return(
        <View>
          <Text>Merhaba</Text>
        </View>
    );
  }

}

export default Pdf;
