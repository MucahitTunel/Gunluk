import React, {Component} from 'react';
import {StyleSheet,View, Text, StatusBar, Switch, TouchableOpacity, ToastAndroid} from 'react-native';
class hatirlatma extends Component<Props>{

  constructor(props){
    super(props);

    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name: 'gunluk.db', createFromLocation: 1});

    this.state={
      switchButon:false,
      minute:'00',
      hours:'22',
      db,
      boyut:13,
      font:'roboto',
      hatirlatmaSonuc: false,
    }

    this.handleHoursPlus = this.handleHoursPlus.bind(this);
    this.handleHoursMinus = this.handleHoursMinus.bind(this);
    this.handleMinutePlus = this.handleMinutePlus.bind(this);
    this.handleMinuteMinus = this.handleMinuteMinus.bind(this);

    this.onSave = this.onSave.bind(this);

  }

  componentDidMount(){

    const {db} = this.state;

    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM yazi",[], (tx,results) =>{
        console.log("sonuc :    "  +results);
         size = results.rows.item(0).size;
         tip = results.rows.item(0).tip;
         console.log("size: " + size);
         console.log(tip);

         this.setState({
           boyut:size,
           font:tip,
         })
      });
    })

    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM hatirlatma",[], (tx,results) =>{
        console.log("sonuc :    "  +results);
         if(results.rows.length > 0){
           var dakika = results.rows.item(0).dakika;
           var saat = results.rows.item(0).saat;

           console.log(saat);
           console.log(dakika);

           this.setState({
             hours:saat,
             minute:dakika,
             hatirlatmaSonuc:true,
             switchButon:true,
           })
         }

      });
    })


  }

  onSave = () =>{

    console.log("SAVE");
    const {db} = this.state;

    if(this.state.switchButon === true && this.state.hatirlatmaSonuc === true){
      db.transaction((tx) => {
        tx.executeSql("UPDATE hatirlatma SET dakika = ?, saat = ?",[this.state.minute, this.state.hours], (tx,results) =>{
          if(results.rowsAffected > 0){
            ToastAndroid.show('Kaydedildi', ToastAndroid.SHORT);
          }else {
            ToastAndroid.show('HATA', ToastAndroid.SHORT);
          }

        });
      })
    }else if (this.state.switchButon === true && this.state.hatirlatmaSonuc === false) {
      db.transaction((tx) => {
        tx.executeSql("INSERT INTO hatirlatma(id,saat,dakika) VALUES (?,?,?)",[1,this.state.hours, this.state.minute], (tx,results) =>{
          if(results.rowsAffected > 0){
            ToastAndroid.show('Kaydedildi', ToastAndroid.SHORT);
            this.setState({
              hatirlatmaSonuc:true,
            })
          }else {
            ToastAndroid.show('HATA', ToastAndroid.SHORT);
          }

        });
      })
    }//else if



    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var saniye = new Date().getSeconds();


    let saatDegeri = parseInt(this.state.hours,10);
    let asd = 16;

  /*  PushNotification.localNotificationSchedule({
      id:"1",
      massage:"Günlük Zamanı",
      repeat: 'day',
      date: new Date(year, month, hours > asd ? date +1 :date, 14),
    });*/

  }//save



  deleteDatabase(){
    const {db} = this.state;

    db.transaction((tx) => {
      tx.executeSql('DELETE FROM hatirlatma',[], (tx,results) =>{
          console.log(results.rowsAffected);
          if(results.rowsAffected > 0){
            console.log("Silindi");
          }
      });
    })
  }




  handleHoursPlus = () =>{
    var saat = this.state.hours;
    saat = parseInt(saat, 10);
    saat = saat + 1;

    if(saat === 24){
      this.setState({
        hours: "00",
      })
    }else if (saat < 10) {
      let deger = "0"+saat.toString();
      this.setState({
        hours: deger,
      })
    }else {
      saat = saat.toString();
      this.setState({
        hours: saat,
      })
    }

  }

  handleMinutePlus = () =>{

    var dakika = this.state.minute;
    dakika = parseInt(dakika, 10);
    dakika = dakika + 1;

    if(dakika === 60){
      this.setState({
        minute: "00",
      })
    }else if (dakika < 10) {
      let deger = "0"+dakika.toString();
      this.setState({
        minute: deger,
      })
    }else {
      dakika = dakika.toString();
      this.setState({
        minute: dakika,
      })
    }



  }

  handleHoursMinus = () =>{
    var saat = this.state.hours;
    saat = parseInt(saat, 10);
    saat = saat - 1;

    if(saat < 0){
      console.log("if");
      this.setState({
        hours: "23",
      })
    }else if (saat < 10) {
      console.log("elseif");
      let deger = "0"+saat.toString();
      console.log(deger);
      this.setState({
        hours: deger,
      })
    }else {
      console.log("else");
      saat = saat.toString();
      this.setState({
        hours: saat,
      })
    }
  }


  handleMinuteMinus = () =>{

    var dakika = this.state.minute;
    dakika = parseInt(dakika, 10);
    dakika = dakika - 1;

    if(dakika < 0){
      this.setState({
        minute: "59",
      })
    }else if (dakika < 10) {
      let deger = "0"+dakika.toString();
      this.setState({
        minute: deger,
      })
    }else {
      dakika = dakika.toString();
      this.setState({
        minute: dakika,
      })
    }

  }

  handleToogleSwitch = () => {
    if(this.state.switchButon === true){
      PushNotification.cancelAllLocalNotifications();
      this.deleteDatabase();
      this.setState({
        hatirlatmaSonuc:false,
      })
    }

    this.setState({
      switchButon: !this.state.switchButon,
    })
  }


  render(){

    if(this.state.switchButon === true){
      return(

        <View style={styles.container}>

          <View style={{margin:20, flexDirection:'row', borderBottomColor:'black', borderBottomWidth:2}}>
            <View>
              <Text style={{fontSize:20, flex:1,fontFamily:this.state.font,fontWeight:'bold'}}>HATIRLATMALAR</Text>
            </View>

            <View style={{alignItems:'flex-end', flex:1}}>
              <Switch
                onValueChange={this.handleToogleSwitch}
                value = {this.state.switchButon}
              />
            </View>
          </View>

          <View style={{margin:20, width:300, height:50}}>
            <Text style={{fontSize:this.state.boyut, color:"red", fontFamily:this.state.font}}>NOT:<Text style={{fontSize:this.state.boyut, color:'black',fontFamily:this.state.font}}> Saati ayarladıktan sonra kaydet tuşuna basmayı unutmayınız.</Text></Text>
          </View>



          <View style={{margin:20, flexDirection:'column', width:200, height:200}}>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={this.handleHoursPlus}>
                  <Text style={{fontSize:30}}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
              </View>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={this.handleMinutePlus}>
                  <Text style={{fontSize:30}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:"#ffffff"}}>
                  <Text style={{fontSize:30}}>{this.state.hours}</Text>
              </View>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:30}}>:</Text>
              </View>
              <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:"#ffffff"}}>
                  <Text style={{fontSize:30}}>{this.state.minute}</Text>
              </View>
            </View>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={this.handleHoursMinus}>
                  <Text style={{fontSize:30}}>-</Text>
                </TouchableOpacity>
              </View>

              <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
              </View>

              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={this.handleMinuteMinus}>
                  <Text style={{fontSize:30}}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>


          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

            <View style={{alignItems:'center', justifyContent:'center', backgroundColor:"lightblue", marginLeft:50}}>
              <TouchableOpacity
                style={{width:130, height:50, alignItems:'center', justifyContent:'center'}}
                onPress={this.onSave}
              >
              <Text style={{fontSize:this.state.boyut, fontFamily:this.state.font}}>KAYDET</Text>
              </TouchableOpacity>
            </View>

          </View>


          <StatusBar hidden={true} />

        </View>

      );
    }else {
      return(

        <View style={styles.container}>

          <View style={{margin:20, flexDirection:'row',fontFamily:this.state.font, borderBottomColor:'black', borderBottomWidth:2}}>
            <View>
              <Text style={{fontSize:20, flex:1, fontWeight:'bold'}}>HATIRLATMALAR</Text>
            </View>

            <View style={{alignItems:'flex-end', flex:1}}>
              <Switch
                onValueChange={this.handleToogleSwitch}
                value = {this.state.switchButon}
              />
            </View>
            <StatusBar hidden={true} />
          </View>

        </View>
      );
    }


  }
}

/*PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "YOUR GCM (OR FCM) SENDER ID",

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  popInitialNotification: true,

  requestPermissions: true
});*/



const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#eddada',
  }
})

export default hatirlatma;
