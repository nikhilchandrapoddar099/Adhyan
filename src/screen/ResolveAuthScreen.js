import React ,{useEffect,useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import {Image,Text,View,StyleSheet,StatusBar,ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import {widthToDp,heightToDp} from '../Responsive'


const ResolveAuthScreen=()=>{
    const {tryLocalSignin}=useContext(AuthContext);
    
    
    useEffect(()=>{
        const x= {
            apiKey: "AIzaSyDtZxD3QWBVFqWgvaUIJ8gwO4xuLD6h4NM",
            authDomain: "auth-87556.firebaseapp.com",
            databaseURL: "https://auth-87556.firebaseio.com",
            projectId: "auth-87556",
            storageBucket: "auth-87556.appspot.com",
            messagingSenderId: "185213069696",
            appId: "1:185213069696:web:0732a8a5d1cd76b24f3965",
            measurementId: "G-73FLM3K2TY"
          }
        if (!firebase.apps.length) {
            firebase.initializeApp(x);
         }
         
        tryLocalSignin();
        
    },[]);
    
    return <View style={{backgroundColor:"#FDFEFE ",flex:1,justifyContent:"center",alignItems:"center",marginBottom:10}}>
           <StatusBar translucent backgroundColor="transparent" />
           <Image source={require('./assets/logo.png')} style={styles.logo}/>
           <ActivityIndicator size="large" color="#00ff00"  />
           </View>;
};

const styles=StyleSheet.create({
    logo:{
        height:heightToDp('45'),
        width:widthToDp('50')
    }
})

export default ResolveAuthScreen;

