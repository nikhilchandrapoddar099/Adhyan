
import React ,{useEffect,useState,useContext} from 'react';
import {View,StatusBar,TextInput,Image,TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import firebase, { database } from 'firebase';
import {Context as AuthContext} from '../context/AuthContext';
import {widthToDp,heightToDp} from '../Responsive';
import { Avatar } from 'react-native-paper';

const ChatBox=({navigation})=>{
    const [msg,setMsg]=useState('');
    const {state}=useContext(AuthContext);
    const [post, setPost]=useState('');

    useEffect(()=>{
       
            database().ref("messages/"+ navigation.getParam('data').uid + "/" + navigation.getParam('item').uid).on("value",datasnap=>{
                var returnArray = []

                    datasnap.forEach(function(snap) {
                                var item = snap.val();
                                returnArray.push(item);
                    });

                    if(post.length!=returnArray.length){
                        setPost(returnArray)
                    }

        })
    
        

    },[post])




    const submit=()=>{
                var date = new Date().getDate();
                var month = new Date().getMonth() + 1;
                var year = new Date().getFullYear();
                var hour=new Date().getHours();
                var minutes=new Date().getMinutes();
                var TimeType='';
                if(hour <= 11)
                {
            
                TimeType = 'AM';
            
                }
                else{

                TimeType = 'PM';
            
                }
                if( hour > 12 )
                {
                hour = hour - 12;
                }
            
            
                if( hour == 0 )
                {
                    hour = 12;
                } 
                if(minutes < 10)
                {
                minutes = '0' + minutes.toString();
                }
            

                    var time=hour.toString() + ':' + minutes.toString() +  ' ' + TimeType.toString();
                    
                    const newReference=firebase.database().ref('messages/' +navigation.getParam('data').uid + "/" + navigation.getParam('item').uid).push();
                    const newReference1=firebase.database().ref('messages/' +navigation.getParam('item').uid + "/" + navigation.getParam('data').uid).push();
                    var x=msg;
                    setMsg('')

                    newReference
                    .set({
                        Me_Msg: x,
                        date:date + '-' + month + '-' + year,
                        time:time,
                        seen:true,
                        ref:newReference.key,
                        ref1:newReference1.key,
                        data:navigation.getParam('data'),
                        items:navigation.getParam('item')
                      
                        })
                            .then(() => {
                                newReference1
                                    .set({
                                        User_Msg: x,
                                        date:date + '-' + month + '-' + year,
                                        time:time,
                                        seen:true,
                                        ref:newReference1.key,
                                        ref1:newReference.key,
                                        data:navigation.getParam('item'),
                                        items:navigation.getParam('data')
                                    
                                        })
                                        .then(()=>{
                                            setMsg('')
                                        })
                               
                                
                                    
                                      
                            });
                    

                            

            }

    const renderMessage=(item)=>{
        if(item.User_Msg){
               return  <View style={styles.msgCard1}>
                        <Image style={{ height: heightToDp('3.5'),width:widthToDp('7.1'),borderRadius:20,alignSelf:"center",padding:5,}} source={{uri:navigation.getParam('item').owner_token}}/>
                        <Text style={{borderRadius:5,backgroundColor:"orange",marginLeft:widthToDp('3'),padding:5}}>
                        <Text style={{color:"white",fontFamily:"ConcertOne-Regular",fontSize:widthToDp('4.7')}}>
                            {item.User_Msg}
                        </Text>
                        </Text>
                        </View>

        }
        else if(item.Me_Msg){
            return <View style={styles.msgCard2}>
                            <View style={{width:widthToDp('48'),alignItems:"flex-end"}}>
                            <Text style={{marginRight:widthToDp('3'),borderRadius:5,backgroundColor:"#6495ED",padding:5}}>

                                    <Text style={{color:"white",fontFamily:"ConcertOne-Regular",fontSize:widthToDp('4.7')}}>
                                        {item.Me_Msg}
                                    </Text>
                                   
                                    
                            </Text>
                            </View>
                                
                            <Image style={{ height: heightToDp('3.5'),width:widthToDp('7.1'),borderRadius:20,alignSelf:"center",padding:5,}} source={{uri:navigation.getParam('data').owner_token}}/>
                    </View>

        }
        else {
            return null
        }

    }        

     const renderButton=()=>{
         if(msg){
            return (
                <>
                <TouchableOpacity onPress={()=>{submit()}}>
                        <Image source={require('../screens/assets/send.png')} style={{width: widthToDp('7.8'), height:heightToDp('3.8'),borderRadius:35,resizeMode:"stretch"}}/>
                </TouchableOpacity>
                </>
            );

           
         }
         else{
             return (
                <>
                <Image source={require('../screens/assets/cancel.png')} style={{ width: widthToDp('7.8'), height:heightToDp('3.8') ,borderRadius:35,resizeMode:"stretch"}}/>
                </>
             ); 
         }
     }
    return (
        <View style={{flex:1}} >
             
             <StatusBar  barStyle="dark-content"/>
                <View style={{flexDirection:"row",height:heightToDp('5.5'),marginTop:heightToDp('3.5'),alignItems:"center"}}>
                        <Image style={{ height: heightToDp('2.5'),width:widthToDp('10'),borderRadius:20,alignSelf:"center"}} source={require('./assets/arrow1.png')}/>
                
                        <Avatar.Image size={widthToDp('9.4')} source={{uri:navigation.getParam('item').owner_token}} />
                        
                        <Text style={{alignSelf:"center",fontSize:widthToDp('4.6'),marginLeft:widthToDp('4'),fontWeight:"bold"}}>{navigation.getParam('item').owner}</Text>
                        </View>
                        
            <FlatList  
                        data={post}
                        renderItem={({ item }) => <>
                                                 {renderMessage(item)}
                        
                                                </>
                        }
                        keyExtractor={(item) => item.key}
                 
            />


           <View style={{flexDirection:"row",bottom:15}}>
           <TextInput placeholder=" Type a message"  placeholderTextColor="black" value={msg} autoCapitalize='none' onChangeText={setMsg} style={{backgroundColor:"#D0D3D4", width:widthToDp('81.5'),marginHorizontal:widthToDp('3.3'),borderRadius:10,color:"black", opacity:0.7}}/>
           <View style={{marginLeft:widthToDp('1'),justifyContent:"center"}}>
                {renderButton()}
           </View>
           </View>

        </View>

    );
}

const styles=StyleSheet.create({
    msgCard1:{
        margin:0,
        padding:5,
        //backgroundColor:"#F0F8FF",
        marginVertical:heightToDp('1.2'),
        flexDirection:"row",
        width:widthToDp('48'),
        
        
      
    
    },
    msgCard2:{
        margin:0,
        padding:5,
        //backgroundColor:"orange",
        marginVertical:heightToDp('1.2'),
        flexDirection:"row",
        justifyContent:"flex-end",
       

    },
})

export default ChatBox;