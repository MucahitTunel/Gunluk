import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Tts from 'react-native-tts';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  };


  speech(){
    Tts.speak('Hello world');
  }




  render() {
    return (
      <View style={styles.container}>



      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
