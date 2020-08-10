import React ,{useState}from 'react';
import {View,Text,StyleSheet,StatusBar,ImageBackground} from 'react-native';
import {Image,Card} from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider';
import OptionScreen from './OptionScreen';
import {widthToDp,heightToDp} from '../Responsive'
import FastImage from 'react-native-fast-image';


 
const slides = [
  {
    key: '1',
    title: 'Discover your Dreams',
    text: 'Make your Dreams True',
    image: require('./assets/teacher.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: '2',
    title: 'Self Dependent',
    text: 'Group Discission',
    image: require('./assets/eat.png'),
    backgroundColor: '#423EEE',
  },
  {
    key: '3',
    title: 'Study Material',
    text: 'All Books are Free Here',
    image: require('./assets/book.png'),
    backgroundColor: '#E0DD1A',
  }

];



const IntroScreen =({navigation}) =>{
    const [showRealApp,setShowRealApp]=useState(false);
   
    

  

    const renderItem = ({ item }) => {
        return (
          <View style={{flex:1,alignItems:"center",backgroundColor:"#41E5EE"}}>
           <StatusBar backgroundColor={"#41E5EE"}/>
              <Card containerStyle={{
                  height:heightToDp('65'),
                  width:widthToDp('87'),
                  alignItems:"center",
                  marginTop:heightToDp('20'),
                  
                  //justifyContent:"flex-end",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,
                elevation: 24,
                borderWidth:0,
                borderRadius:10,
                backgroundColor:item.backgroundColor,
                opacity:0.9
                
            
             
              }}>
                <Text style={styles.text1}>{item.title}</Text>
                <Text style={styles.text2}>{item.text}</Text>
                    <FastImage source={item.image} style={styles.img}/>
              </Card>
      
          </View>
        );
      }

      const onDone = () => {
        setShowRealApp(true)
      }

      
        if (showRealApp) {
          return <OptionScreen navigation={navigation}/>;
        } else {
          return <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone}/>;
        }
  
      //return null
}



const styles=StyleSheet.create({
    text1:{
        marginTop:heightToDp('1.5'),
        alignSelf:"center",
        fontSize:widthToDp('6'),
        color:"white",
        fontFamily:"MeriendaOne-Regular"
    },
    img:{
        height:heightToDp('32'),
        width:widthToDp('61'),
        marginTop:heightToDp('5'),
       
    },
    text2:{
        marginTop:heightToDp('16'),
        fontSize:widthToDp('4.5'),
        color:"white",
        alignSelf:"center",
        fontFamily:"ConcertOne-Regular"

    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
})
 
export default IntroScreen;