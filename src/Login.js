import React,{Component} from "react";
import { View,StyleSheet,TextInput,ImageBackground,Image,TouchableHighlight,Text,Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Login  extends Component{
  
  constructor(props) {
    super(props);

    this.state = {
      authinfo: '',
      password: '',
      token: null,
     
    };
  }


// handleLogin = () => {


 handleLogin = async () => {

  const { authinfo, password } = this.state;
 
  fetch('https://auction.riolabz.com/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authinfo,
      password,
    }),
  })
    .then(response => response.json())
    .then(async data => {
      // Assuming the API returns a token upon successful login
      const token = data.data.sessionToken;
    // await AsyncStorage.setItem('userToken', token);
    console.log('YOUR RESPONSE IS:', data)

    try{
      await AsyncStorage.setItem('userToken', token);
      // const store = await AsyncStorage.getItem('userToken');

      if (store) {
        // Token is stored, you can perform actions accordingly
        // console.log('Token is stored:', store);
      } else {
        // Token is not stored
        // console.log('Token is not stored');
      }
      }catch(e){
        console.log('YOUR error IS:', e)
      }
      // console.log('YOUR success IS:', storetoken)
      this.setState({ token });
     
      if(data.success == true){
        this.props.navigation.navigate('Drawer');
      
        
      }else{
    
        Alert.alert('Login Failed',data.message, [{ text: 'OK' }]);
        
      }
   
    })
    .catch(error => {
      console.error('Login failed:', error.message);
      // Alert.alert('Login Failed',error.message, [{ text: 'OK' }]);
      this.props.navigation.navigate('NoConnection');
      this.setState({loader: false})
      
    });
};
   
  render(){
    return(

      <View style={styles.container}>
   
       <ImageBackground
       source={require('../img/vechicles.jpeg')}
       style={styles.image_style}>

      <View style={{marginTop:50,height:'55%',width:'100%',justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
      <Image
       source={require('../img/logo_vm.jpeg')}
       style={{height:50,width:50,borderRadius:10}}></Image>
       
       <Text  style ={{marginLeft:5,height:50,width:100,textAlignVertical:'center',fontWeight:'bold',fontSize:16}}>Vechicle Mall</Text>
      </View>

     <View style={{borderRadius:25,backgroundColor:'white',padding:10,height:1000}}>

      <Text style={{fontSize:28,fontWeight:'bold',color:'black',textAlign:'center',marginTop:20}}>You're Welcome</Text>
      <Text style={{fontSize:12,color:'black',textAlign:'center'}}>Enter your Login Details</Text>
      
      <TextInput 
        style ={styles.textinputstyle}
        
        placeholder="Dealer ID/Mobile Number" 
        placeholderTextColor={'black'}
        value={this.state.authinfo}
        onChangeText={text => this.setState({ authinfo: text.trim() })}>
        </TextInput>
        <TextInput 
        style ={styles.textinputstyle}
        placeholderTextColor={'black'}
        value={this.state.password}
        onChangeText={text => this.setState({ password: text.trim() })}
        placeholder="Password"
         secureTextEntry>
       </TextInput>

       <TouchableHighlight 
         onPress={this.handleLogin}
      //  onPress={()=> this.props.navigation.navigate('Drawer')}
       style ={styles.button_style}>
        <Text style ={styles.button_text}>Log In</Text>
       </TouchableHighlight>

       <Text style={{fontSize:12,color:'black',textAlign:'center',marginTop:15,fontWeight:'500'}}>Login with OTP | Forgot Password?</Text>
       <View style={{flexDirection:'row',verticalAlign:'center',marginTop:15}}>
       <View style={{height:0.55,backgroundColor:'gray',flex:1,marginLeft:100,marginTop:8}}></View>
       <Text style={{height:15,flex:0.5,textAlign:'center',fontSize:12,color:'black'}}>Or</Text>
       <Text style={{height:0.55,backgroundColor:'gray',flex:1,marginRight:100,marginTop:8}}></Text>
       </View>
       
       <TouchableHighlight
       style ={styles.button_style_register}>
      <Text style ={styles.button_text_register}>Register</Text>
       </TouchableHighlight>
       </View>
       </ImageBackground> 
      </View>
    ) }}
const styles = StyleSheet.create({
container :{
    height : '100%',
    width : '100%' ,
    flexDirection:'column',
  
  }, img_container :{
    height : '100%',
    width : '100%',
      
  }, image_style:{
    height: 350,
    width :'100%',
  },
   textinputstyle:{
    height: 50,
    borderRadius :10,
    borderWidth:0.5,
    padding:8,
    borderColor:'gray',
    color:'black',
    marginLeft:20,
    marginRight:20,
    marginTop:20
  },
   button_style:{
    height : 50,
    borderRadius :10,
    marginTop :30,
    marginLeft:20,
    marginRight:20,
    backgroundColor:'#FFC300',
    alignItems:'center',
    justifyContent :'center'
  },
  button_style_register:{
    height : 50,
    borderRadius :10,
    marginTop :25,
    marginLeft:20,
    marginRight:20,
    borderRadius :10,
    borderWidth:0.5,
    borderColor:'gray',
    alignItems:'center',
    justifyContent :'center'
  },
  button_text_register:{
    color:'black',
    fontWeight:'bold'
  },
   button_text:{
    color:'white'
  } })