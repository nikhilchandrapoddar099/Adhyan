
import React ,{useContext,useEffect,useState} from 'react';
import {StyleSheet, View,Image, ActivityIndicator, ImageBackground,  YellowBox, StatusBar,TouchableOpacity,FlatList,ScrollView,Modal} from 'react-native';
import {Text,Card} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import firebase from 'firebase';
import {widthToDp,heightToDp} from '../Responsive';
import { Avatar,} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';





const ProfileScreen=({navigation})=>{

    const {signout,state}=useContext(AuthContext);
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
        
                            firebase.database().ref("users/"+state.key+"/"+"posts").on("value",datasnap=>{
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
                    <Image source={require('./assets/post1.png')} style={{height:heightToDp('13'),width:widthToDp('27'),alignSelf:"center",marginTop:heightToDp('5')}}/>
                    <Text style={{fontSize:widthToDp('4.5'),alignSelf:"center",fontFamily:"Kalam-Regular",marginTop:heightToDp('5')}}>No Post Found</Text>
                    <Text style={{fontSize:widthToDp('4.5'),alignSelf:"center",fontFamily:"Kalam-Regular",marginTop:heightToDp('2')}}>Add your First Post</Text>

              </View>
                }

            }
    }
    const hideModal1 = () => setVisible1(false);
    const hideModal = () => setVisible(false);


    return  <View style={{flex:1}}>
           
                               <StatusBar translucent backgroundColor="transparent" />
                               <ScrollView>
                               <ImageBackground source={require("./assets/hii.jpg")} style={{ height: heightToDp('24'),margin:0,flexDirection:"row",justifyContent:"space-around"}}>
                                            <TouchableOpacity style={styles.touch1} onPress={()=>{setVisible(true)}}>
                                                                <FastImage style={{ height: heightToDp('4'),width:widthToDp('7')}} source={require('./assets/logout.png')}/>
                                            </TouchableOpacity>

                                        
                                            {data?<>
                                                          
                                                                        <TouchableOpacity  onPress={()=>{navigation.navigate('photo',{data:data})}} style={{marginTop:heightToDp('7'),borderWidth:3,height:widthToDp('22.8'),borderRadius:widthToDp('15.5'),borderColor:'white'}}>
                                                                                <Avatar.Image size={widthToDp('21')} source={{uri:data.owner_token}} />
                                                                        </TouchableOpacity>
                                                            
                                                                        
                                                        
                                            </>
                                                    :<ActivityIndicator size="large"/>
                                            }  

                                            <TouchableOpacity style={styles.touch2} onPress={()=>{navigation.navigate('Setting' ,{data:data,urlImg:data.owner_token,uid:state.key,posts:post})}}>
                                                                <FastImage style={{ height:heightToDp('3.5'),width:widthToDp('7.2')}} source={require('./assets/gear.png')}/>
                                            </TouchableOpacity> 
                                </ImageBackground>


                                {data? <>
                                    <Text style={{fontSize:widthToDp('4.3'),marginTop:heightToDp('18..4'),position:"absolute",alignSelf:"center",color:"white"}}>{data.owner}</Text>
                                        <Text style={{fontSize:widthToDp('4'),marginTop:heightToDp('20.8'),position:"absolute",alignSelf:"center",color:"white"}}>{data.profession}</Text>
                                        
                                        </>
                                  :null
                                }
                                
                           
                               <TouchableOpacity onPress={()=>{navigation.navigate('Create',{uid:state.key, pin:data.pin,  email:data.email,data:data})}}>
                                        <Card containerStyle={styles.card}>   
                                                <FastImage style={{ height: heightToDp('5.2'),width:widthToDp('13.2'),margin:0,padding:0,alignSelf:"center"}} source={require('./assets/post.png')}/>
                                        </Card>
                               </TouchableOpacity>

                               {data?   <FlatList
                                        data={post}
                                        renderItem={({ item }) => <>

                                                                      <TouchableOpacity onPress={()=>{ navigation.navigate('Edit', {item:item, data:data, uid:state.key, pin:data.pin,  email:data.email})}}>
                                                                                <Card containerStyle={styles.cards1}>
                                                                                        <View style={{flexDirection:"row",padding:widthToDp('0.8'),alignItems:"center"}}>
                                                                                                <Avatar.Image size={widthToDp('7.5')} source={{uri:item.owner_token}} />
                                                                                                <Text style={{marginLeft:widthToDp('3.3'),fontFamily:"ConcertOne-Regular",fontSize:widthToDp('4.1')}}>{item.owner}</Text>
                                                                                        </View>
                                                                                </Card>

                                                                                <FastImage style={{ width:widthToDp('92.4'),height:heightToDp('18.3'),margin:0,padding:0,alignSelf:"center",justifyContent:"center",marginTop:heightToDp('6.25'),marginBottom:heightToDp('4.8')}} source={{ uri: item.access_token}}/>
                                                                                <Text style={{color:"white",fontSize:widthToDp('5'),alignSelf:"center",position:"absolute",marginTop:heightToDp('8')}}>{item.title}</Text>
                                                                                <Text style={{color:"white",fontSize:widthToDp('3.7'),alignSelf:"center",position:"absolute",marginTop:heightToDp('11')}}>{item.Book_std}</Text>
                                                                        
                                                                                <Card containerStyle={styles.cards}>
                                                                                        <View style={{height:heightToDp('4.8'),justifyContent:"center"}}>
                                                                                            <FastImage style={{ width:widthToDp(5),height:heightToDp('2.4'),margin:0,padding:0,alignSelf:"center"}} source={require('./assets/pencil.png')}/>
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
                              <Modal transparent={true} visible={visible}  onDismiss={hideModal}>
                                    <StatusBar  barStyle="dark-content" backgroundColor="#000000aa"/>
                                    <View style={{backgroundColor:"#000000aa", flex:1,justifyContent:"center"}}>
                                        <Card containerStyle={styles.card1}>
                                            <View style={{alignSelf:"center"}}>
                                                <Avatar.Image size={widthToDp('15')} source={{uri:data.owner_token}}/>
                                            </View>
                                                <Text style={{fontSize:widthToDp('4'),alignSelf:"center",fontWeight:"bold",marginTop:heightToDp('2')}}>{data.owner}</Text>
                                                <Text style={{fontSize:widthToDp('3.5'),alignSelf:"center"}}>{data.profession}</Text>
                                                <Text style={styles.text}>Are you sure want to logout</Text>

                                               <View style={{flexDirection:"row",marginTop:heightToDp('3.5'),justifyContent:"center"}}>
                                                        <TouchableOpacity  style={{marginTop:0}} onPress={()=>{setVisible(false)}}>
                                                            <Card containerStyle={styles.container4}>
                                                                    <Text style={{color:"black", fontSize:widthToDp('3.5'),}} >No</Text>
                                                            </Card>
                                                            
                                                        </TouchableOpacity>

                                                        <TouchableOpacity  style={{marginTop:0}} onPress={()=>{signout(state.key)}}>
                                                            <Card containerStyle={styles.container5}>
                                                                    <Text style={{color:"white", fontSize:widthToDp('3.5'),}} >Yes</Text>
                                                            </Card>
                                                            
                                                        </TouchableOpacity>
                                                </View>       
                                        </Card>
                                    </View>
                                </Modal>

                                                          
        </View>
 
}

ProfileScreen.navigationOptions={
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
        marginTop:heightToDp('1.2'),
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


export default ProfileScreen;
