import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import AndroidTextToSpeech from 'react-native-tts';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      konu: 'Cumhurbaşkanı Erdoğanın, BM Genel Kurulunda; BMnin adaletsiz yapısı, Arakanlılar, Mısır darbesi, Filistin sorunu-İsrailin uyguladığı vahşet, Keşmir, nükleer silahlar, Cemal Kaşıkçı cinayeti gibi konularda sözünü esirgemeden, dünyaya haykırdığı konuşması dünya kamuoyunda büyük coşku uyandırdı. Pakistanlı bir politikacı da coşkusunu Twitterdan; liderlik bir ünvan değildir, ne lider ama mesajıyla ifade etti.',
    };







  };


  componentDidUpdate(){
    AndroidTextToSpeech.stop();
  }


  oku(){
    AndroidTextToSpeech.setDefaultPitch(1.6);
    AndroidTextToSpeech.setDefaultRate(0.7);
    AndroidTextToSpeech.setDucking(true);
    AndroidTextToSpeech.setDefaultLanguage('tr-TR');
    AndroidTextToSpeech.speak(this.state.konu);
  }




  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={{width:100, height:80}} onPress={this.oku.bind(this)}>

          <Text>Tıkla</Text>

        </TouchableOpacity>


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
