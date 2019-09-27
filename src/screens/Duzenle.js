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
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';



import { Container, Header,Button, Left, Body, Right, Icon, Title, Content, Item, Input, Form, Textarea} from 'native-base';
const window = Dimensions.get('window');








/*

<TouchableOpacity
  style={{marginTop:10, marginLeft:20, width:100, height:100, alignItems:'center', justifyContent:'center'}}
  onPress={this.chooseFile.bind(this)
>

  <Image
  style={{width:80, height:80, marginLeft: 20, marginRight:20, marginTop:10}}
  source={ require("../pages/artiisareti.png")}>
  />

  <Text style={{marginLeft: 20, marginRight:20, marginTop:5}}>Resim Ekle</Text>
</TouchableOpacity>

*/

  class Duzenle extends Component<Props>{

    constructor(props){
    super(props)

    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});

    const {navigation} = this.props;
    const baslik = navigation.getParam('baslik');
    const yazi = navigation.getParam('yazi');
    const tarih = navigation.getParam('tarih');
    const durum = navigation.getParam('durum');
    const uri = navigation.getParam('uri');
    const data = navigation.getParam('data');
    const id = navigation.getParam('id');



    this.state = {

      baslik: baslik,
      tarih:tarih,
      gunluk:yazi,
      selected: false,
      refreshing: false,
      filePath: {},
      data : data,
      uri:uri,
      db,
      durum: durum,

    };



    this.handleChangeBaslik = this.handleChangeBaslik.bind(this);
    this.handleChangeGunluk = this.handleChangeGunluk.bind(this);




  }


  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        let cevap = this.state.data.concat(response)
        this.setState({
          filePath: source,
          data: cevap,
        });

        let path = "";
        let sonpath = "";


        if(this.state.uri === ""){
          path = this.state.filePath.uri;
          sonpath = this.state.uri.concat(path);
        }
        else {
          path = ","+this.state.filePath.uri;
          sonpath = this.state.uri.concat(path);
        }




      //  var veri = this.state.filePath.uri;
      //  var joined = this.state.veriler.concat(veri);

      //  console.log("joined:  " + joined);

        this.setState({
          selected: true,
          uri : sonpath,
        })
        console.log("SonPath:   " + this.state.uri);
        console.log("Data:  " + this.state.data);

      }
    });
  };

  deleteItem = uri =>{
    const filteredData = this.state.data.filter(item => item.uri !== uri);
    var deger = this.state.uri;
    console.log("deger: "+ deger);
    sonuc = deger.split(',');
    console.log("sonuç:  " + sonuc);

    let sonDeger = '';
    var uzunluk = sonuc.length
    console.log("uzunluk:   " + uzunluk);
    console.log("uri:  " + uri);

    for(var i=0;i<uzunluk;i++){
      if(sonuc[i] !== uri){
        console.log("sonucdegerleri: " + sonuc[i]);
        if(sonDeger===""){
          sonDeger = sonDeger + sonuc[i]
        }else {
          sonDeger = sonDeger + "," + sonuc[i];
        }
      }
    }

    console.log("sondeger: " + sonDeger);
    var urison = sonDeger;
    console.log("urison:    " + urison);

    this.setState({
      data: filteredData,
      uri : urison,
     });

     console.log("uri son hali :    " + this.state.uri);
  }



  renderItem = ({ item }) => {
    console.log("item data =======>"+item.uri);

    return (

        <View style={{width:100, height:130, margin:20, backgroundColor:'red'}}>
          <Image
          style={{width:100, height:100}}
          source={{uri:item.uri}}>
          </Image>

          <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}} onPress={() => this.deleteItem(item.uri) }>

            <Icon
              name='md-trash'
            />

          </TouchableOpacity>


        </View>
    );
  }


  //------------------------------------------------------------------------------------------------------------
  modElement(a){

    const en = 60;
    const boy = 60;

    if (a === "artist") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/artist.png')}/>;
    }else if (a === "deli") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/deli.png')}/>;
    }else if (a === "dusunceli") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/dusunceli.png')}/>;
    }else if (a === "hasta") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/hasta.png')}/>;
    }else if (a === "hayalkirikligi") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/hayalkirikligi.png')}/>;
    }else if (a === "kederli") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/kederli.png')}/>;
    }else if (a === "kendinibegenmis") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/kendinibegenmis.png')}/>;
    }else if (a === "mutlu") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/mutlu.png')}/>;
    }else if (a === "parti") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/parti.png')}/>;
    }else if (a === "sasirmis") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/sasirmis.png')}/>;
    }else if (a === "sinirli") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/sinirli.png')}/>;
    }else if (a === "sicak") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/sicak.png')}/>;
    }else if (a === "soguk") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/soguk.png')}/>;
    }else if (a === "supheli") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/supheli.png')}/>;
    }else if (a === "telasli") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/telasli.png')}/>;
    }else if (a === "uykulu") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/uykulu.png')}/>;
    }else if (a === "uyusuk") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/uyusuk.png')}/>;
    }else if (a === "zengin") {
      return <Image style={{width:en, height:boy}} source={require('../emojis/zengin.png')}/>;
    }else {
      return <Image style={{width:en, height:boy}} source={require('../emojis/deli.png')}/>;
    }


  }
  //-----------------------------------------------------------------------------------------------------


  refresh = (data) => {
    this.setState({
      durum: data
    })
    console.log("burdayım");
    console.log("durum: " + this.state.durum);
  }




  kaydet(){

    const {db} = this.state;
    console.log("kaydet");
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO gunlugum(baslik, yazi, tarih, durum,uri) VALUES(?,?,?,?,?)',[this.state.baslik, this.state.gunluk, this.state.tarih, "mutlu", this.state.uri], (tx, results) => {
          if(results.rowsAffected > 0){
            Alert.alert("Kaydedildi")
          }
        });
    });
  }




  handleChangeBaslik(a){
    this.setState({
      baslik : a,
    });
    console.log(this.state.baslik);
  }


  handleChangeGunluk(a){
    this.setState({
      gunluk: a,
    });
    console.log(this.state.gunluk);
  }


    render(){

      return (

          <Container style={styles.container}>

          <Header style={{backgroundColor:"purple",alignItems:'center', justifyContent:'center'}}>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Yeni</Title>
            </Body>
            <Right>


              <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}} onPress={this.kaydet.bind(this)}>

                <Icon name='md-done-all' style={{fontSize:30, color:'white'}} />

              </TouchableOpacity>


            </Right>
          </Header>


          <Content style={styles.Content}>

              <View style={{margin:10}}>


                <View style={{flexDirection:'row',flex:1, alignItems:'center', justifyContent:'center'}}>

                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Emoji',{onGoBack:this.refresh, });


                }} >
                  <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}}>

                    {this.modElement(this.state.durum)}

                  </View>
                </TouchableOpacity>

                  <View style={{flex:3, alignItems:'flex-end'}}>
                    <Text style={{alignItems: 'center', justifyContent:'flex-end', fontSize:14}}>
                      {this.state.tarih}
                    </Text>
                  </View>


                </View>

                <View style={{flex:7}}>

                    <TextInput
                      placeholder="Başlık"
                      style={{marginTop:20, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:25,fontSize:12, color:'black', height:35}}
                      onChangeText={this.handleChangeBaslik}
                      />

                    <Form>
                      <Textarea
                        rowSpan={10}
                        bordered
                        placeholder="Yazınız..."
                        style={{marginTop:10, marginLeft:20, marginRight:20,marginBottom:30, backgroundColor:"white", fontSize:16, color:"black", borderRadius:25}}
                        onChangeText={this.handleChangeGunluk}/>
                    </Form>

                    <SafeAreaView  style={{margin:10}}>

                      <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        numColumns={3}
                        refreshing={this.state.refreshing}
                        extraData={this.state.data}
                        keyExtractor={item=>item.uri}
                      >

                      </FlatList>

                    </SafeAreaView>

                    <TouchableOpacity

                      style={{width:100, height:60, marginLeft:50, marginTop:10, backgroundColor:'pink', alignItems:'center', justifyContent:'center'}}
                      onPress={this.chooseFile.bind(this)}

                    >

                    <Button
                    style={{width:100, height:60, marginLeft:150, marginTop:10, backgroundColor:'pink', alignItems:'center', justifyContent:'center'}}
                    onPress={this.chooseFile.bind(this)}
                    />

                    <Icon
                      name='image'

                    />


                    </TouchableOpacity>

                </View>

              </View>


          </Content>
      </Container>







  );
  }
};

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  Content:{
    flex: 1,
    backgroundColor:'#eddada',
  }

});

export default Duzenle;
