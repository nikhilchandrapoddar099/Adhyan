import React ,{useState} from 'react';
import {StyleSheet,View,Image,StatusBar,TouchableOpacity,Modal,Dimensions,ToastAndroid,ScrollView} from 'react-native';
import {Text,Card} from 'react-native-elements';
import firebase from 'firebase';
import {widthToDp,heightToDp} from '../Responsive'
import { Avatar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';







const PostDetail=({navigation})=>{


    const [visible, setVisible] = useState(false);


    const renderName=()=>{

        if(navigation.getParam('item').uid === navigation.getParam('uid')){
            return(
                <Text style={{ alignSelf:"center",fontSize:widthToDp('5'),fontFamily:"MeriendaOne-Regular",marginBottom:60}}>You</Text>
            );
        }
        else{
            return(<>
                <Text style={{ alignSelf:"center",fontSize:widthToDp('4.5'),marginTop:heightToDp('0.5')}}>Mr. {navigation.getParam('item').owner}</Text>
                <Text style={{alignSelf:"center",fontSize:widthToDp('4'),fontFamily:"ConcertOne-Regular",marginBottom:60}}>{navigation.getParam('item').owner_email}</Text>
                </>
            );
        }

    }

    
    const Cart=()=>{
        firebase.database().ref('users/' + navigation.getParam('uid') + "/"+ "cart" +"/" +navigation.getParam('item').Book_no).update({
            title:navigation.getParam('item').title,
            Book_no:navigation.getParam('item').Book_no,
            Book_std:navigation.getParam('item').Book_std,
            Book_des:navigation.getParam('item').Book_des,
            access_token:navigation.getParam('item').access_token,
            uid:navigation.getParam('item').uid,
            owner:navigation.getParam('item').owner,
            owner_email:navigation.getParam('item').owner_email,
            owner_token:navigation.getParam('item').owner_token
                                                       
        })
    
    }


    const showToast = () => {
        ToastAndroid.show("Succesfully Added!", ToastAndroid.SHORT);
      };


    const renderItem=()=>{

        if(navigation.getParam('item').uid === navigation.getParam('uid')){
            return( <View style={{bottom:heightToDp('1')}}>
                
                <TouchableOpacity style={{alignSelf:"center"}} onPress={()=>{navigation.navigate('Edit', {item:navigation.getParam('item'), pin:navigation.getParam('data').pin, uid:navigation.getParam('data').uid, data:navigation.getParam('data'),email:navigation.getParam('data').email})}}>
                <Card containerStyle={styles.container3}>
                        <Text style={{color:"white",fontSize:widthToDp('3.4')}} >Edit</Text>
                </Card>
                </TouchableOpacity>
                </View>
            );
        }
        else{
            return(<View style={{bottom:heightToDp('1')}}>
                <TouchableOpacity  style={{marginTop:0,alignSelf:"center"}} onPress={()=>{Cart(),showToast()}}>
                        <Card containerStyle={styles.container2}>
                                <Text style={{color:"black",fontSize:widthToDp('3.4')}} >Favourites</Text>
                        </Card>
                </TouchableOpacity>


                <TouchableOpacity  style={{marginTop:heightToDp('1'),alignSelf:"center"}} onPress={()=>{navigation.navigate('Chat', {item:navigation.getParam('item'), data:navigation.getParam('data')})}}>
                        <Card containerStyle={styles.container3}>
                                <Text style={{color:"white",fontSize:widthToDp('3.4')}} >Message</Text>
                        </Card>
               </TouchableOpacity>
               </View>
            );
        }
    }

    const renderPosted=()=>{
        
        if(navigation.getParam('item').uid === navigation.getParam('uid')){
            return <Text style={{padding:widthToDp('2.6')}}>YouSelf</Text>
        }
        return <>
         <TouchableOpacity  onPress={()=>{setVisible(true)}}>
                    <View style={{flexDirection:"row",marginLeft:widthToDp('3'),alignItems:"center"}}>
                        <Avatar.Image size={widthToDp('7')} source={{uri:navigation.getParam('item').owner_token}} />
                        <Text style={{fontSize:widthToDp('4'),padding:widthToDp('2.6')}}>{navigation.getParam('item').owner}</Text>
                    </View>
                    </TouchableOpacity>
        </>
    }




    return (
        <View style={{flex:1}}>
                                                                   
             <StatusBar  barStyle="light-content"/>
              <FastImage style={{ width:Dimensions.get('window').width,height:heightToDp('25'),margin:0,padding:0,alignSelf:"center"}} source={{ uri: navigation.getParam('item').access_token}}/>

              <View style={{marginTop:0,borderBottomWidth:1,}}>
                    <Text style={{fontSize:widthToDp('4'),padding:widthToDp('2.6'),color:"#515A5A",fontWeight: "bold"}}>Title</Text>
                    <Text style={{fontSize:widthToDp('5'),padding:widthToDp('2.6'),fontFamily:"ConcertOne-Regular"}}>{navigation.getParam('item').title}</Text>
              </View>


              <View style={{marginTop:0,borderBottomWidth:1}}>
                    <Text style={{fontSize:widthToDp('4'),padding:widthToDp('2.6'),color:"#515A5A",fontWeight: "bold"}}>Standard</Text>
                    <Text style={{fontSize:widthToDp('4'),padding:widthToDp('2.6')}}>{navigation.getParam('item').Book_std}</Text>
              </View>

              <View style={{marginTop:0,borderBottomWidth:1}}>
                    <Text style={{fontSize:widthToDp('4'),padding:widthToDp('2.6'),color:"#515A5A",fontWeight: "bold"}}>Posted By</Text>
                   {renderPosted()}
              </View>
              <ScrollView>
                        <View style={{marginTop:0}}>
                                <Text style={{fontSize:widthToDp('4'),padding:widthToDp('2.6'),color:"#515A5A",fontWeight: "bold"}}>Descriptions</Text>
                                <Text style={{fontSize:widthToDp('3.5'),padding:widthToDp('2.6'),marginTop:0}}>{navigation.getParam('item').Book_des}</Text>
                                
                        </View>
              </ScrollView>

              
                <View>
               {renderItem()}
               </View>
                
            

           <Modal transparent={true} visible={visible} animationType="fade">
               <StatusBar  barStyle="dark-content" backgroundColor="#000000aa"/>
               <View style={{backgroundColor:"#000000aa", flex:1,justifyContent:"center"}}>
                    <Card containerStyle={styles.card1}>
                        <View style={{alignSelf:"center"}}>
                            <Avatar.Image size={widthToDp('18')} source={{uri:navigation.getParam('item').owner_token}} />
                        </View>
                            <Text style={styles.text}>User Detail</Text>
                            <Text style={styles.title}>Post By:-</Text>
                           
                            <View>
                                {renderName()}
                            </View>

                            <TouchableOpacity  style={{marginTop:heightToDp('4.5')}} onPress={()=>{setVisible(false),navigation.navigate('views',{item:navigation.getParam('item'),data:navigation.getParam('data')})}}>
                                <Card containerStyle={styles.container5}>
                                        <Text style={{color:"black",fontSize:widthToDp('3.4'),}} >View Profile</Text>
                                </Card>
                           </TouchableOpacity>


                            <TouchableOpacity  style={{marginTop:heightToDp('0')}} onPress={()=>{setVisible(false)}}>
                                <Card containerStyle={styles.container4}>
                                        <Text style={{color:"white",fontSize:widthToDp('3.4'),}} >Exit</Text>
                                </Card>
                           </TouchableOpacity>
                          
                    </Card>
              </View>
           </Modal>


        </View>
    );
}

const styles=StyleSheet.create({
  
    text:{
        alignSelf:"center",
        fontSize:widthToDp('7'),
        fontFamily:"SpecialElite-Regular",
     marginTop:heightToDp('3')

    
        },
        image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
          },
          title:{
            alignSelf:"center",
            fontSize:widthToDp('5'),
            fontFamily:"SpecialElite-Regular"
        },
        container3:{
            alignItems:"center",
            margin:0,
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
            height:heightToDp('5.7'),
            width:widthToDp('60')
        },
        container2:{
            alignItems:"center",
            margin:0,
           // marginTop:400,
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
            height:heightToDp('5.7'),
            width:widthToDp('60')
        },
        card1:{
            height:heightToDp('55'),
            opacity:0.8,
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
              width:widthToDp('75'),
              alignSelf:"center",

              //justifyContent:"flex-end"
    
        },
        container4:{
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
           
        },
        container5:{
            alignItems:"center",
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
           
        },

    

})

PostDetail.navigationOptions={
    headerShown:null,
}



export default PostDetail;