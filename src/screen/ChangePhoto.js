
import React ,{useState}from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ToastAndroid} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Avatar } from 'react-native-paper';
import {widthToDp,heightToDp} from '../Responsive';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import { ActivityIndicator} from 'react-native-paper';


const ChangePhoto=({navigation})=>{
    const [photo,setPhoto]=useState(navigation.getParam('data').owner_token)
    const [show,setShow]=useState(false)

    const handleChoosePhoto = () => {
        const options = {noData: true}
            ImagePicker.launchImageLibrary(options, response => {
                if (response.uri) {
                        setPhoto(response.uri)
                }
            })
    
         }
         
         const renderIndicator=()=>{
            if(show){
               return  <>
               <ActivityIndicator animating={true} color={"orange"} size="small"/>
               <Text style={{alignSelf:"center",fontSize:widthToDp('5'),color:"white"}}>Please Wait! Uploading...</Text>
               </>
            }
            else{
                return <>
                <View style={{flexDirection:"row",justifyContent:"space-around",padding:widthToDp('0')}}>
                        <TouchableOpacity onPress={()=>{handleChoosePhoto()}}>
                            <FastImage source={require('./assets/pencil.png')} style={{width:widthToDp(6),height:heightToDp('3')}}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{onSubmit()}}>
                            <FastImage source={require('./assets/photography.png')} style={{width:widthToDp(6),height:heightToDp('3')}}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{deleted()}}>
                            <FastImage source={require('./assets/trash.png')} style={{width:widthToDp(6),height:heightToDp('3')}}/>
                        </TouchableOpacity>
                </View>

                </>
            }
        }

    const uploadImage = async (uri, udi) => {
            const response = await fetch(uri);
            const blob = await response.blob();
    
            var ref = firebase.storage().ref().child("images/" +udi);
            return ref.put(blob);
        }

    const hideIndicator = () => setShow(false);
    const showIndicator = () => setShow(true);


    const onSubmit=()=>{
                showIndicator()
                uploadImage(photo, "Post/"+navigation.getParam('data').email+ "/" + "profile_image")
                .then(()=>{
                            const ref=firebase.storage().ref("images/Post/"+ navigation.getParam('data').email + "/" + "profile_image");
                            ref.getDownloadURL()
                            .then((url)=>{
                                            firebase.database().ref('users/' +navigation.getParam('data').uid).update({
                                                owner_token:url
                                            })
                                            .then(()=>{
                                                hideIndicator()
                                                ToastAndroid.show("Successfully Updated", ToastAndroid.SHORT);
                                            })

                            })
                })
    }

    const deleted=()=>{
        showIndicator()
        firebase.database().ref('users/' +navigation.getParam('data').uid).update({
            owner_token:''
        })
        .then(()=>{
            hideIndicator()
            setPhoto('')
            ToastAndroid.show("Successfully Updated", ToastAndroid.SHORT);
        })

    }

    const image=()=>{
        if(photo){
            return <Avatar.Image size={widthToDp('98')} source={{uri:photo}} />
        }
        else{
            return <Avatar.Image size={widthToDp('98')} source={require('./assets/A.jpg')} />
        }
    }


    return (
        <View style={{backgroundColor:"black", flex:1}}>
        
              <TouchableOpacity  style={{marginTop:heightToDp('30'),alignSelf:"center",marginBottom:heightToDp('20')}} onPress={()=>{}}>
                  {image()}
              </TouchableOpacity>
        
        {renderIndicator()}
      

  </View>
    )
}

const styles=StyleSheet.create({

})

export default ChangePhoto;