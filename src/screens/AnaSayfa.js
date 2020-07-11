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
  AsyncStorage,

} from 'react-native';

import { SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import { Container, Header,Button, Left, Body, Right, Icon, Title, Content, Item, Input, Form, Textarea, Tab, Tabs, TabHeading} from 'native-base';




class AnaSayfa extends Component <Props>{


  constructor(props){
    super(props);

    console.log("Constuctor Ana Sayfa");

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
      a : 0,
      tekrar:false,
      boyut:10,
      tip:"roboto",
    };

    this.handleChangeSearch = this.handleChangeSearch.bind(this);

  }

//----------------------------------------------------------------------------------------------------------

    componentDidUpdate(){
      const {db} = this.state;

    }



//----------------------------------------------------------------------------------------------------------
veritabani(){
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
      console.log("Data: " + this.state.data);

    });
  })

  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM yazi',[], (tx,results) =>{
      var boyut;
      var tip;

      boyut = results.rows.item(0).size;
      tip = results.rows.item(0).tip;

      this.setState({
        boyut: boyut,
        tip:tip,
      })
      console.log(this.state.data);

    });
  })





}


//----------------------------------------------------------------------------------------------------------

componentDidMount(){

  this.veritabani();
  console.log("anasayfa");
  this.didFocusListener = this.props.navigation.addListener(
    'didFocus',
    () => { this.veritabani() },
  );

  this.didFocusListener = this.props.navigation.addListener(
    'didBlur',
    () => { console.log("didblur"); },
  );

}

//----------------------------------------------------------------------------------------------------------

  renderFoto = ({ item }) => {

    return (

      <View style={{margin:7}}>

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

refresh = () => {

  this.veritabani();
}



//----------------------------------------------------------------------------------------------------------

  renderItem = ({ item }) => {

    var degerler = item.uri;
    console.log("anasayfa item data =======>"+item.uri);


//1 tane değer varsa
    var arr = [];
    var kontrol = 0;

    if(degerler === null){
      degerler = "";
      console.log("nullllllllllllllllllll");
      deger = this.state.a;

    }else {

      for(var i = 0;i < degerler.length;i++){
        if(degerler[i] === ","){
          kontrol = 1;
          break;
        }else {
          kontrol = 0;
        }
      }

      if(degerler !== ""){
        if(kontrol === 1){
          console.log("burdyım");
          sonuc = degerler.split(',');

          for(let i = 0 ; i < sonuc.length; i++){

              deger = this.state.a;


              arr.push({
                uri: sonuc[i],
                id : deger,
              });

              deger = this.state.a + 1;
          }

        }//if
        else {
          deger = this.state.a;
          arr.push({
            uri: degerler,
            id : deger,
          });

        }//else
      }else {
        deger = this.state.a;

      }

    }


    return (

      <View>

            <TouchableOpacity

            style={{height:250, margin:20, flex:1, backgroundColor:'white', borderRadius:30}}
            onPress = {() => this.props.navigation.navigate('Sayfa', {tarih:item.tarih, baslik:item.baslik, yazi:item.yazi, durum:item.durum, uri: item.uri, data: this.state.data, id:item.id, onGoBack:this.refresh})}

            >


              <View style={{borderRadius:10, flex:1, marginTop:5, justifyContent:'center', borderStyle:'solid', borderBottomColor:'black',borderBottomWidth: 2, flexDirection:'row'}}>

                <View style={{alignItems:'flex-start', justifyContent:'center',marginLeft:20, flex:2}}>

                  {this.modElement(item.durum)}

                </View>

                <View style={{marginRight:10, alignItems:'center',alignItems:'flex-end',marginRight:20,marginTop:10,flex:3}}>
                  <Text style={{fontSize:this.state.boyut, fontFamily:this.state.tip}}>{item.tarih}</Text>
                </View>

              </View>

              <View style={{flex:4,marginTop:5, borderRadius:10,borderBottomColor:'black',borderBottomWidth: 2}}>

                <View style={{alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:this.state.boyut, color:'purple', fontFamily:this.state.tip}}>{item.baslik}</Text>
                </View>


                <View style={{marginLeft:10}}>
                <Text numberOfLines={4} style={{fontSize:this.state.boyut, fontFamily:this.state.tip}}>{item.yazi}</Text>
                </View>

              </View>



            <SafeAreaView  style={{margin:10, flex:1, justifyContent:'center'}}>

              { degerler !== ""  ?

              <FlatList
                data={arr}
                renderItem={this.renderFoto}
                numColumns= {5}
                refreshing={this.state.refreshing}
                extraData={[arr,this.state.boyut]}
                keyExtractor={item=>item.id.toString()}
              >

              </FlatList>

              :

              null
            }

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
    tx.executeSql("SELECT * FROM gunlugum WHERE baslik LIKE ?",['%'+this.state.search+'%'], (tx,results) =>{
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
              keyExtractor={item=>item.id.toString()}
            >

            </FlatList>

          </SafeAreaView>

        </ScrollView>

        <StatusBar hidden={true}/>
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
