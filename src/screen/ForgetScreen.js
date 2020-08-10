import React ,{useState} from 'react';
import {Text,TouchableOpacity,View,StyleSheet,StatusBar,TextInput} from 'react-native';
import {Card} from 'react-native-elements';
import {widthToDp,heightToDp} from '../Responsive';








const ForgetScreen=()=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [msg,setMsg]=useState('');



    
   
    return (
        <View style={{flex:1,justifyContent:"center"}}>
                <Card containerStyle={styles.card}>
                        <TextInput placeholder="Name" value={name} autoCapitalize='none' onChangeText={setName} style={{backgroundColor:"#EDF1F1",marginTop:0}}/>
                        <TextInput placeholder="Email" value={email} autoCapitalize='none' onChangeText={setEmail} style={{backgroundColor:"#EDF1F1",marginTop:10}}/>
                        <TextInput placeholder="Message" value={msg} autoCapitalize='none' onChangeText={setMsg} style={{backgroundColor:"#EDF1F1",marginTop:10}}/>

                        <TouchableOpacity onPress={()=>{}}>
                                    <Card containerStyle={styles.container2}>
                                            <Text style={{alignSelf:"center",color:"white"}}>Send</Text>
                                    </Card>
                        </TouchableOpacity>
                </Card>
                
        </View>
    );
};

const styles=StyleSheet.create({
    card:{
        opacity:0.9,
        height:300,
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
    container2:{
        height:heightToDp('5.9'),
        shadowColor: "#000",  
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        //borderRadius:10,
        elevation: 24,
        borderWidth:0,
        backgroundColor:"orange",
        marginTop:heightToDp('5'),


},

})

export default ForgetScreen;