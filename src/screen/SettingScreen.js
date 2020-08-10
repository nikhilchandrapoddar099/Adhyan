import React ,{useContext,useEffect,useState} from 'react';
import {Text,StyleSheet,ImageBackground,View,Image,TouchableOpacity,Dimensions} from 'react-native';
import {Card} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import {widthToDp,heightToDp} from '../Responsive';
import FastImage from 'react-native-fast-image';

const SettingScreen =({navigation})=>{
    const {state}=useContext(AuthContext);
    return (<View>
         <ImageBackground source={require('./assets/A.jpg')} style={{width:Dimensions.get('window').width,height:heightToDp('24')}}>
                <FastImage source={require('./assets/settings.png')} style={{height:heightToDp('8.5'),width:widthToDp('17'),alignSelf:"center",marginTop:heightToDp('18')}}/>
         </ImageBackground>

         <View style={{flexDirection:"row",marginTop:heightToDp('10'),justifyContent:"space-around"}}>
            <TouchableOpacity>
                <Card containerStyle={styles.card}>
                    <FastImage source={require('./assets/person.png')} style={{height:heightToDp('4.6'),width:widthToDp('9.4'),alignSelf:"center"}}/>
                    <Text style={styles.text}>Profile</Text>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity>
                <Card containerStyle={styles.card}>
                    <FastImage source={require('./assets/mail.png')} style={{height:heightToDp('4.6'),width:widthToDp('9.4'),alignSelf:"center"}}/>
                    <Text style={styles.text}>Email</Text>
                </Card>
            </TouchableOpacity>
         </View>

         <View style={{flexDirection:"row",marginTop:40,justifyContent:"space-around"}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Cart',{uid:state.key})}}>
                <Card containerStyle={styles.card}>
                    <FastImage source={require('./assets/heart.png')} style={{height:heightToDp('4.6'),width:widthToDp('9.4'),alignSelf:"center"}}/>
                    <Text style={styles.text}>Favroite</Text>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>{navigation.navigate('gallery')}}>
                <Card containerStyle={styles.card}>
                    <FastImage source={require('./assets/gallery.png')} style={{height:heightToDp('4.6'),width:widthToDp('9.4'),alignSelf:"center"}}/>
                    <Text style={styles.text}>Gallery</Text>
                </Card>
            </TouchableOpacity>
         </View>

         <View style={{flexDirection:"row",marginTop:40,justifyContent:"space-around"}}>
            <TouchableOpacity onPress={()=>{navigation.navigate("Password")}}>
                <Card containerStyle={styles.card}>
                    <FastImage source={require('./assets/password.png')} style={{height:heightToDp('4.6'),width:widthToDp('9.4'),alignSelf:"center"}}/>
                    <Text style={styles.text}>Password</Text>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('About')}}>
                <Card containerStyle={styles.card}>
                    <FastImage source={require('./assets/about.png')} style={{height:heightToDp('4.6'),width:widthToDp('9.4'),alignSelf:"center"}}/>
                    <Text style={styles.text}>About</Text>
                </Card>
            </TouchableOpacity>
            </View>
         </View>
    );
}

const styles=StyleSheet.create({
    card:{
        marginTop:5,
        margin:0,
        padding:widthToDp('9.5'),
        marginBottom:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderWidth:0,
        borderRadius:5,
        width:widthToDp('42'), 
    },
    text:{
        alignSelf:"center",
        fontSize:widthToDp('3.5'),
        fontFamily:"SpecialElite-Regular",
        marginTop:heightToDp('1')
    
        }

})

export default SettingScreen;