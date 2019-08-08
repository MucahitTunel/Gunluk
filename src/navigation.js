import { createStackNavigator, createAppContainer } from "react-navigation";
import AnasayfaEkrani from './src/screens/AnaSayfa.js';
import GunlukEkleEkrani from './src/screens/GunlukEkle.js';

const AppNavigator = createStackNavigator(
  {
    Anasayfa: {screen: AnasayfaEkrani},
    GunlukEkle: {screen: GunlukEkleEkrani},
  },
  {
    initialRouteName: 'GunlukEkleEkrani',
    headerMode:'none'
  }
);

export default createAppContainer(AppNavigator);
