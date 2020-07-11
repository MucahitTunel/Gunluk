import React from "react";
import { View, Text, StatusBar } from "react-native";
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
import YaziBoyutuEkrani from './src/screens/ayarlar/yaziboyutu.js';
import YaziTipiEkrani from './src/screens/ayarlar/yazitipi.js';
import SifreBaslangicEkrani from './src/screens/sifre.js';
import HatirlatmaEkrani from './src/screens/ayarlar/hatirlatma.js';
import PdfEkrani from './src/screens/ayarlar/pdf.js';

class App extends React.Component {

  constructor(props){
    super(props);

    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name:'gunluk.db', createFromLocation:'~gunluk.db'});




    this.state = {
      sifre:null,
      ilk:null,
      db,
    }
  }

  componentDidMount(){
    const {db} = this.state;
    this.ilkKontrol(db);

  }


  ilkKontrol(db){

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM baslangic',[], (tx,results) =>{
        var sonuc = results.rows.item(0).deger;

        if(sonuc === 1){
          this.setState({
            ilk : sonuc,
          })
        }else {

          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM sifre',[], (tx,results) =>{
              console.log(results.rows.length);
              if(results.rows.length > 0){
                this.setState({
                  sifre:1,
                  ilk:0,
                })
              }else {
                this.setState({
                  sifre:0,
                  ilk:0,
                })
              }
            });
          })
        }
      });
    })
  }


  sayfaTabs(){

    this.props.navigation.navigate("Tabs");
  }

  sayfaSifre(){
    this.props.navigation.navigate("SifreBaslangic");
  }

  sayfaDeneme(){
    this.props.navigation.navigate("Deneme");
  }



  render() {
    console.log("sifre ", this.state.sifre);
    console.log("ilk ", this.state.ilk);

    if(this.state.ilk === 1){
      this.sayfaDeneme();
    }else {
      if(this.state.sifre === 0){
        this.sayfaTabs();
      }else if(this.state.sifre === 1) {
        this.sayfaSifre();
      }
    }




    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <StatusBar hidden={true}/>
        </View>
      );

  }
}




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
    Renk:{screen: RenkEkrani},
    YaziBoyutu:{screen: YaziBoyutuEkrani},
    YaziTipi:{screen: YaziTipiEkrani},
    SifreBaslangic:{screen:SifreBaslangicEkrani},
    Hatirlatma:{screen:HatirlatmaEkrani},
    Pdf:{screen:PdfEkrani},
  },

  {
    initialRouteName: 'Home',
    headerMode:'none'
  }

);

export default createAppContainer(AppNavigator);
