import React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import GunlukEkleEkrani from './src/screens/GunlukEkle.js';
import BaslangicEkrani from './src/screens/Baslangic.js';
import AnasayfaEkrani from './src/screens/AnaSayfa.js';
import DenemeEkrani from './src/screens/deneme.js';
import ResimSecEkrani from './src/screens/resimsec.js';
import ResimGosterEkrani from './src/screens/resimgoster.js';
import OkumaEkrani from './src/screens/TexttoSpeech.js';
import GaleriEkrani from './src/screens/Galeri.js';
import TabsEkrani from './src/screens/Tabs.js';
import SayfaEkrani from './src/screens/Sayfa.js';
import EmojiEkrani from './src/screens/EmojiListesi.js';
import SpeechEkrani from './src/screens/TexttoSpeech.js';
import DuzenleEkrani from './src/screens/Duzenle.js';
import AyarlarEkrani from './src/screens/Ayarlar.js';
import SifreEkrani from './src/screens/ayarlar/sifre.js';
import RenkEkrani from './src/screens/ayarlar/renk.js';


var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}


db.transaction((tx) => {
  tx.executeSql('SELECT * FROM baslangic WHERE deger=?',[1], (tx, results) => {
      var len = results.rows.length;
      console.log("Uzunluk: "+len);
    });
});

db.close();


const AppNavigator = createStackNavigator(
  {
  Home: {screen: App},
  GunlukEkle: { screen: GunlukEkleEkrani},
  Baslangic: {screen: BaslangicEkrani},
  AnaSayfa: {screen: AnasayfaEkrani},
  Deneme:{screen: DenemeEkrani},
  ResimSec:{screen: ResimSecEkrani},
  ResimGoster:{screen: ResimGosterEkrani},
  Okuma:{screen: OkumaEkrani},
  Galeri:{screen: GaleriEkrani},
  Tabs:{screen: TabsEkrani},
  Sayfa:{screen: SayfaEkrani},
  Emoji:{screen:EmojiEkrani},
  Speech:{screen:SpeechEkrani},
  Duzenle:{screen:DuzenleEkrani},
  Ayarlar:{screen:AyarlarEkrani},
  Sifre:{screen: SifreEkrani},
  Renk:{screen: RenkEkrani}
  },

  {
    initialRouteName: 'Renk',
    headerMode:'none'
  }

);

export default createAppContainer(AppNavigator);
