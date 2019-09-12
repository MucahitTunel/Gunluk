import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, FlatList, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class DetailScreen extends Component<Props>{

  constructor(props){
    super(props);


    this.state={
      filePath: {},
      data : [],
      refreshing: false,
      selected: false,
      veriler:[]
    }
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
      //  var veri = this.state.filePath.uri;
      //  var joined = this.state.veriler.concat(veri);

      //  console.log("joined:  " + joined);

        this.setState({
          selected: true,
        })
        console.log("Data:  " + this.state.data.uri);

      }
    });
  };




  renderItem = ({ item }) => {
    console.log("item data =======>"+item.uri);
    return (

        <View>
          <Image
          style={{width:50, height:50, margin: 20}}
          source={{uri:item.uri}}>

          </Image>
        </View>
    );
  }




  render(){

    return(

      <View style={style.container}>



        <View style={{flex:3, backgroundColor:'gray'}}>
          <ScrollView>

            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              refreshing={this.state.refreshing}
              extraData={this.state.data}
              keyExtractor={item=>item.uri}
            >

            </FlatList>

          </ScrollView>
        </View>

        <View style={{backgroundColor:'red', flex:3,alignItems:'center', justifyContent:'center'}}>
          <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
        </View>


      </View>
    );
  }
}

export default DetailScreen;


const style = StyleSheet.create({
  container:{
      flex: 1,
      flexDirection: 'column',
  },
  nevbarText:{
    color: '#e5998a',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 17,

  },
  nevbarFlex:{
    flex:1,
    backgroundColor:'#947d78',

  },
  bodyImage:{
    flex: 3,
    backgroundColor:'#ffffff',
    marginBottom: 15,

  },
  bodyText:{
    flex: 4,
    marginLeft: 10,
  },
  bodyClass:{
    backgroundColor:'#e6d9d7',
    margin:20,
  },
  urunText:{
    fontSize:20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginTop: 10,
    color: '#e5998a',
  }

});
