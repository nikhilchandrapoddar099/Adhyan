import React ,{useEffect,useState,useContext}from 'react';
import {Text,StyleSheet,ImageBackground,View,Image,TouchableOpacity,FlatList,ToastAndroid,Dimensions,Modal,StatusBar} from 'react-native';
import {Card} from 'react-native-elements';
import firebase from 'firebase';
import {widthToDp,heightToDp} from '../Responsive'
import {Context as AuthContext} from '../context/AuthContext';
import FastImage from 'react-native-fast-image';


const CartScreen =({navigation})=>{
    const [post, setPost]=useState('');
    const {state}=useContext(AuthContext);
    const [data, setData]=useState([]);
    const [visible, setVisible] = useState(false);
    const [item, setItem]=useState('');
    const [show, setShow]=useState(1);
   
    useEffect(()=>{

                        firebase.database().ref("users/"+ state.key).on("value",datasnap=>{
                            if(data.length!=datasnap.val()){
                                setData(datasnap.val())
                            }
                                

                        firebase.database().ref("users/"+ navigation.getParam('uid')+"/"+"cart").on("value",datasnap=>{
                         var returnArray = []
                                    datasnap.forEach(function(snap) {
                                                var item = snap.val();
                                                returnArray.push(item);
                                    });
                            
                                    if(post.length!=returnArray.length){
                                        setPost(returnArray)  
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
                return <View style={{position:"absolute",alignSelf:"center",marginTop:heightToDp('30')}}>
                             <Text style={{fontSize:widthToDp('6'),alignSelf:"center",fontFamily:"Kalam-Regular"}}>Your Favorite shown here</Text>
                             <Text style={{fontSize:widthToDp('4'),alignSelf:"center",fontFamily:"Kalam-Regular"}}>No item Found in Your Bag</Text>
                             <FastImage source={require('./assets/favorite.png')} style={{height:heightToDp('8'),width:widthToDp('16'),alignSelf:"center",marginTop:heightToDp('5')}}/>
                             <Text style={{fontSize:widthToDp('4'),alignSelf:"center",fontFamily:"Kalam-Regular",marginTop:heightToDp('30')}}>No Item Added</Text>
                       </View>
                       
            }
        }
}

    const showToast = () => {
        ToastAndroid.show("Book Removed", ToastAndroid.SHORT);
      };

    
    const deleted=(item)=>{
        const userRef = firebase.database().ref("users/"+ navigation.getParam('uid')+"/"+"cart"+"/"+item.Book_no);
        userRef.remove()
    }
    const renderItem=(item)=>{
        return <View>
                    <TouchableOpacity onPress={()=> navigation.navigate('Post', {item:item,uid:navigation.getParam('uid'),data:data})}>
                                    <Card containerStyle={styles.card}>
                                        <View style={{flexDirection:"row",padding:0}}>
                                                <FastImage source={{uri:item.access_token}} style={{height:heightToDp('15'),width:widthToDp('26'),borderRadius:0}}/>
                                                <View>
                                                            <Text style={{fontSize:widthToDp('4'),marginLeft:widthToDp('3'),fontFamily:"Recursive-Medium-CASL=1-CRSV=0-MONO=0-slnt=0"}}>{item.title}</Text>
                                                            <Text style={{color:"#A6ACAF",fontSize:widthToDp('3'),marginLeft:widthToDp('3')}}>{item.Book_std}</Text>
                                                            <View style={{flexDirection:"row"}}>
                                                            <Text style={{fontSize:widthToDp('3'),marginLeft:widthToDp('3')}}>{"Posted By:-"}</Text>
                                                            <FastImage source={{uri:item.owner_token}} style={{height:heightToDp('2.5'),width:widthToDp('4.8'),borderRadius:15,alignSelf:"center",marginLeft:widthToDp('3')}}/>
                                                </View>
                                                <TouchableOpacity  style={{marginTop:0,position:"absolute",bottom:0,marginLeft:widthToDp('35')}} onPress={()=>{setItem(item),setVisible(true)}}>
                                                    <Card containerStyle={styles.container6}>
                                                            <Text style={{color:"white",fontSize:widthToDp('3.4')}} >Remove</Text>
                                                    </Card>
                                                                
                                                </TouchableOpacity>
                                                </View>
                                        </View>
                                       
                                    </Card>  
                    </TouchableOpacity>   
               </View>

    }

    return <>
    

                    <ImageBackground source={require('./assets/A1.jpg')} style={{width:Dimensions.get('window').width,height:heightToDp('24'),margin:0,padding:0,alignSelf:"center",marginBottom:heightToDp('4')}}>
                        <FastImage source={require('./assets/heart1.png')} style={{height:heightToDp('8'),width:widthToDp('17'),alignSelf:"center",marginTop:heightToDp('18')}}/>
                    </ImageBackground>
                    
                            <FlatList
                                        data={post}
                                        renderItem={({ item }) =>   renderItem(item)}
                                        keyExtractor={(item) => item.key}
                                    
                            />
                             
                    
        

                    <Modal transparent={true} visible={visible} animationType="fade">
                                    <StatusBar  barStyle="dark-content" backgroundColor="#000000aa"/>
                                    <View style={{backgroundColor:"#000000aa", flex:1,justifyContent:"flex-end",margin:0,padding:0}}>
                                        <Card containerstyle={styles.card1}>
                                            <View style={{flexDirection:"row"}}>
                                                <FastImage style={{ height: heightToDp('8'),width:widthToDp('16'),alignSelf:"center"}} source={{ uri: item.access_token}}/>
                                                <View style={{marginLeft:20}}>
                                                    <Text style={{fontSize:widthToDp('4'),fontWeight:"bold"}}>Remove Item</Text>
                                                    <Text style={{fontSize:widthToDp('3.3'),color:"#A6ACAF"}}>Are you sure want to remove this item ?</Text>
                                                </View>
                                            </View>

                                               <View style={{flexDirection:"row",marginTop:0,alignSelf:"flex-end"}}>
                                                        <TouchableOpacity  style={{marginTop:0}} onPress={()=>{setVisible(false)}}>
                                                            <Card containerStyle={styles.container4}>
                                                                    <Text style={{color:"black",fontSize:widthToDp('3.4')}} >No</Text>
                                                            </Card>
                                                            
                                                        </TouchableOpacity>

                                                        <TouchableOpacity  style={{marginTop:0}} onPress={()=>{setVisible(false),showToast(),deleted(item)}}>
                                                            <Card containerStyle={styles.container5}>
                                                                    <Text style={{color:"white",fontSize:widthToDp('3.4')}} >Yes</Text>
                                                            </Card>
                                                            
                                                        </TouchableOpacity>
                                                </View>       
                                        </Card>
                                    </View>
                    </Modal>
                    {renderFirst()}


       
         </>
}


const styles=StyleSheet.create({
    card:{
        //alignItems:"center",
        marginTop:heightToDp('0.7'),
        padding:10,
        marginBottom:heightToDp('0.7'),
        //backgroundColor:"#3b5998",
       borderWidth:0,
        //elevation: 5,
        borderWidth:0,
        //width:80,
        //alignSelf:"center" ,
        borderRadius:0,
        //width:180,
        //backgroundColor:"red" 
    },
    card1:{
        margin:0,
        padding:0,
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
          alignSelf:"center",
          //width:widthToDp('80')

    },
    container4:{
        alignItems:"center",
       // marginTop:35,
       //marginLeft:0,
        backgroundColor:"white",
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
        height:heightToDp('4.9'),
        width:widthToDp('28')
    },
    container5:{
        alignItems:"center",
        //marginTop:35,
       // marginTop:400,
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
        height:heightToDp('4.9'),
        width:widthToDp('28')
        
    },
    container6:{
        alignItems:"center",
        //marginTop:35,
       // marginTop:400,
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
        height:35,
        width:100,
        padding:2,
        justifyContent:"center",
        height:heightToDp('4.5'),
        width:widthToDp('24')
        
        
    },

})

export default CartScreen;