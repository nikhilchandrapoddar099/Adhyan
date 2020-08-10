import React ,{Component} from 'react';
import {StyleSheet,View,ImageBackground,StatusBar,ActivityIndicator,ToastAndroid,Modal} from 'react-native';
import {Text,Card} from 'react-native-elements'
import SignupForm from '../components/SignupForm';
import { YellowBox } from 'react-native';
import {widthToDp,heightToDp} from '../Responsive';


import firebase from 'firebase';

class SignupScreen extends Component{
    state= { email:'' ,password:'',visible:false};
  
    uploadImage = async (uri, udi) => {
        YellowBox.ignoreWarnings(['Setting a timer']);
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child("images/" + udi);
        return ref.put(blob);
    }

    showToast(msg){
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      };




    onButtonPress(fullname,email,age,pin,password,photo,profession,confirmpassword){
        this.setState({visible:true})
        if(fullname && email && age && pin && password && profession && confirmpassword && photo){
            if(password==confirmpassword)
            {
                if(password.length>=6)
                {

                    this.uploadImage(photo, "Post/"+email+ "/" + "profile_image")
                    .then(()=>{
                                        const ref=firebase.storage().ref("images/Post/"+ email + "/" + "profile_image");
                                        ref.getDownloadURL() 
                                        .then((url)=>{
                                                    firebase.auth().createUserWithEmailAndPassword(email,password)
                                                    .then((data)=>{
                                                                firebase.database().ref('users/' +data.user.uid).set({
                                                                    owner:fullname,
                                                                    email:email,
                                                                    uid:data.user.uid,
                                                                    age:age,
                                                                    pin:pin,
                                                                    password:password,
                                                                    owner_token:url,
                                                                    profession:profession,
                                                                })
                                                                .then(()=>{
                                                                this.setState({visible:false})
                                                                this.showToast("Sucessfully Account Created")

                                                                })
                                            
                                                      })
                                             
                                        })

                                               
                    
                   
                    })
                    .catch(() =>{
                        this.setState({visible:false})
                        this.showToast("Already Account Exist")
                    });

                }
                else{
                    this.setState({visible:false})
                    this.showToast("password must be greater than 6")
                    
                }
               
            }
            else{
                this.setState({visible:false})
                this.showToast("password and Confirm password are not same")
            }
         

        }
        else{
            
            this.setState({visible:false})
            this.showToast("Fill all Fields")
        }
        
       }

     

    render(){
      return (
        <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />

        <ImageBackground source={require('./assets/Art2.png')} style={styles.image}>
         <Card containerStyle={styles.card}>
         
             <SignupForm
             headerText="Sign Up With Email"
             submitButtonText="Create An Account"
             onSubmit={({fullname,email,age,pin,password,photo,profession,confirmpassword}) =>{this.onButtonPress(fullname,email,age,pin,password,photo,profession,confirmpassword)}}
             />
        
             </Card>
             </ImageBackground>
             <Modal transparent={true} visible={this.state.visible} animationType="fade">
                                    <StatusBar  barStyle="dark-content" backgroundColor="#000000aa"/>
                                    <View style={{backgroundColor:"#000000aa", flex:1,justifyContent:"center"}}>
                                          <ActivityIndicator size="large"/>
                                          <Text style={{alignSelf:"center",fontSize:widthToDp('5'),color:"white"}}>Please Wait! Uploading...</Text>
                                    </View>
              </Modal>
             
         </View>
      )
    }
}

SignupScreen.navigationOptions=()=>{
    return {
        headerShown:null
    };
};

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
  
    card:{
        height:heightToDp('96'),
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
        opacity:0.9,
      

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
  


});
export default SignupScreen;