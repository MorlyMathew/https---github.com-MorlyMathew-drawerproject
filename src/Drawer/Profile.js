import React, {Component} from "react";
import {View, Text, StyleSheet, ActivityIndicator, FlatList,Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Profile extends Component{
    
    constructor(){
        super();
        this.state = {
            loader: false,
            DATA : []
        }
    }



    // async getData(){

    //     // Retrieve the token from AsyncStorage
    //     try{
       
    //         const store = await AsyncStorage.getItem('userToken');
      
    //         if (store) {
    //           // Token is stored, you can perform actions accordingly
    //           console.log('Token is stored page2:', store);
    //         } else {
    //           // Token is not stored
    //           console.log('Token is not stored');
    //         }
    //         }catch(e){
    //           console.log('YOUR error IS:', e)
    //         }
    //     console.log('tokenn' , store)

    //     this.setState({loader: true})
    //     fetch('https://auction.riolabz.com/v1/auction_inventory/get/all/participant?auctionId=654c6e0e4c178569c7bc607f',
    //     {
    //         method: 'GET', // or 'POST' or any other HTTP method
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${store}`,
    //         },
    //       }
    //     )
    //     .then((response) => response.json())
    //     .then((response)=> {


    //         if(response.length>0){
    //             this.setState({DATA: response})
    //         }
    //         this.setState({loader: false})
    //         console.log('YOUR RESPONSE page2 IS:', response)
    //     })
    //     .catch((error) => {
    //         this.setState({loader: false})
    //         // console.log('ERROR IS:',error)
    //     })
    // }
    // componentDidMount(){
    //     this.getData()
        
    // }

 componentDidMount(){
    this.fetchData();
        }
fetchData = async () => {
            try {
              // Retrieve the token from AsyncStorage
              const token = await AsyncStorage.getItem('userToken');
              console.log('Token is stored page2:', token);
        
              if (token) {

                // Token is stored, include it in the fetch request
                const apiUrl = 'https://auction.riolabz.com/v1/auction_inventory/get/all/participant?auctionId=654c6e0e4c178569c7bc607f';
        
                const response = await fetch(apiUrl, {
                  method: 'GET', // or 'POST' or any other HTTP method
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                });
        
                if (response.ok) {
                  // Handle the successful response here
                  const data = await response.json();
                  console.log('Data received:  inventory---------', data.data[1].inventory);
                  console.log('Data received:  highestInventoryBid ----------------------', data.data[1].highestInventoryBid);
                  console.log('Data received:  sizee ----------------------', data.data.length);
                  
                  for(let i=0;i < data.data.length;i++) {
                    console.log('Data received:  Array inventory---------', data.data[i].inventory);
                  }

                  // if ()
                  // this.setState({DATA: response})
                } else {
                  // Handle errors based on the response status
                  console.error('Error fetching data:', response.status);
                }
              } else {
                // Token is not stored, handle accordingly
                console.log('Token is not stored');
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

    render(){
        const renderItem = ({item}) => (
          
           <View style= {styles.itemContainer}>
               <Text style= {styles.itemText}>{item.auctionNo}</Text>
               <Text style= {styles.itemDes}>{item.body}</Text>
           </View> 
           
        )
        return(
            <View style= {styles.container}>
               
               {/* <ActivityIndicator size = {50} color= 'blue' animating= {this.state.loader}/> */}
               
                <Text style= {styles.homeText}
                    onPress= {()=> this.fetchData()}></Text>
                <FlatList style= {{width: '95%'
                }}
                    data= {this.state.DATA}
                    renderItem= {renderItem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee'
    },
    homeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },
    itemContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        elevation: 4,
        marginBottom: 10

    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemDes: {
        fontSize: 14,
        color: '#369',
        fontWeight: 'bold',
        marginTop: 10
    }
})