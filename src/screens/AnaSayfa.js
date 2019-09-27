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

import { SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import { Container, Header,Button, Left, Body, Right, Icon, Title, Content, Item, Input, Form, Textarea, Tab, Tabs, TabHeading} from 'native-base';




class AnaSayfa extends Component <Props>{


  constructor(props){
    super(props);




    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});


    this.state = {
      baslik : '',
      yazi : '',
      tarih : '',
      durum : '',
      uri: '',
      data: [],
      fotodata : [],
      refreshing: false,
      emojiler : ['artist','deli','dusunceli','hasta','hayalkirikligi','kederli','kendinibegenmis','parti','sasirmis','sinirli','soguk','supheli','telasli','uykulu','uyusuk','zengin'],
      db,
      search: '',
    };

    this.handleChangeSearch = this.handleChangeSearch.bind(this);

  }

//----------------------------------------------------------------------------------------------------------

    componentDidUpdate(){
      const {db} = this.state;


    }

//----------------------------------------------------------------------------------------------------------
    componentDidMount(){

      const {db} = this.state;

      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM gunlugum',[], (tx,results) =>{
          var degerler = [];
          var uzunluk = results.rows.length;

          for(let i = 0 ; i < uzunluk ; i++){
              degerler.push(results.rows.item(i))
          }

          this.setState({
            data : degerler
          })
          console.log(this.state.data);

        });

    })
  }

//----------------------------------------------------------------------------------------------------------

  renderFoto = ({ item }) => {

    return (

      <View style={{margin:10}}>

        <Image
        style={{width:50, height:50, borderRadius:25}}
        source={{uri:item.uri}}>
        </Image>

      </View>
    );
  }

//----------------------------------------------------------------------------------------------------------

modElement(a){


  if (a === "artist") {
    return <Image style={{width:30, height:30}} source={require('../emojis/artist.png')}/>;
  }else if (a === "deli") {
    return <Image style={{width:30, height:30}} source={require('../emojis/deli.png')}/>;
  }else if (a === "dusunceli") {
    return <Image style={{width:30, height:30}} source={require('../emojis/dusunceli.png')}/>;
  }else if (a === "hasta") {
    return <Image style={{width:30, height:30}} source={require('../emojis/hasta.png')}/>;
  }else if (a === "hayalkirikligi") {
    return <Image style={{width:30, height:30}} source={require('../emojis/hayalkirikligi.png')}/>;
  }else if (a === "kederli") {
    return <Image style={{width:30, height:30}} source={require('../emojis/kederli.png')}/>;
  }else if (a === "kendinibegenmis") {
    return <Image style={{width:30, height:30}} source={require('../emojis/kendinibegenmis.png')}/>;
  }else if (a === "mutlu") {
    return <Image style={{width:30, height:30}} source={require('../emojis/mutlu.png')}/>;
  }else if (a === "parti") {
    return <Image style={{width:30, height:30}} source={require('../emojis/parti.png')}/>;
  }else if (a === "sasirmis") {
    return <Image style={{width:30, height:30}} source={require('../emojis/sasirmis.png')}/>;
  }else if (a === "sinirli") {
    return <Image style={{width:30, height:30}} source={require('../emojis/sinirli.png')}/>;
  }else if (a === "sicak") {
    return <Image style={{width:30, height:30}} source={require('../emojis/sicak.png')}/>;
  }else if (a === "soguk") {
    return <Image style={{width:30, height:30}} source={require('../emojis/soguk.png')}/>;
  }else if (a === "supheli") {
    return <Image style={{width:30, height:30}} source={require('../emojis/supheli.png')}/>;
  }else if (a === "telasli") {
    return <Image style={{width:30, height:30}} source={require('../emojis/telasli.png')}/>;
  }else if (a === "uykulu") {
    return <Image style={{width:30, height:30}} source={require('../emojis/uykulu.png')}/>;
  }else if (a === "uyusuk") {
    return <Image style={{width:30, height:30}} source={require('../emojis/uyusuk.png')}/>;
  }else if (a === "zengin") {
    return <Image style={{width:30, height:30}} source={require('../emojis/zengin.png')}/>;
  }else {
    return <Image style={{width:30, height:30}} source={require('../emojis/deli.png')}/>;
  }
}



