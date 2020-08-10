import React, {useState} from 'react';
import {View,StyleSheet,TextInput,TouchableOpacity,ImageBackground,Image,Dimensions} from 'react-native'
import {Text,Button,Card} from 'react-native-elements';
import Spacer from './Spacer';
import {widthToDp,heightToDp} from '../Responsive'
import ImagePicker from 'react-native-image-picker'
import { Avatar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

//import { AccessToken, LoginManager } from "react-native-fbsdk";

const SignupForm=({headerText,onSubmit,submitButtonText})=>{
    const [fullname, setFullname]=useState('');
    const [profession, setProfession]=useState('');
    const [age, setAge]=useState('');
    const [pin, setPin]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [confirmpassword, setConfirmPassword]=useState('');

    const [photo,setPhoto]=useState('');
    
   const handleChoosePhoto = () => {
    const options = {noData: true}
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setPhoto(response.uri)
            }
        })

     } 
    

    return <View>
                    <Text style={{alignSelf:"center",fontFamily:"ConcertOne-Regular",fontSize:widthToDp('6.8')}}>{headerText}</Text>

                    <TouchableOpacity style={{alignSelf:"center",marginTop:heightToDp('2'),borderRadius:35}} onPress={handleChoosePhoto}>
                            {photo ?    <Avatar.Image size={widthToDp('21')} source={{ uri: photo }} />
        
                            : <FastImage source={require('../screens/assets/add.png')} style={{  width: widthToDp('24'), height:heightToDp('11.7'),borderRadius:widthToDp('10'),resizeMode:"stretch",alignSelf:"center"}}/> }
                    </TouchableOpacity>

                    <Text style={{fontSize:widthToDp('4.3'),alignSelf:"center",color:"blue",marginTop:heightToDp('2.8')}}>Tab on the image to Add picture</Text>

                    <TextInput placeholder="Fullname" value={fullname} autoCapitalize="words" onChangeText={setFullname} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('8'),height:heightToDp('5.5')}}/>
                    <TextInput placeholder="Profession" value={profession} autoCapitalize="words" onChangeText={setProfession} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1.5'),height:heightToDp('5.5')}}/>
                    <TextInput placeholder="Age" value={age} keyboardType="number-pad" autoCapitalize="none" onChangeText={setAge} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1.5'),height:heightToDp('5.5')}}/>
                    <TextInput placeholder="Email" value={email} autoCapitalize='none' onChangeText={setEmail} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1.5'),height:heightToDp('5.5')}}/>
                    <TextInput placeholder=" Area Pin Code" value={pin} keyboardType="number-pad"  onChangeText={setPin} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1.5'),height:heightToDp('5.5')}}/>
                    <TextInput placeholder="Password" secureTextEntry value={password} autoCapitalize='none' onChangeText={setPassword} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1.5'),height:heightToDp('5.5')}}/>
                    <TextInput placeholder="Confirm Password" secureTextEntry value={confirmpassword} autoCapitalize='none' onChangeText={setConfirmPassword} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1.5'),height:heightToDp('5.5')}}/> 
                        
                    

                    <TouchableOpacity  style={{backgroundColor:"red",marginTop:heightToDp('5')}} onPress={()=>{onSubmit({fullname,email,age,pin,password,photo,profession,confirmpassword}),setEmail(""),setAge(''),setPassword(""),setFullname(''),setPhoto(''),setProfession(''),setConfirmPassword(''),setPin('')}}>
                        <Card containerStyle={styles.container1}>
                            <Text style={{color:"white",fontSize:widthToDp('3.4')}}>{submitButtonText}</Text>
                        </Card>
                    </TouchableOpacity>

            </View>

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



})
export default SignupForm;