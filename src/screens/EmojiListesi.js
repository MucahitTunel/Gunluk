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






class Sayfa extends Component <Props>{


  constructor(props){
    super(props);

    const {navigation} = this.props;




    this.state = {


        data : ['artist','deli','dusunceli','hasta','hayalkirikligi','kederli','kendinibegenmis','parti','sasirmis','sinirli','soguk','supheli','telasli','uykulu','uyusuk','zengin'],
        checked:0,

    };

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

            {this.state.data.map((data, key) =>{

              return(
                <View style={{margin:10,borderStyle:'solid', borderBottomColor:'black',borderBottomWidth: 2, justifyContent:'center'}}>

                  {this.state.checked == key ?
                    <View style={{justifyContent:'center', marginBottom:5}}>
                      <TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <View style={{alignItems:'flex-start', justifyContent:'center', flex:1}}>
                              {this.modElement(data)}
                            </View>


                            <View style={{flex:3,flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

                              <View style={{flex:2}}>
                                <Text>{data}</Text>
                              </View>

                              <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                                <Image style={{width:20, height:20, borderRadius:20}} source={require('../radiobuton/noktali.png')}/>
                              </View>

                            </View>
                        </View>
                      </TouchableOpacity>
                      </View>

                    :

                    <View style={{justifyContent:'center', marginBottom:5}}>
                    <TouchableOpacity onPress={() => this.setState({checked:key})}>

                      <View style={{flexDirection:'row'}}>

                          <View style={{alignItems:'flex-start', justifyContent:'center', flex:1}}>
                            {this.modElement(data)}
                          </View>

                          <View style={{flex:3, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

                            <View style={{flex:2}}>
                              <Text>{data}</Text>
                            </View>

                            <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                              <Image style={{width:20, height:20, borderRadius:20}} source={require('../radiobuton/dolu.png')}/>
                            </View>

                          </View>

                      </View>

                    </TouchableOpacity>
                    </View>
                  }

                  </View>
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

export default Sayfa;