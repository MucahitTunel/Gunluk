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
  AsyncStorage,
  ToastAndroid,
  BackHandler,
  DatePickerAndroid,
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

  class GunlukEkle extends Component<Props>{

    constructor(props){
    super(props)

    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});

    this.state = {

      baslik: "",
      tarih:'',
      gunluk:'',
      selected: false,
      refreshing: false,
      filePath: {},
      data : [],
      uri:'',
      sira : 0,
      db,
      durum: 'mutlu',
      boyut:15,
      tip:"roboto",
      days : ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],

    };
    this.showDatePicker.bind(this);
    const {navigation} = this.props;

    console.log("tekrardan");

    this.handleChangeBaslik = this.handleChangeBaslik.bind(this);
    this.handleChangeGunluk = this.handleChangeGunluk.bind(this);




  }

  showDatePicker = async (options) => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {


        var intday = new Date(year,month,day).getDay();
        console.log(intday);
        let newState = {};
        newState['tarih'] = this.state.days[intday] + ", " + day + "." + (month+1) + "." + year;

        this.setState(newState);
      }
    } catch ({code, message}) {
      console.warn(`error `, code, message);
    }
};




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
      }
    });//Image picker
  }



  componentDidMount(){

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    const {db} = this.state;

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM yazi',[], (tx,results) =>{
        var boyut;
        var tip;

        boyut = results.rows.item(0).size;
        tip = results.rows.item(0).tip;

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var day = new Date().getDay();
        var tarih = this.state.days[day] + ", " + date + "." + month + "." + year;

        this.setState({
          boyut: boyut,
          tip:tip,
          tarih: tarih,
        })
        console.log(this.state.data);

      });
    })





  }

  handleBackPress = () => {
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
  }




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


  async tarih(){

    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(),

      });

      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        var tarih = day + '.' + (month+1) + '.' + year;
        console.log(tarih);
      //  this.setState({tarih:tarih})
      }

    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }



  kaydet(){

    const {db} = this.state;
    console.log("kaydet");
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO gunlugum(baslik, yazi, tarih, durum,uri) VALUES(?,?,?,?,?)',[this.state.baslik, this.state.gunluk, this.state.tarih, this.state.durum, this.state.uri], (tx, results) => {
          if(results.rowsAffected > 0){
            ToastAndroid.show('Kaydedildi', ToastAndroid.SHORT);
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
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


  async fetchData(){
    var formData = new FormData();
    var url = "http://192.168.1.107:8080/upload/";
    let picturepath = "file://"+this.state.filePath.path;
    let fileName = this.state.filePath.fileName;

    formData.append("Urun_Foto", {uri:picturepath,name:fileName,  type:"image/jpeg"})
    formData.append("Name", "Mücahit")

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers:{
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response);
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

                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Emoji',{onGoBack:this.refresh,sira:this.state.sira });


                }} >
                  <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}}>

                    {this.modElement(this.state.durum)}

                  </View>
                </TouchableOpacity>

                  <View style={{flex:3, alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={() => this.showDatePicker({tarih: this.state.tarih})}>
                      <Text style={{alignItems: 'center', justifyContent:'flex-end', fontSize:this.state.boyut, fontFamily:this.state.tip}}>
                        {this.state.tarih}
                      </Text>
                    </TouchableOpacity>
                  </View>


                </View>

                <View style={{flex:7}}>

                    <TextInput
                      placeholder="Başlık"
                      style={{marginTop:20, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:25,fontSize:this.state.boyut,fontFamily:this.state.tip, color:'black'}}
                      onChangeText={this.handleChangeBaslik}
                      />

                    <Form>
                      <Textarea
                        rowSpan={10}
                        bordered
                        placeholder="Yazınız..."
                        style={{marginTop:10, marginLeft:20, marginRight:20,marginBottom:30, backgroundColor:"white", fontSize:this.state.boyut,fontFamily:this.state.tip, color:"black", borderRadius:25}}
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

                    <Icon
                      name = 'image'
                      style={{fontSize:40}}
                    />

                    </TouchableOpacity>


                    <TouchableOpacity

                      style={{width:100, height:60, marginLeft:50, marginTop:10, backgroundColor:'pink', alignItems:'center', justifyContent:'center'}}
                      onPress={this.fetchData.bind(this)}
                    >
                      <Text>Fetch</Text>

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

export default GunlukEkle;
