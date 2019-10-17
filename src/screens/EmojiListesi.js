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

import {
  Container,
  Header,
  Button,
  Left,
  Body,
  Right,
  Icon,
  Title,
  Content,
  Item,
  Input,
  Form,
  Textarea,
  Tab,
  Tabs,
  TabHeading,
  Radio,
  ListItem
} from 'native-base';

import { withNavigation } from 'react-navigation';






class EmojiListesi extends Component <Props>{


  constructor(props){
    super(props);

    const {navigation} = this.props;

    const sira = navigation.getParam("sira");

    /*const baslik = navigation.getParam("baslik");
    const yazi = navigation.getParam("yazi");
    const tarih = navigation.getParam("tarih");
    const uri = navigation.getParam("uri");
    const veri = navigation.getParam("data");
    const durum = navigation.getParam("durum");
    const sira = navigation.getParam("sira");


    console.log(baslik);
    console.log(yazi);
    console.log(tarih);
    console.log(uri);
    console.log(veri);
    console.log(durum);
    console.log(sira);*/



    this.state = {


        data : ['artist','deli','dusunceli','hasta','hayalkirikligi','kederli','kendinibegenmis','mutlu','parti','sasirmis','sinirli','sicak','soguk','supheli','telasli','uykulu','uyusuk','zengin'],
        checked:sira,

    };

    console.log("checked:  " + this.state.checked);

  }

//----------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------
/*
<View style={{margin:10, flexDirection:'row'}}>
  <TouchableOpacity>

    <View style={{alignItems:'flex-start', justifyContent:'center', flex:1}}>
      {this.modElement(item.durum)}
    </View>


    <View style={{flex:3}}>
      <ListItem selected={true}>

        <Left><Text>{item.durum}</Text></Left>

        <Right>
          <Image style={{width:60, height:60}} source={require('../emojis/deli.png')}/>
        </Right>

      </ListItem>
    </View>

  </TouchableOpacity>
  </View>
  :
  <View style={{margin:10, flexDirection:'row'}}>
  <TouchableOpacity onPress={() => this.setState({checked:key})}>

    <View style={{alignItems:'flex-start', justifyContent:'center', flex:1}}>
      {this.modElement(item.durum)}
    </View>


    <View style={{flex:3}}>
      <ListItem selected={true}>

        <Left><Text>{item.durum}</Text></Left>

        <Right>
          <Image style={{width:60, height:60}} source={require('../emojis/mutlu.png')}/>
        </Right>

      </ListItem>
    </View>

  </TouchableOpacity>
  </View>
*/


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

//----------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------

    renderEmoji = ({ item }) => {

      return(

        <View style={{margin:10, flexDirection:'row'}}>
          <TouchableOpacity>

            <View style={{alignItems:'flex-start', justifyContent:'center', flex:1}}>
              {this.modElement(item.durum)}
            </View>


            <View style={{flex:3}}>
              <ListItem selected={true}>

                <Left><Text>{item.durum}</Text></Left>

                <Right>
                  <Image style={{width:60, height:60}} source={require('../emojis/deli.png')}/>
                </Right>

              </ListItem>
            </View>

          </TouchableOpacity>
          </View>


      )
    }

//-----------------------------------------------------------------------------------------------------------
//style={{margin:10,borderStyle:'solid', borderBottomColor:'black',borderBottomWidth: 2, justifyContent:'center'}}
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
            <Title>Modlar</Title>
          </Body>

        </Header>


        <Content style={{flex:1, backgroundColor:'#eddada'}}>

            {this.state.data.map((deger, key) =>{
              console.log(key);
              return(
                <React.Fragment key={key} >
                <View style={{margin:10,borderStyle:'solid', borderBottomColor:'black',borderBottomWidth: 2, justifyContent:'center'}} >
                  <TouchableOpacity onPress={() => {this.props.navigation.state.params.onGoBack(deger);
                    this.props.navigation.goBack();}}>

                  {this.state.checked == key ?
                    <View style={{justifyContent:'center', marginBottom:5}}>

                        <View style={{flexDirection:'row'}}>
                            <View style={{alignItems:'flex-start', justifyContent:'center', flex:1}}>
                              {this.modElement(deger)}
                            </View>


                            <View style={{flex:3,flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

                              <View style={{flex:2}}>
                                <Text>{deger}</Text>
                              </View>

                              <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                                <Image style={{width:20, height:20, borderRadius:20}} source={require('../radiobuton/noktali.png')}/>
                              </View>

                            </View>
                        </View>

                    </View>

                    :

                    <View style={{justifyContent:'center', marginBottom:5}}>


                        <View style={{flexDirection:'row'}}>

                            <View style={{alignItems:'flex-start', justifyContent:'center', flex:1}}>
                              {this.modElement(deger)}
                            </View>

                            <View style={{flex:3, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

                              <View style={{flex:2}}>
                                <Text>{deger}</Text>
                              </View>

                              <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                                <Image style={{width:20, height:20, borderRadius:20}} source={require('../radiobuton/dolu.png')}/>
                              </View>

                            </View>

                        </View>


                    </View>
                  }

                  </TouchableOpacity>
                  </View>
                  </React.Fragment>
              )}

            )}
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

export default EmojiListesi;
