import React from 'react';

import {View,Text,Image,TouchableOpacity} from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  



import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import IntroScreen from './src/screens/IntroScreen';
import OptionScreen from './src/screens/OptionScreen'
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackScreen from './src/screens/TrackScreen';
import ForgetScreen from './src/screens/ForgetScreen';
import SignupOption from './src/screens/SignupOption';
import SigninOption from './src/screens/SigninOption';
import ProfileScreen from './src/screens/ProfileScreen';
import EditScreen from './src/screens/EditScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import PostDetail from './src/screens/PostDetail';
import EditPost from './src/screens/EditPost';
import ChatBox from './src/screens/ChatBox';
import MsgScreen from './src/screens/MsgScreen';
import AboutScreen from './src/screens/AboutScreen';
import SettingScreen from './src/screens/SettingScreen';
import CartScreen from './src/screens/CartScreen';
import ChangePassword from './src/screens/ChangePassword';
import  ViewScreen from './src/screens/ViewScreen';
import ViewDetail from './src/screens/ViewDetail';
import GalleryScreen from './src/screens/GalleryScreen';
import ChangePhoto from './src/screens/ChangePhoto'


import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import {widthToDp,heightToDp} from './src/Responsive';


const switchNavigator=createSwitchNavigator({
  ResolveAuth:ResolveAuthScreen,
  Intro:IntroScreen,
  loginFlow: createStackNavigator({
      Option:OptionScreen,
      About:AboutScreen,
      Signup0:SignupOption,
      Signup:SignupScreen,  
      Signin0:SigninOption,
      Signin:SigninScreen,
      Forget:ForgetScreen
   
  },{
    defaultNavigationOptions:{
      headerShown:null,
      
    }
  }),
  x:createStackNavigator({
            result:createBottomTabNavigator({
              Track: { screen: TrackScreen,
                navigationOptions:{
                  keyboardHidesTabBar:true,
                  tabBarLabel:' ',  
                    tabBarIcon: () => (  
                        <View>
                            <Image source={require('./src/screens/assets/home.png')} style={{height:heightToDp('3.2'),width:widthToDp('6.8'),marginTop:heightToDp('2.3')}}/>
                        </View>
                        ),  
                        barStyle: { backgroundColor: 'white'},
                }  
              },  
              Profile: { screen: ProfileScreen,  
                navigationOptions:{  
                  keyboardHidesTabBar:true,
                    tabBarLabel:' ',  
                    tabBarIcon: () => (  
                        <View>  
                                    <Image source={require('./src/screens/assets/profile.png')} style={{height:heightToDp('3.2'),width:widthToDp('6.8'),marginTop:heightToDp('2.3')}}/>
                        </View>),  
                  
                    barStyle: { backgroundColor: 'white'},  
                }  
              },
              Message: { screen: MsgScreen,  
                navigationOptions:{  
                  keyboardHidesTabBar:true,
                    tabBarLabel:' ',  
                    tabBarIcon: () => (  
                        <View>  
                                  
                                    <Image source={require('./src/screens/assets/send1.png')} style={{height:heightToDp('3.2'),width:widthToDp('6.8'),marginTop:heightToDp('2.3')}}/>
                        </View>),  
                  
                    barStyle: { backgroundColor: 'white'},  
                }  
              },
          
                    
            }),
            About:AboutScreen,
            Cart:CartScreen,
            Post:PostDetail,
            views:ViewScreen,
            views1:ViewDetail,
            Edit:EditPost,
            photo:ChangePhoto,
            Chat:ChatBox,
            Edits:EditScreen,
            Setting:SettingScreen,
            Create:TrackCreateScreen,
            Edit:EditPost,
            Chat:ChatBox,
            Password:ChangePassword,
            gallery:GalleryScreen,

  },{
    defaultNavigationOptions:{
      headerShown:null,
      
    }
  }
  
  )
 
  
  
},{
  defaultNavigationOptions:{
    headerShown:null
  }
  
}
);



const App=createAppContainer(switchNavigator);

export default ()=>{
 
  return(
    <AuthProvider>
      <App ref={(navigator)=> {
        setNavigator(navigator)}}/>
      </AuthProvider>
  )
}

