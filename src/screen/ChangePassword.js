import React ,{useState,useContext} from 'react';
import {Text,TouchableOpacity,View,StyleSheet,StatusBar,TextInput} from 'react-native';
import {Card} from 'react-native-elements';


const ChangePassword=()=>{
    const [email,setEmail]=useState('');
   
    return (
        <View style={{flex:1,backgroundColor:"red",justifyContent:"center"}}>
            <Card containerStyle={styles.card}>
            <TextInput placeholder="Email" value={email} autoCapitalize='none' onChangeText={setEmail} style={{backgroundColor:"#EDF1F1",marginTop:0}}/>
            
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
    }

})

export default ChangePassword;