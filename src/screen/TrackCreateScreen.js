import React ,{useState} from 'react';
import {StyleSheet, View,Image, ImageBackground,  YellowBox, StatusBar,TouchableOpacity,TextInput,ToastAndroid,Modal} from 'react-native';
import {Text,Card} from 'react-native-elements';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import {widthToDp,heightToDp} from '../Responsive';
import { ActivityIndicator} from 'react-native-paper';
import CompressImage from 'react-native-compress-image';



const TrackCreateScreen=({navigation})=>{
    const [name, setName]=useState('');
    const [std, setStd]=useState('');
    const [des, setDes]=useState('');
    const [photo,setPhoto]=useState('');
    const [visible,setVisible]=useState(false);
    


    const handleChoosePhoto = () => {
        const options = {noData: true}
            ImagePicker.launchImageLibrary(options, response => {
                if (response.uri) {
                   
                        setPhoto(response.uri)
                  
                   
                }
            })
    
         } 

    const uploadImage = async (uri, uid) => {
        YellowBox.ignoreWarnings(['Setting a timer']);
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("images/" + uid);
        return ref.put(blob);
    }

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      };

    const onSubmit=()=>{
        const no=(Math.floor(Math.random() * 1000) + 1).toString()
        setVisible(true)
        if(name && des && photo && std){

                    var date = new Date().getDate();
                    var month = new Date().getMonth() + 1;
                    var year = new Date().getFullYear();
                    var hour=new Date().getHours();
                    var minutes=new Date().getMinutes();
                    var TimeType=''
                    if(hour <= 11)
                    {
                
                    TimeType = 'AM';
                
                    }
                    else{
            
                     TimeType = 'PM';
                
                    }
                    if( hour > 12 )
                    {
                    hour = hour - 12;
                    }
                
                 
                    if( hour == 0 )
                    {
                        hour = 12;
                    } 
                    if(minutes < 10)
                    {
                       minutes = '0' + minutes.toString();
                    }
                

            var time=hour.toString() + ':' + minutes.toString() +  ' ' + TimeType.toString()

            uploadImage(photo, "Post/"+ navigation.getParam('email')+"/" + name+ no)
            .then(()=>{  
                
                            const ref=firebase.storage().ref("images/Post/"+ navigation.getParam('email')+"/" + name+no);
                            ref.getDownloadURL()
                            .then((url)=>{
                                                    firebase.database().ref('users/' + navigation.getParam('uid') + "/"+ "posts"+"/"+name+no).set({
                                                        title:name,
                                                        Book_std:std,
                                                        Book_no:name+no,
                                                        upload_time:time,
                                                        upload_date:date + '-' + month + '-' + year,
                                                        Book_des:des,
                                                        access_token:url,
                                                        uid:navigation.getParam('uid'),
                                                        owner:navigation.getParam('data').owner,
                                                        owner_email:navigation.getParam('data').email,
                                                        owner_token:navigation.getParam('data').owner_token,
                                                        owner_profession:navigation.getParam('data').profession
                                                        
                                                    })
                                                    .then(()=>{
                                                                    firebase.database().ref('public_post_detail/' + navigation.getParam('pin') + "/"+ navigation.getParam('uid') + "/"+name+no).set({
                                                                        title:name,
                                                                        Book_std:std,
                                                                        Book_no:name+no,
                                                                        upload_time:time,
                                                                        upload_date:date + '-' + month + '-' + year,
                                                                        Book_des:des,
                                                                        access_token:url,
                                                                        uid:navigation.getParam('uid'),
                                                                        owner:navigation.getParam('data').owner,
                                                                        owner_email:navigation.getParam('data').email,
                                                                        owner_token:navigation.getParam('data').owner_token,
                                                                        owner_profession:navigation.getParam('data').profession
                                                                        
                                                                    })
                                                                    .then(()=>{
                                                                        //navigation.navigate('Home',{key:navigation.getParam('uid')})
                                                                        setName('')
                                                                        setPhoto('')
                                                                        setStd('')
                                                                        setDes('')
                                                                        setVisible(false)
                                                                        showToast('Post Successfully!')
                                                                        
                                                                    
                                                                    })
                                                    
                                                    })
                                         })
            
           
                 })

        }
        else{
            setName('')
            setStd('')
            setDes('')
            setPhoto('')
            setVisible(false)
            showToast('Fill all Detail')
            
        }
     
    }
 

 


    return (
        <View style={{flex:1}}>
             <StatusBar />
           <ImageBackground source={require('./assets/bg.jpg')} style={styles.image}>
                <Card containerStyle={styles.mainCard}>
                            <Text style={styles.text}>Gallery</Text>
                            <TouchableOpacity style={{borderRadius:0,alignSelf:"center",marginTop:heightToDp('7')}} onPress={handleChoosePhoto}>
                                {photo ? <Image source={{ uri: photo }} style={{ width: widthToDp('85'), height: heightToDp('19') ,borderRadius:5,alignSelf:"center"}}/> 
                                : <Image source={require('../screens/assets/add1.png')} style={{ width: widthToDp('52'), height: heightToDp('20') ,borderRadius:0,alignSelf:"center"}}/> }
                            </TouchableOpacity>
                            <Text style={{fontSize:widthToDp('4.5'),alignSelf:"center",color:"blue",marginTop:heightToDp('3')}}>Tab on the image to Add picture</Text>
                            <TextInput placeholder="Book Name" value={name} autoCapitalize='none' onChangeText={setName} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('5'),marginHorizontal:widthToDp('2'),height:heightToDp('5.5')}}/>
                            <TextInput placeholder="Book Standard" value={std} autoCapitalize='none' onChangeText={setStd} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1'),marginHorizontal:widthToDp('2'),height:heightToDp('5.5')}}/>
                            <TextInput placeholder="Book Description" value={des} autoCapitalize='none' onChangeText={setDes} multiline={true} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1'),marginHorizontal:widthToDp('2'),height:heightToDp('10.5')}}/>
                            
                            <TouchableOpacity onPress={onSubmit}>
                                    <Card containerStyle={styles.container1}>
                                        <Text style={{color:"white",fontSize:widthToDp('3.4')}}>submit</Text>
                                    </Card>
                            </TouchableOpacity>
                            
                    </Card>
            </ImageBackground>

            <Modal transparent={true} visible={visible} animationType="fade">
                                    <StatusBar  barStyle="dark-content" backgroundColor="#000000aa"/>
                                    <View style={{backgroundColor:"#000000aa", flex:1,justifyContent:"center"}}>
                                             <ActivityIndicator animating={true} color={"orange"} size="small"/>
                                             <Text style={{alignSelf:"center",fontSize:widthToDp('5'),color:"white"}}>Please Wait! Uploading...</Text>
                                    </View>
            </Modal>

        </View>
    );
}


TrackCreateScreen.navigationOptions={
    headerShown:null,
    
}

const styles=StyleSheet.create({
    mainCard:{
        height:heightToDp('96'),
        opacity:0.8,
        shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.00,
          borderRadius:15,
          elevation: 24,
          borderWidth:0,
          //justifyContent:"flex-end"

    },
    container1:{
        alignItems:"center",
        //marginHorizontal:20,
        //marginTop:15,
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
        marginTop:heightToDp('7'),
        height:heightToDp('5.7'),   
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
    text:{
    alignSelf:"center",
    fontSize:widthToDp('10'),
    fontFamily:"SpecialElite-Regular"

    }

})


export default TrackCreateScreen;


