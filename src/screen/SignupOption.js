import React, {useState} from 'react';
//import FacebookLogin from 'react-facebook-login';
import {View,StyleSheet,TextInput,TouchableOpacity,ImageBackground,Image,Dimensions} from 'react-native'
import {Text,Button,Card} from 'react-native-elements';
import Spacer from '../components/Spacer';
import NavLink from '../components/NavLink';
import {widthToDp,heightToDp} from '../Responsive';
import FastImage from 'react-native-fast-image';;




//import { AccessToken, LoginManager } from "react-native-fbsdk";

const SignupOption=({navigation})=>{

    return (
    <View style={{flex:1}}>
            <ImageBackground source={require('./assets/Art1.png')} style={styles.image}>
                    <Card containerStyle={styles.card}>
                            <Text style={{alignSelf:"center",fontFamily:"MeriendaOne-Regular",fontSize:widthToDp('6.5')}}>Sign up For Adhyan</Text>
                            <FastImage source={require('../screens/assets/person.png')} style={{ width: widthToDp('25'), height:heightToDp('11.9'),alignSelf:"center",marginTop:heightToDp('2')}}/>
                            

                                <TouchableOpacity onPress={()=>{}} style={{marginTop:heightToDp('3.6'),}}>
                                    <Card containerStyle={styles.container1}>
                                    <Text style={{color:"white",fontSize:widthToDp('3.4')}} >SignUp With FaceBook</Text>
                                    </Card>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>{}} style={{marginTop:heightToDp('1.5'),}}>
                                    <Card containerStyle={styles.container2}>
                                    <Text style={{color:"white",fontSize:widthToDp('3.4')}} >SignUp With Google</Text>
                                    </Card>
                                </TouchableOpacity>

                                <FastImage source={require('../screens/assets/arrow.png')} style={{ width: widthToDp('95'), height: heightToDp('1') ,alignSelf:"center",marginTop:heightToDp('2')}}/>

                                <TouchableOpacity style={{marginTop:heightToDp('46'),marginBottom:heightToDp('2')}}
                                    onPress={()=>{navigation.navigate('Signup')}}>
                                    <Card containerStyle={styles.container3}>
                                    <Text style={{color:"white",fontSize:widthToDp('3.4')}} >SignUp With Email</Text>
                                    </Card>
                                </TouchableOpacity>

                                <NavLink text="Dont have an account? Sign up instead" routeName='Signin0'/>
                            </Card>
           </ImageBackground>
    </View>
    );

};

SignupOption.navigationOptions=()=>{
    return {
        headerShown:null
    };
};

const styles=StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
      card:{
        height:heightToDp('97'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        borderRadius:10,
        elevation: 24,
        borderWidth:0,       
        opacity:0.9,
    },
    container1:{
        alignItems:"center",
        margin:heightToDp('0'),
        backgroundColor:"#3b5998",
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
        height:heightToDp('5.7')    
    },

    container2:{
        alignItems:"center",
        margin:heightToDp('0'),
        backgroundColor:"#DB4437",
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
        height:heightToDp('5.7') ,
    }

})
export default SignupOption;