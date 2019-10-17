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

      const list = [{name: 'Şifre'},{name: 'Yazı Tipi'},{name:'Yazı Boyutu'},{name:'Renk'},{name:'Hatırlatmalar'},{name:'Dil'},{name:'Pdf Şeklinde Dışa Ver'}]

      this.state = {
        list : list,
      }
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
    }else if (name === "Dil") {
      return(<Image style={{width:en, height:boy,borderRadius:25}} source={require('../ayarlaricon/dil.png')}/>)
    }else {
      return(<Image style={{width:en, height:boy,borderRadius:25}} source={require('../ayarlaricon/pdf.png')}/>)
    }
  }

//------------------------------------------------------------------------------------------------------------
gonder = (name) => {
  if (name === "Şifre") {
    this.props.navigation.navigate("Sifre");
  }
}



//------------------------------------------------------------------------------------------------------------
//format-letter-case

  renderItem = ({ item }) => {

    return(
      <TouchableOpacity onPress={this.gonder.bind(this, item.name)}>
        <View style={{flex:1, flexDirection:'row', height:60, alignItems:'center', justifyContent:'center',borderStyle:'solid', borderBottomColor:'black',borderBottomWidth: 1}}>


            <View style={{flex:1}}>
              {this.nameIcon(item.name)}
            </View>

            <View style={{flex:5}}>

              <Text style={{fontFamily:"Menlo-Italic"}}> {item.name} </Text>

            </View>


        </View>
        </TouchableOpacity>
    )

  }


//------------------------------------------------------------------------------------------------------------


  render(){

    return(

      <View style={{backgroundColor:'#eddada', flex:1}}>

        <View style={{backgroundColor:'#eddada'}}>

            <SafeAreaView style={{margin:10}}>

              <FlatList
                data={this.state.list}
                renderItem={this.renderItem}
                keyExtractor={item=>item.name}
              >

              </FlatList>

            </SafeAreaView>

        </View>

      </View>


    );
  }
}//class
export default withNavigation(Ayarlar);
