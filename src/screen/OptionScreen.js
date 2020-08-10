import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,ImageBackground,StatusBar}from 'react-native';
import {Card} from 'react-native-elements';
import {widthToDp,heightToDp} from '../Responsive'






const OptionScreen=({navigation})=>{
    return(
      
        <View style={styles.viewStyle}>
                <StatusBar translucent backgroundColor="transparent" />
                <ImageBackground source={require('./assets/Art.png')} style={styles.image}>
                    
                    
                    <Card containerStyle={styles.mainCard}>
                        <View style={{marginBottom:heightToDp('54')}}>
                            <TouchableOpacity onPress={()=> navigation.navigate('About')} style={{height:heightToDp('20'),width:widthToDp('60'),alignSelf:"center",justifyContent:"center"}}>
                                            <ImageBackground source={require('./assets/logo.png')} style={{height:heightToDp('34'),width:widthToDp('60'),alignSelf:"center"}}>
                                            <Text style={{alignSelf:"center",fontFamily:"MeriendaOne-Regular",fontSize:widthToDp('4.7'),marginTop:heightToDp('24')}}>One Step to Your Dreams</Text>
                                            </ImageBackground>
                                            
                            </TouchableOpacity>
                        </View>
                            <View>
                                        <TouchableOpacity onPress={()=>{navigation.navigate('Signup0')}}>

                                            <Card containerStyle={styles.container1}>
                                                <Text style={styles.text1}>Signup</Text>
                                            </Card>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={()=>{navigation.navigate('Signin0')}}>
                                            <Card containerStyle={styles.container2}>
                                                <Text style={styles.text2}>Login</Text>
                                            </Card>
                                        </TouchableOpacity>
                            </View>
                    </Card>
                </ImageBackground>
        </View>
         
       
    );
}

OptionScreen.navigationOptions=()=>{
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
      mainCard:{
          height:heightToDp('98'),
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
            justifyContent:"flex-end"

      },

    viewStyle:{
        flex:1,
    
    },
    container1:{
            height:heightToDp('5.9'),
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
        borderRadius:5,
        elevation: 24,
        borderWidth:0,
        backgroundColor:"orange",
        marginBottom:heightToDp('2'),

},
    text1:{
        fontSize:widthToDp('3.5%'),
        alignSelf:"center"
    },
    text2:{
        fontSize:widthToDp('3.5%'),
        alignSelf:"center",
        color:'white'
    },


});

export default OptionScreen;