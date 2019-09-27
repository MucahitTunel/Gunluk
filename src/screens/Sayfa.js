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
  TouchableOpacity
} from 'react-native';

import { Container, Header,Button, Left, Body, Right, Icon, Title, Content, Item, Input, Form, Textarea, Tab, Tabs, TabHeading} from 'native-base';
import AndroidTextToSpeech from 'react-native-tts';





class Sayfa extends Component <Props>{


  constructor(props){
    super(props);

    const {navigation} = this.props;
    const baslik = navigation.getParam('baslik');
    const yazi = navigation.getParam('yazi');
    const tarih = navigation.getParam('tarih');
    const durum = navigation.getParam('durum');
    const uri = navigation.getParam('uri');
    const data = navigation.getParam('data');



    console.log(baslik);
    console.log(yazi);
    console.log(tarih);
    console.log(durum);
    console.log(uri);
    console.log(data);

    var degerler = uri;

    sonuc = degerler.split(',');
    var arr = [];

    for(let i = 0 ; i < sonuc.length; i++){

        arr.push({
          uri: sonuc[i]
        });
    }

    this.state = {

        durum : durum,
        baslik: baslik,
        yazi: yazi,
        tarih: tarih,
        uri: uri,
        data:arr,

    };

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

//----------------------------------------------------------------------------------------------------------

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




//--------------------------------------------------------------------------------------------------------
componentDidUpdate(){
  AndroidTextToSpeech.stop();
}



//--------------------------------------------------------------------------------------------------------
oku(){
  AndroidTextToSpeech.setDefaultPitch(1.6);
  AndroidTextToSpeech.setDefaultRate(0.7);
  AndroidTextToSpeech.setDucking(true);
  AndroidTextToSpeech.setDefaultLanguage('tr-TR');
  AndroidTextToSpeech.speak(this.state.yazi, 'ADD');
}

//----------------------------------------------------------------------------------------------------------
  render() {

    const heightust = Dimensions.get('window').height;
    const widthust = Dimensions.get('window').width;

    return (

      <Container>

        <Header style={{backgroundColor:"purple",alignItems:'center'}}>

          <Left>
            <Button transparent>
                <Icon name='arrow-back' />
            </Button>
          </Left>

          <Body>
            <Title>Header</Title>
          </Body>

          <Right>

            <TouchableOpacity onPress={this.oku.bind(this)}>
              <Icon style={{color:'white',marginRight:20, fontSize:30}} name='md-headset' />
            </TouchableOpacity>

            <TouchableOpacity onPress={'Sayfa',{durum: this.state.durum, baslik: this.state.baslik, yazi:this.state.yazi, tarih: this.state.tarih, uri: this.state.uri, data:this.state.data}}>
              <Icon style={{color:'white', fontSize:30}} name='md-create' />
            </TouchableOpacity>

          </Right>

        </Header>


        <Content style={{flex:1, backgroundColor:'#eddada'}}>


        <View style={{flex:1, margin:10}}>

          <View style={{flex:1, flexDirection:'row'}}>

            <View style={{alignItems:'flex-start', justifyContent:'center', flex:1}}>

                {this.modElement(this.state.durum)}

            </View>


            <View style={{flex:5}}>

              <View style={{alignItems:'flex-end', justifyContent:'center', marginTop:10}}>

                <Text style={{fontSize:16}}>{this.state.tarih}</Text>

              </View>



            </View>

          </View>



          <View style={{flex:5, marginTop:10}}>

            <View style={{alignItems:'center'}}>
              <Text style={{color:'purple'}}>{this.state.baslik}</Text>
            </View>

            <View style={{marginTop:10}}>

              <Text style={{fontSize:12}}>{this.state.yazi}</Text>

            </View>

          </View>

          <SafeAreaView  style={{margin:10, flex:2, justifyContent:'center'}}>

            <FlatList
              data={this.state.data}
              renderItem={this.renderFoto}
              numColumns= {3}
              extraData={this.state.data}
              keyExtractor={item=>item.uri}
            >

            </FlatList>

          </SafeAreaView>



        </View>

        </Content>



      </Container>


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

export default Sayfa;
