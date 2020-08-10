import React ,{useContext,useState,Component} from 'react';
import {StyleSheet,View,ProgressBarAndroid,ImageBackground,StatusBar,ActivityIndicator,ScrollView} from 'react-native';
import {Text,Image,Card} from 'react-native-elements'
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import EditForm from '../components/EditForm';
import NavLink from  '../components/NavLink';
import ResolveAuthScreen from '../screens/ResolveAuthScreen';
import { YellowBox } from 'react-native';


import firebase from 'firebase';



class EditScreen extends Component{
    state= { email:'' ,password:'',err:'',loader:false};
  

    uploadImage = async (uri, uid) => {
        YellowBox.ignoreWarnings(['Setting a timer']);
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child("images/" + uid);
        return ref.put(blob);
    }



    onButtonPress(fullname,email,age,pin,password,photo,profession,confirmpassword){
        this.setState({loader:true,err:''})
        if(fullname && email && age && pin && password && profession && confirmpassword && photo){
            if(password==confirmpassword)
            {
                if(password.length>=6)
                {
                    
                    this.uploadImage(photo, "Post/"+ this.props.navigation.getParam('data').email + "/" + "profile_image")
                    .then(()=>{
                                        const ref=firebase.storage().ref("images/Post/"+ this.props.navigation.getParam('data').email + "/" + "profile_image");
                                        ref.getDownloadURL() 
                                        .then((url)=>{
                                                    
                                                                firebase.database().ref('users/' +this.props.navigation.getParam('data').uid).set({
                                                                    owner:fullname,
                                                                    email:email,
                                                                    uid:this.props.navigation.getParam('data').uid,
                                                                    age:age,
                                                                    pin:pin,
                                                                    password:password,
                                                                    owner_token:url,
                                                                    profession:profession,
                                                                    posts:this.props.navigation.getParam('data').posts
                                                                })
                                                                .then(()=>{
                                                                    this.setState({err:"Save Content",loader:false})
                                                                    
                                                                    
                                                                })
                                            
                                                      })
                                             
                                        })

                                               
                    
                   
    
                }
                else{
                    this.setState({err:"password must be greater than 6 ",loader:false})
                }
               
            }
            else{
                this.setState({err:"password and Confirm password are not same",loader:false})
            }
         

        }
        else{
            
            this.setState({err:"Fill all Fields",loader:false})
        }
        
       }

       renderItem(){
            if(this.state.loader){
                return <ActivityIndicator size="large"/>
            }
            else{
                return <Text style={{fontSize:20,color:"red",alignSelf:"center"}}>{this.state.err}</Text>
            }
       }




    render(){
      return (
        <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />

        
        <ImageBackground source={require('./assets/BOOK5.jpg')} style={styles.image}>
         <Card containerStyle={styles.card}>
         
             <EditForm
                    data={this.props.navigation.getParam('data')}
                    urlImg={this.props.navigation.getParam('urlImg')}
                    headerText="Edit Your Account Detail"
                    submitButtonText="Save"
                    onSubmit={({fullname,email,age,pin,password,photo,profession,confirmpassword}) =>{this.onButtonPress(fullname,email,age,pin,password,photo,profession,confirmpassword)}}
             />
            <View>
                     {this.renderItem()}
            </View>

             </Card>
             </ImageBackground>
             
         </View>
      )
    }
}

EditScreen.navigationOptions=()=>{
    return {
        headerShown:null
    };
};

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    token1:{
        marginLeft:10,
        fontSize:25,
        color:"blue"
    },
    card:{
        marginBottom:0,
        height:850,
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
        opacity:0.9,
      

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
  


});
export default EditScreen;