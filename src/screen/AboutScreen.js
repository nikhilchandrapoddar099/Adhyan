import React ,{useState,useContext} from 'react';
import {Text,TouchableOpacity,View,StyleSheet,StatusBar,Image,ImageBackground,Linking,Dimensions} from 'react-native';
import {widthToDp,heightToDp} from '../Responsive';
import FastImage from 'react-native-fast-image';

const AboutScreen=()=>{
   
    return <View style={{flex:1}}>
              
              <View>
                  <ImageBackground source={require('./assets/A2.jpg')} style={{height:heightToDp('22')}}>
                        <FastImage source={require('./assets/nik.jpg')} style={{height:heightToDp('10'),width:widthToDp('20'),alignSelf:"center",marginTop:heightToDp('15.5'),borderRadius:15}}/>
                  </ImageBackground>
              </View>
              
              <Text style={{fontSize:widthToDp('5.5'),alignSelf:"center",marginTop:heightToDp('5'),fontFamily:"ConcertOne-Regular"}}>Nikhil Chandra Poddar</Text>
              <Text style={{fontSize:widthToDp('4'),alignSelf:"center",marginTop:heightToDp('0'),color:"#7B7D7D"}}>Creator of Adhyan</Text>

              <Text style={{fontSize:widthToDp('3.4'),alignSelf:"center",marginTop:heightToDp('2'),padding:15}}>
              I Nikhil, Software Developer at this App.The Purpose of creating
               this App to provide Study Material to those Childreen who are not able to
                buy today's costly books.
              </Text>
              <Text style={{fontSize:widthToDp('3.7'),alignSelf:"center",marginTop:heightToDp('1'),padding:5,alignSelf:"center",color:"#7B7D7D"}}>
                  Do you know?
            </Text>

              <Text style={{fontSize:widthToDp('3.4'),alignSelf:"center",marginTop:heightToDp('0'),padding:15,alignSelf:"center"}}>
              Education is not about only learning skills and knowledge. It also means helping people for his/her study and how to support them to for his/her bright future. ...
               Through education, the knowledge of society, country, and of the world is passed on from generation to generation.
              </Text>
              <Text style={{fontSize:widthToDp('3.7'),alignSelf:"center",marginTop:heightToDp('1'),padding:5,alignSelf:"center",color:"#7B7D7D"}}>
                  Note
            </Text>
              <Text style={{fontSize:widthToDp('3.4'),alignSelf:"center",marginTop:heightToDp('0'),padding:15,alignSelf:"center"}}>
                  If you have any important old Study Material or Material related to Study of any class,No matter the material reated to which class or board,
                   You can post your Study Material right here.
              </Text>

              <Text style={{fontSize:widthToDp('3.7'),alignSelf:"center",marginTop:heightToDp('1'),padding:5,alignSelf:"center",color:"#7B7D7D"}}>
                  Contact Us
              </Text>

              <View style={{flexDirection:"row",paddingHorizontal:10,justifyContent:"space-around",marginTop:heightToDp('14')}}>
                        <TouchableOpacity onPress={()=>Linking.openURL('https://www.facebook.com/nikhil.poddar.7169')}>
                                <FastImage style={{height:heightToDp('4'),width:widthToDp('8.5')}} source={require('./assets/facebook.png')}/>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>Linking.openURL('https://github.com/nikhilchandrapoddar099')}>
                                <FastImage style={{height:heightToDp('4.1'),width:widthToDp('8.5')}} source={require('./assets/github.png')}/>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>Linking.openURL('https://www.linkedin.com/in/nikhil-chandra-poddar-02723417b/')}>
                                <FastImage style={{height:heightToDp('4.1'),width:widthToDp('8.5')}} source={require('./assets/linkedin.png')}/>
                        </TouchableOpacity>
              </View>

           
        </View>
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

AboutScreen.navigationOptions={
    headerShown:null,
    
}

export default AboutScreen;