import React, {useState} from 'react';
import {View,StyleSheet,TextInput,TouchableOpacity,ImageBackground} from 'react-native'
import {Text,Card} from 'react-native-elements';
import Spacer from './Spacer';
import {widthToDp,heightToDp} from '../Responsive';
import FastImage from 'react-native-fast-image';

const SigninForm=({navigation,headerText,errorMessage,onSubmit,submitButtonText})=>{
   
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    


    return <>
            <Text style={{alignSelf:"center",fontFamily:"ConcertOne-Regular",fontSize:widthToDp('6.8')}}>{headerText}</Text>
            <ImageBackground source={require('../screens/assets/person.png')} style={{ width: widthToDp('25'), height:heightToDp('11.9'),alignSelf:"center",marginTop:heightToDp('3')}}/>

                <TextInput placeholder="Email" value={email} autoCapitalize='none' onChangeText={setEmail} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('30'),height:heightToDp('5.4')}}/>
                <TextInput placeholder="Password" secureTextEntry value={password} autoCapitalize='none' onChangeText={setPassword} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1.5'),height:heightToDp('5.4')}}/>

                <TouchableOpacity onPress={()=>{navigation.navigate('Forget')}}>
                <Text style={{color:"blue",alignSelf:"flex-end"}} >Forget Password</Text>
                </TouchableOpacity>
                

                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

                <TouchableOpacity onPress={()=>{onSubmit({email,password}),setEmail(''),setPassword('')}} style={{marginTop:heightToDp('4')}}>
                    <Card containerStyle={styles.container1}>
                            <Text style={{color:"white",fontSize:widthToDp('3.4')}}>{submitButtonText}</Text>
                    </Card>
                </TouchableOpacity>


                
              
    </>

};

const styles=StyleSheet.create({
    errorMessage:{
        fontSize:16,
        color:'red',
        marginLeft:15,
        marginBottom:15,
        //marginTop:0
    },
    container1:{
        alignItems:"center",
        margin:0,
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

        
    },

    container2:{
        alignItems:"center",
        margin:0,
        marginTop:50,
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
          

        
    },
    container3:{
        alignItems:"center",
        margin:0,
        marginTop:10,
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
          

        
    }

})
export default SigninForm;