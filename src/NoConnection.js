import React ,{Component} from "react";
import { View,StyleSheet,TextInput,ImageBackground,Image,TouchableHighlight,Text } from "react-native";

export default class NoConnection extends Component{
    render(){
        return(
    
          <View style={styles.container}>
           <Image
           source={require('../img/logo_vm.jpeg')}
           style={{height:50,width:50,borderRadius:10}}></Image>
           <Text style={{fontSize:28,fontWeight:'bold',color:'black',textAlign:'center',marginTop:20}}>Oops !</Text>
          <Text style={{fontSize:12,color:'red',textAlign:'center',fontWeight:'500',marginTop:10,marginBottom:10}}>It's seems your're not connected</Text>
          <Text style={{fontSize:12,color:'black',textAlign:'center'}}>Please check your internet </Text>
          <Text style={{fontSize:12,color:'black',textAlign:'center'}}>connection and try again </Text>
          </View>
        ) }}
    const styles = StyleSheet.create({
    container :{
        height : '100%',
        width : '100%' ,
        alignItems:'center',
        justifyContent:'center' ,
        backgroundColor:'white'
      }, button_text:{
        color:'white'
      } })