//----------------------------------------------------------------------------------------------------------

  renderItem = ({ item }) => {
    console.log("item data =======>"+item.uri);

    var degerler = item.uri;

    sonuc = degerler.split(',');
    var arr = [];

    for(let i = 0 ; i < sonuc.length; i++){

        arr.push({
          uri: sonuc[i]
        });
    }

    this.setState({
      fotodata: arr
    })


    return (

      <View>

            <TouchableOpacity

            style={{height:250, margin:20, flex:1, backgroundColor:'white', borderRadius:30}}
            onPress = {() => this.props.navigation.navigate('Sayfa', {tarih:item.tarih, baslik:item.baslik, yazi:item.yazi, durum:item.durum, uri: item.uri, data: this.state.data})}

            >


              <View style={{borderRadius:10, flex:1, marginTop:5, justifyContent:'center', borderStyle:'solid', borderBottomColor:'black',borderBottomWidth: 2, flexDirection:'row'}}>

                <View style={{alignItems:'flex-start', justifyContent:'center',marginLeft:20, flex:2}}>

                  {this.modElement(item.durum)}

                </View>

                <View style={{marginRight:10, alignItems:'center',alignItems:'flex-end',marginRight:20,marginTop:10,flex:2}}>
                  <Text style={{fontSize:15, color:'purple'}}>{item.tarih}</Text>
                </View>

              </View>

              <View style={{flex:4,marginTop:5, borderRadius:10,borderBottomColor:'black',borderBottomWidth: 2}}>

                <View style={{alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:15, color:'purple'}}>{item.baslik}</Text>
                </View>


                <View style={{marginLeft:10}}>
                <Text numberOfLines={4}>{item.yazi}</Text>
                </View>

              </View>



            <SafeAreaView  style={{margin:10, flex:1, justifyContent:'center'}}>

              <FlatList
                data={arr}
                renderItem={this.renderFoto}
                numColumns= {3}
                refreshing={this.state.refreshing}
                extraData={this.state.fotodata}
                keyExtractor={item=>item.uri}
              >

              </FlatList>

            </SafeAreaView>





            </TouchableOpacity>



      </View>
    );
  }

//----------------------------------------------------------------------------------------------------------

handleChangeSearch(a){

  const {db} = this.state;



  this.setState({
    search : a,
    refreshing: true,
  });

  console.log(this.state.search);


  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM gunlugum WHERE baslik LIKE ? and yazi LIKE ?",['%'+this.state.search+'%','%'+this.state.search+'%'], (tx,results) =>{
      console.log("sonuc :    "  +results);
      var veriler = [];
      var uzunluk = results.rows.length;

      for(let i = 0 ; i < uzunluk ; i++){
          veriler.push(results.rows.item(i))
      }

      this.setState({
        data : veriler
      })
      console.log(this.state.data);

    });

  })
}

//----------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------
  render() {

    const { search } = this.state;


    return (

      <View style={styles.container}>

        <View style={{marginTop:10, marginLeft:25, marginRight:25, backgroundColor:'#eddada'}}>

          <SearchBar
            placeholder="Ara"
            onChangeText={this.handleChangeSearch}
            style={{height:5}}
            value={search}
            containerStyle={{backgroundColor:'#eddada', height:40, alignItems:'center', justifyContent:'center'}}
            inputStyle={{backgroundColor:'#d9d2d1', color:'black'}}
            inputContainerStyle={{backgroundColor:'#d9d2d1', height:30}}

          />

        </View>


        <ScrollView style={{margin:10}}>

          <SafeAreaView>

            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              refreshing={this.state.refreshing}
              extraData={this.state.data}
              keyExtractor={item=>item.uri}
            >

            </FlatList>

          </SafeAreaView>

        </ScrollView>

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

export default withNavigation(AnaSayfa);
