
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from './src/Drawer/DrawerContent';
import Login from "./src/Login";
import Register from "./src/Register";
import NoConnection from "./src/NoConnection"
import Profile from "./src/Drawer/Profile";


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen
       options={{headerShown:false }}
       name="Login"
       component={Login}/>

<Stack.Screen
       name="Register"
       component={Register}/>

<Stack.Screen
 options={{headerShown:false }}
       name="NoConnection"
       component={NoConnection}/>
 
       <Stack.Screen
       options={{headerShown:false
      }}
       name="Drawer"
       component={MyDrawer}/>

    </Stack.Navigator>

  )
}

function MyDrawer(){
  return(
    <Drawer.Navigator
    drawerContent={(props) => <DrawerContent{...props}/>}>
      <Drawer.Screen
         options={{headerTitle:''
           }}
         name="Profile"
         component={Profile}
         />

    </Drawer.Navigator>
  )
}

export default function App(){
  
  return(

    
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )
}