
import React ,{useContext,useEffect,useState} from 'react';
import {StyleSheet, View,Image, ActivityIndicator, ImageBackground,  YellowBox, StatusBar,TouchableOpacity,FlatList,ScrollView,Modal} from 'react-native';
import {Text,Card} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import firebase from 'firebase';
import {widthToDp,heightToDp} from '../Responsive';
import { Avatar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';





const ViewScreen=({navigation})=>{

    const {state}=useContext(AuthContext);
    const [data, setData]=useState([]);
    const [post, setPost]=useState([]);
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);

    useEffect(()=>{
        YellowBox.ignoreWarnings(['Setting a timer']);
        YellowBox.ignoreWarnings(['VirtualizedLists']);
        YellowBox.ignoreWarnings(['useNativeDriver']);
        YellowBox.ignoreWarnings(['Animated.event']);

                   
                           
                        firebase.database().ref("users/"+ state.key).on("value",datasnap=>{
                            if(data.length!=datasnap.val()){
                                setData(datasnap.val())
                    
                            }
        
                            firebase.database().ref("users/"+navigation.getParam('item').uid+"/"+"posts").on("value",datasnap=>{
                                var returnArray = []
            
                                datasnap.forEach(function(snap) {
                                    var item = snap.val();
                                    item.key = snap.key;
                                    returnArray.push(item);
                                 });
                        
                                 if(post.length!=returnArray.length){
                                    setPost(returnArray)  
                                }
                            
                            }) 
                        })         

                            
                             
               },[post])

    const renderFirst=()=>{
            if(data){
                if(post.length==0){
                    return <View style={{alignSelf:"center",marginTop:heightToDp('3')}}>
                    <Text style={{fontSize:widthToDp('6.5'),alignSelf:"center",fontFamily:"Kalam-Regular"}}>Post uploaded by you</Text>
                    <Text style={{fontSize:widthToDp('4.5'),alignSelf:"center",fontFamily:"Kalam-Regular"}}>Shown here</Text>
                    <FastImage source={require('./assets/post1.png')} style={{height:heightToDp('13'),width:widthToDp('27'),alignSelf:"center",marginTop:heightToDp('5')}}/>
                    <Text style={{fontSize:widthToDp('4.5'),alignSelf:"center",fontFamily:"Kalam-Regular",marginTop:heightToDp('5')}}>No Post Found</Text>
                    <Text style={{fontSize:widthToDp('4.5'),alignSelf:"center",fontFamily:"Kalam-Regular",marginTop:heightToDp('2')}}>Add your First Post</Text>

              </View>
                }

            }
            
        

    }

    return  <View style={{flex:1}}>
           
                               <StatusBar translucent backgroundColor="transparent" />
                               <ScrollView>
                               <ImageBackground source={require("./assets/A.jpg")} style={{ height: heightToDp('15'),margin:0,flexDirection:"row",justifyContent:"space-around"}}>
                                            
                                        
                                          
                                                          
                                                                        <TouchableOpacity  onPress={()=>{setVisible1(true)}} style={{marginTop:heightToDp('7'),borderWidth:3,height:widthToDp('22.8'),borderRadius:widthToDp('15.5'),borderColor:'white'}}>
                                                                                <Avatar.Image size={widthToDp('21')} source={{uri:navigation.getParam('item').owner_token}} />
                                                                        </TouchableOpacity>
                                                            
                                                                        
                    
                       
                                           
                                </ImageBackground>


                                {data? <>
                                    <Text style={{fontSize:widthToDp('4.3'),marginTop:heightToDp('4.4'),alignSelf:"center",color:"black", fontFamily:"MeriendaOne-Regular"}}>{navigation.getParam('item').owner}</Text>
                                   
                                       
                                        
                                        </>
                                  :null
                                }

                               {data?   <FlatList
                                        data={post}
                                        renderItem={({ item }) => <>

                                                                      <TouchableOpacity onPress={()=>{ navigation.navigate('views1', {item:item, data:navigation.getParam('data')})}}>
                                                                                <Card containerStyle={styles.cards1}>
                                                                                        <View style={{flexDirection:"row",padding:widthToDp('0.8'),alignItems:"center"}}>
                                                                                                <Avatar.Image size={widthToDp('7.5')} source={{uri:item.owner_token}} />
                                                                                                <Text style={{marginLeft:widthToDp('3.3'),fontFamily:"ConcertOne-Regular",fontSize:widthToDp('4.1')}}>{item.owner}</Text>
                                                                                        </View>
                                                                                </Card>

                                                                                <FastImage style={{ width:widthToDp('92.4'),height:heightToDp('18.3'),margin:0,padding:0,alignSelf:"center",justifyContent:"center",marginTop:heightToDp('7.0'),marginBottom:heightToDp('4.8')}} source={{ uri: item.access_token}}/>
                                                                                <Text style={{color:"white",fontSize:widthToDp('5'),alignSelf:"center",position:"absolute",marginTop:heightToDp('8')}}>{item.title}</Text>
                                                                                <Text style={{color:"white",fontSize:widthToDp('3.7'),alignSelf:"center",position:"absolute",marginTop:heightToDp('11')}}>{item.Book_std}</Text>
                                                                        
                                                                                <Card containerStyle={styles.cards}>
                                                                                        <View style={{height:heightToDp('4.8'),justifyContent:"center"}}>
                                                                                          
                                                                                        </View>
                                                                                </Card>
                                                        
                                                                      </TouchableOpacity>

                
                                                
                    
                                                    </>
                                        }
                                        keyExtractor={(item) => item.key}
                                        
                              />
                              
                              
                               :<ActivityIndicator size="large" style={{marginTop:heightToDp('26')}}/>
                               }
                               
                                <View>
                                    {renderFirst()}
                                </View>
            
                              </ScrollView>
                              <Modal transparent={true} visible={visible1} animationType="fade">
                                  
                                    <View style={{backgroundColor:"#000000aa", flex:1,justifyContent:"center"}}>
                                          <View>
                                                <TouchableOpacity  style={{marginTop:heightToDp('5'),alignItems:"center"}} onPress={()=>{setVisible1(false)}}>
                                                    <Avatar.Image size={widthToDp('45.5')} source={{ uri: navigation.getParam('item').owner_token }} />
                                                </TouchableOpacity>
                                          </View>
                                                  
                                       
                
                                    </View>
                                </Modal>
                              

                              
        </View>
 
}

