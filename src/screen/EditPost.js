import React ,{useState} from 'react';
import {StyleSheet, View,Image, ImageBackground,  YellowBox, StatusBar,TouchableOpacity,TextInput,ToastAndroid,Modal} from 'react-native';
import {Text,Card} from 'react-native-elements';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import {widthToDp,heightToDp} from '../Responsive';
import { ActivityIndicator} from 'react-native-paper';



const EditPost=({navigation})=>{
    const [name, setName]=useState(navigation.getParam('item').title);
    const [std, setStd]=useState(navigation.getParam('item').Book_std);
    const [des, setDes]=useState(navigation.getParam('item').Book_des);
    const [photo,setPhoto]=useState(navigation.getParam('item').access_token);
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

        setVisible(true)
        if(name && des && photo && std){

            uploadImage(photo, "Post/"+ navigation.getParam('data').email + "/" + navigation.getParam('item').Book_no)
            .then(()=>{  
                
                            const ref=firebase.storage().ref("images/Post/"+ navigation.getParam('email')+"/" + navigation.getParam('item').Book_no);
                            ref.getDownloadURL()
                            .then((url)=>{
                                                    firebase.database().ref('users/' + navigation.getParam('uid') + "/"+ "posts"+"/"+ navigation.getParam('item').Book_no).update({
                                                        title:name,
                                                        Book_no:navigation.getParam('item').Book_no,
                                                        Book_std:std,
                                                        Book_des:des,
                                                        access_token:url,
                                                        uid:navigation.getParam('uid'),
                                                        owner:navigation.getParam('data').owner,
                                                        owner_email:navigation.getParam('data').email,
                                                        owner_token:navigation.getParam('data').owner_token
                                                        
                                                    })
                                                    .then(()=>{
                                                                    firebase.database().ref('public_post_detail/' + navigation.getParam('pin') + "/"+ navigation.getParam('uid') + "/"+navigation.getParam('item').Book_no).update({
                                                                        title:name,
                                                                        Book_no:navigation.getParam('item').Book_no,
                                                                        Book_std:std,
                                                                        Book_des:des,
                                                                        access_token:url,
                                                                        uid:navigation.getParam('uid'),
                                                                        owner:navigation.getParam('data').owner,
                                                                        owner_email:navigation.getParam('data').email,
                                                                        owner_token:navigation.getParam('data').owner_token
                                                                        
                                                                    })
                                                                    .then(()=>{
                                                                        //navigation.navigate('Home',{key:navigation.getParam('uid')})
                                                                        setPhoto(url)
                                                                        setName(name)
                                                                        setStd(std)
                                                                        setDes(des)
                                                                        setVisible(false)
                                                                        showToast('Edit Saved')
                                                                        
                                                                    
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
            showToast('Fill all Detail')
            setVisible(false)
        }
     
    }

    const deleted=()=>{
        setVisible(true)
        const userRef = firebase.database().ref('users/' + navigation.getParam('uid') + "/"+ "posts"+"/"+ navigation.getParam('item').Book_no);
        userRef.remove()
        .then(()=>{
            const userRef =firebase.database().ref('public_post_detail/' + navigation.getParam('pin') + "/"+  navigation.getParam('uid') + "/"+navigation.getParam('item').Book_no);
            userRef.remove()
            .then(()=>{
                        setName('')
                        setStd('')
                        setDes('')
                        setPhoto('')
                        showToast('Post Deleted Successfully!')
                        setVisible(false)
            })

        })

       
    }


 


    return (
        <View style={{flex:1}}>
             <StatusBar />
           <ImageBackground source={require('./assets/bg.jpg')} style={styles.image}>
            
           
                    <Card containerStyle={styles.mainCard}>
                            <Text style={styles.text}>Edit Your Post</Text>
                            <TouchableOpacity style={{ borderRadius:0,alignSelf:"center",marginTop:heightToDp('7')}} onPress={handleChoosePhoto}>
                                        {photo ? <Image source={{ uri: photo }} style={{ width: widthToDp('85'), height: heightToDp('19') ,borderRadius:5,alignSelf:"center"}}/> 
                                        : null }
                            </TouchableOpacity>

                            <Text style={{fontSize:widthToDp('4.5'),alignSelf:"center",color:"blue",marginTop:heightToDp('3')}}>Tab on the image to Edit picture</Text>
                            <TextInput placeholder="Book Name" value={name} autoCapitalize='none' onChangeText={setName} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('5'),marginHorizontal:widthToDp('2'),height:heightToDp('5.5')}}/>
                            <TextInput placeholder="Book Standard" value={std} autoCapitalize='none' onChangeText={setStd} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1'),marginHorizontal:widthToDp('2'),height:heightToDp('5.5')}}/>
                            <TextInput placeholder="Book Description" value={des} autoCapitalize='none' onChangeText={setDes} multiline={true} style={{backgroundColor:"#EDF1F1",marginTop:heightToDp('1'),marginHorizontal:widthToDp('2'),height:heightToDp('10.5')}}/>
                                
                            <View style={{marginTop:heightToDp('4')}}>
                                    <TouchableOpacity onPress={onSubmit}>
                                        <Card containerStyle={styles.container1}>
                                            <Text style={{color:"white",fontSize:widthToDp('3.4')}}>submit</Text>

                                        </Card>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={()=>{deleted()}}>
                                        <Card containerStyle={styles.container2}>
                                            <Text style={{color:"white",fontSize:widthToDp('3.4')}}>Delete</Text>
                                        </Card>
                                    </TouchableOpacity>
                            </View>    
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


EditPost.navigationOptions={
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
          
          //justifyContent:"flex-start"

    },
    container1:{
        alignItems:"center",
        backgroundColor:"orange",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderWidth:0,   
        height:heightToDp('5.7'),    
    },
    container2:{
        alignItems:"center",
        backgroundColor:"#DB4437",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderWidth:0, 
        height:heightToDp('5.7'),          
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
    text:{
    alignSelf:"center",
    fontSize:widthToDp('8'),
    fontFamily:"SpecialElite-Regular"

    }

})


export default EditPost;


