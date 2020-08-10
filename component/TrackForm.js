import React, {useState} from 'react';
import {View,StyleSheet,TextInput,TouchableOpacity,ImageBackground,Image} from 'react-native'
import {Text,Button,Card} from 'react-native-elements';
import Spacer from './Spacer';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker'

//import { AccessToken, LoginManager } from "react-native-fbsdk";

const EditForm=({data,urlImg,headerText,onSubmit,submitButtonText})=>{
    const [fullname, setFullname]=useState(data.owner); 
    const [profession, setProfession]=useState(data.profession);
    const [age, setAge]=useState(data.age);
    const [pin, setPin]=useState(data.pin);
    const [email, setEmail]=useState(data.email);
    const [password, setPassword]=useState(data.password);
    const [confirmpassword, setConfirmPassword]=useState(data.password);

    const [photo,setPhoto]=useState(urlImg);
   const handleChoosePhoto = () => {
    const options = {noData: true}
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setPhoto(response.uri)
            }
        })

     } 
    

    return <>
            <Text h3 style={{marginLeft:10,alignSelf:"center"}}>{headerText}</Text>

            <TouchableOpacity style={{ width: 100, height: 100 ,borderRadius:35,alignSelf:"center",marginTop:25}} onPress={handleChoosePhoto}>
                {photo ? <Image source={{ uri: photo }} style={{ width: 100, height: 100 ,borderRadius:35,resizeMode:"stretch",alignSelf:"center"}}/> 
                : <Image source={require('../screens/assets/add.png')} style={{ width: 100, height: 100 ,borderRadius:35,resizeMode:"stretch",alignSelf:"center"}}/> }
           </TouchableOpacity>

           <Text style={{fontSize:18,alignSelf:"center",color:"blue",marginTop:15}}>Tab on the image to Edit picture</Text>
            <Spacer/>

                <TextInput placeholder="Fullname" value={fullname} autoCapitalize="words" onChangeText={setFullname} style={{backgroundColor:"#EDF1F1",marginTop:70}}/>


                <TextInput placeholder="Profession" value={profession} autoCapitalize="words" onChangeText={setProfession} style={{backgroundColor:"#EDF1F1",marginTop:10}}/>
                <TextInput placeholder="Age" value={age} keyboardType="number-pad" autoCapitalize="none" onChangeText={setAge} style={{backgroundColor:"#EDF1F1",marginTop:10}}/>

                
                

                <TextInput placeholder="Email" value={email} autoCapitalize='none' onChangeText={setEmail} style={{backgroundColor:"#EDF1F1",marginTop:10}}/>

                <TextInput placeholder=" Area Pin Code" value={pin} keyboardType="number-pad"  onChangeText={setPin} style={{backgroundColor:"#EDF1F1",marginTop:10}}/>
                <TextInput placeholder="Password" secureTextEntry value={password} autoCapitalize='none' onChangeText={setPassword} style={{backgroundColor:"#EDF1F1",marginTop:10}}/>

                
                <TextInput placeholder="Confirm Password" secureTextEntry value={confirmpassword} autoCapitalize='none' onChangeText={setConfirmPassword} style={{backgroundColor:"#EDF1F1",marginTop:10,}}/>
              

                <TouchableOpacity onPress={()=>{onSubmit({fullname,email,age,pin,password,photo,profession,confirmpassword})}}>
                    <Card containerStyle={styles.container1}>
                        <Text style={{color:"white"}}>{submitButtonText}</Text>
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
        marginTop:10,
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



})
export default EditForm;