ViewScreen.navigationOptions={
    headerShown:null,   
}


const styles=StyleSheet.create({
  
  

      
    card:{
        //alignItems:"center",
        marginTop:heightToDp('1.5'),
        padding:0,
        //backgroundColor:"#3b5998",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderWidth:0,
        borderRadius:10  
    },
    iconn:{
        fontSize:30,
        color:"red"
    },
    touch1:{
        marginTop:heightToDp('5'),
        height:heightToDp('5'),
      
    },
    touch2:{
        marginTop:heightToDp('5.5'),
        height:heightToDp('5'),
    },

    cards1:{
        position:"absolute",
        marginTop:heightToDp('2'),
        padding:0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderWidth:0,
        width:widthToDp('92.4'),
        alignSelf:"center"
    },
    cards:{
        position:"absolute",
        marginTop:heightToDp('24.7s'),
        padding:0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 5,
        borderWidth:0,
        width:widthToDp('92.4'),
        alignSelf:"center",
    },
    card1:{
        height:heightToDp('32'),
        shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.00,
          borderRadius:5,
          elevation: 24,
          borderWidth:0,
          width:widthToDp('65'),
          alignSelf:"center",
          //alignItems:"center"

    },
    container4:{
        alignItems:"center",
        
        backgroundColor:"white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderWidth:0,
        height:heightToDp('5'),
        width:widthToDp('25')
    },
    container5:{
        alignItems:"center",
        backgroundColor:"orange",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        //borderRadius:25,
        elevation: 24,
        borderWidth:0,
        height:heightToDp('5'),
        width:widthToDp('25')
        
    },
    text:{
        alignSelf:"center",
        fontSize:widthToDp('3.4'),
        //fontFamily:"SpecialElite-Regular",
     

    
        },

   

})


export default ViewScreen;
