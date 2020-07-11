import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, TextInput, Alert,ToastAndroid,} from 'react-native';
import { Container, Header, Content, Tab, Tabs,Button, Left, Body, Right, Icon, Title, Item, Input, Form, Textarea, TabHeading } from 'native-base';


class Sifre extends Component<Props>{



  constructor(props){
    super(props);


    var SQLite = require('react-native-sqlite-storage');
    var db = SQLite.openDatabase({name: 'gunluk.db', createFromLocation: 1},this.okCallback,this.errorCallback);

    this.state = {
      kontrol : "0",
      deger : 0,
      sifre : "",
      sifreTekrar : "",
      soru : "",
      cevap : "",
      db,

    }


    this.handleChangeSifre = this.handleChangeSifre.bind(this);
    this.handleChangeSifreTekrar = this.handleChangeSifreTekrar.bind(this);
    this.handleChangeSoru = this.handleChangeSoru.bind(this);
    this.handleChangeCevap = this.handleChangeCevap.bind(this);

  }


async sifrekontrol(){
  const {db} = this.state;

  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM sifre',[], (tx, results) => {
          var len = results.rows.length;
          console.log("len ======>>>>" + len);
          if (len > 0) {
            this.setState({
              deger:1
            })
          }
        });
  });
}

//------------------------------------------------------------------------------
componentDidMount(){

  console.log("Component Did Mount");
  this.sifrekontrol();

}


componentWillMount(){
  const {db} = this.state;
  var deger = 0;

/*  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM sifre',[], (tx, results) => {
          var len = results.rows.length;
          console.log("len ======>>>>" + len);
          if (len > 0) {
            this.setState({
              deger : 1,
            })
          }else {

          }
        });
  });*/
}

componentWillUnmount(){
  const {db} = this.state;

  db.close();
}


//-----------------------------------------------------------------------------
kaydet(){
  if (this.state.sifre !== "" && this.state.sifreTekrar !== "") {
    if(this.state.sifre.length > 5){
      if (this.state.sifre === this.state.sifreTekrar) {

        const {db} = this.state;
        console.log("kaydet");
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO sifre(sifre,soru, cevap) VALUES(?,?,?)',[this.state.sifre, this.state.soru,this.state.cevap], (tx, results) => {
              if(results.rowsAffected > 0){
                ToastAndroid.show('Kaydedildi', ToastAndroid.SHORT);
                this.props.navigation.goBack()
              }else {
                ToastAndroid.show('Kaydedildi', ToastAndroid.SHORT);
              }
            });
        });

      }else {
        Alert.alert("Şifrelerinizin aynı olmasına dikkat ediniz!")
      }//3
    }else {
      Alert.alert("Şifreniz en az 6 karakter içermelidir!")
    }
  }else {
    Alert.alert("Şifre boş bırakılamaz!")
  }
}

//-----------------------------------------------------------------------------
  handleChangeCevap(value){

    this.setState({
      cevap : value,
    })

  }
//-----------------------------------------------------------------------------
  handleChangeSoru(value){
    this.setState({
      soru : value,
    })
  }
//-----------------------------------------------------------------------------
  handleChangeSifreTekrar(value){
    this.setState({
      sifreTekrar : value,
    })
  }
//-----------------------------------------------------------------------------
  handleChangeSifre(value){
    this.setState({
      sifre : value,
    })
  }

//-----------------------------------------------------------------------------

  sifreOlustur(){

    return(

      <View>

        <TextInput
          placeholder="Şifre"
          style={{backgroundColor:"white", borderRadius:25,fontSize:15, color:'black', height:45}}
          onChangeText={this.handleChangeSifre}
        />

        <TextInput
          placeholder="Şifre Tekrar"
          style={{backgroundColor:"white", borderRadius:25,fontSize:15, color:'black', height:45, marginTop: 15}}
          onChangeText={this.handleChangeSifreTekrar}
        />



        <View style={{flexDirection:'row', marginTop: 20, justifyContent:'center', flex:1, alignItems:'center'}}>

        <View style={{flex:2, marginRight:5, backgroundColor:'purple', height:50}}>
          <TouchableOpacity style={{borderEndColor:'black', borderRightWidth:1, alignItems:'center'}} onPress={this.kaydet.bind(this)}>
            <View style={{alignItems:'center'}}>

                <Text style={{fontSize:30, color:'white', alignItems:'center'}}> KAYDET </Text>

            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex:2, marginLeft:5, backgroundColor:'purple',height:50}}>
          <TouchableOpacity style={{alignItems:'center'}} onPress={() => this.props.navigation.goBack()}>
            <View style={{alignItems:'center'}}>

                <Text style={{fontSize:30, alignItems:'center', color:'white'}}> ÇIK </Text>

            </View>
          </TouchableOpacity>
        </View>

        </View>

      </View>

    );
  }


  sifreSil = () =>{
    const {db} = this.state;

    db.transaction((tx) => {
      tx.executeSql('DELETE FROM sifre',[], (tx,results) =>{
          console.log(results.rowsAffected);
          if(results.rowsAffected > 0){
            console.log("Silindi");
            this.setState({
              deger : 0,
            })
          }
      });
    })

  }






  render(){

    if(this.state.deger === 0){
      return(

        <Container style={{backgroundColor:'#eddada'}}>

        <Header style={{backgroundColor:"purple",alignItems:'center', justifyContent:'center'}}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Şifre</Title>
          </Body>
          <Right>

              <Image

              style={{height:50, width:50, borderRadius:30}}
              source={require('../../ayarlaricon/sifre.png')}

              />

          </Right>
        </Header>

        <Content>

            <View>
              <TouchableOpacity style={{borderStyle:'solid', borderBottomColor:'black',borderBottomWidth: 1, borderTopWidth:1, justifyContent:'center'}} onPress={ () => this.setState({ kontrol : "1"})}>
                <View style={{margin:10,justifyContent:'center', height:50}} >

                    <Text style={{fontSize:25}}>Şifre Oluştur</Text>

                </View>
              </TouchableOpacity>

              <View style={{margin:10}}>
                {this.state.kontrol === "1" ?
                  this.sifreOlustur()
                  :
                  null
                }
              </View>

            </View>

        </Content>

        </Container>



      );
    }else {

      return(

        <Container style={{backgroundColor:'#eddada'}}>

        <Header style={{backgroundColor:"purple",alignItems:'center', justifyContent:'center'}}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Şifre</Title>
          </Body>
          <Right>

              <Image

              style={{height:50, width:50, borderRadius:30}}
              source={require('../../ayarlaricon/sifre.png')}

              />

          </Right>
        </Header>

        <Content>

          <View>
            <TouchableOpacity style={{borderStyle:'solid', borderBottomColor:'black',borderBottomWidth: 1, borderTopWidth:1, justifyContent:'center'}} onPress={this.sifreSil.bind(this)}>
              <View style={{margin:10,justifyContent:'center', height:50}}>

                  <Text style={{fontSize:25}}>Şifre Sil</Text>

              </View>
            </TouchableOpacity>
          </View>

        </Content>

        </Container>



      );
    }



  }



}





export default Sifre;
