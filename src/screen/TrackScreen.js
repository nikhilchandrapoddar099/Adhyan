
import React ,{useContext,useEffect,useState} from 'react';
import {StyleSheet,View,ActivityIndicator,StatusBar,FlatList,TouchableOpacity,Image} from 'react-native';
import {Text} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext'
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import TrackForm from '../components/TrackForm';
import {widthToDp,heightToDp} from '../Responsive';
import { Avatar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';


const TrackScreen =({navigation})=>{
    const uid=navigation.getParam('key');
    const {signin}=useContext(AuthContext);
    const [data, setData]=useState('');
    const [post, setPost]=useState('');
    const [show, setShow]=useState(1);

    useEffect(()=>{
       
        YellowBox.ignoreWarnings(['VirtualizedLists']);
        YellowBox.ignoreWarnings(['Setting a timer']);
      

                        firebase.database().ref("users/"+ uid).on("value",datasnap=>{
                            if(data.length!=datasnap.val()){
                                setData(datasnap.val())
                                signin(uid)
                            }
                            
                            firebase.database().ref("public_post_detail/" + datasnap.val().pin).on("value",datasnap=>{
                                var returnArray = []
            
                                    datasnap.forEach(function(snap) {
                                                var item = snap.val();
                                                returnArray.push(item);
                                    });
                            
                                    if(post.length!=returnArray.length){
                                        setPost(returnArray)  ;
                                        
                                    }
                                    if(show){
                                        if(post.length==0){
                                            setShow(0)
                                        }
                                        else{
                                            setShow(1)
                                        }

                                    }
                                    

                            
                            })      
    
                        })
                        
                      

          
    },[post])
    const renderFirst=()=>{
        if(show==0){
            if(post.length==0){
                return <View style={{position:"absolute",alignSelf:"center",marginTop:heightToDp('20')}}>
                             <Text style={{fontSize:widthToDp('6.5'),alignSelf:"center",fontFamily:"Kalam-Regular"}}>Welcome to you in Adhyan</Text>
                             <Text style={{fontSize:widthToDp('4.5'),alignSelf:"center",fontFamily:"Kalam-Regular"}}>No Post Found in Your Location</Text>
                             <FastImage source={require('./assets/hacker.png')} style={{height:heightToDp('13'),width:widthToDp('27'),alignSelf:"center",marginTop:heightToDp('5')}}/>
                             <Text style={{fontSize:widthToDp('4.5'),alignSelf:"center",fontFamily:"Kalam-Regular",marginTop:heightToDp('30')}}>Add your First post in Your Location</Text>
                            <Text style={{fontSize:widthToDp('4.5'),alignSelf:"center",fontFamily:"Kalam-Regular",marginTop:heightToDp('1.5')}}>{data.pin}</Text>
                       </View>
                       
            }
        }
}
    

    return(
        <View style={{flex:1,backgroundColor:"#DCDCDC"}}>
            
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.card}> 
                    <Avatar.Image size={widthToDp('7.5')} source={{ uri: data.owner_token }} />
                    <TouchableOpacity onPress={()=> navigation.navigate('About')}>  
                        <Text style={styles.header}>Adhyan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Cart',{uid:data.uid})}}>
                        <FastImage source={require('./assets/heart.png')} style={{height:heightToDp('4'),width:widthToDp('8.2')}}/>
                    </TouchableOpacity>
            </View>
          
            {data? <>
                                <FlatList
                                data={post}
                                renderItem={({ item }) =>   <TrackForm posts={item} data={data} uid={uid} navigation={navigation}/> }
                                keyExtractor={(item) => item.key}
                               
                                />
                    </>
                               :<ActivityIndicator size="large" style={{marginTop:300}}/>
                }
                            
                                    {renderFirst()}
                            
                             
    </View>

    ); 
}

TrackScreen.navigationOptions={
    headerShown:null,
}



const styles=StyleSheet.create({
    header:{
        fontSize:widthToDp('6.8'),
        paddingVertical:2,
        alignSelf:"center",
        fontFamily:"MeriendaOne-Regular"
        

    },
    card:{
        
        marginTop:heightToDp('3.2'),
        paddingHorizontal:widthToDp('4'),
        margin:0,
        backgroundColor:"white",
        borderWidth:0,
        borderRadius:3  ,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
   
    
});
export default TrackScreen;
