import React,{Component} from 'react';
import {Text,StyleSheet,View,StatusBar,ImageBackground,ActivityIndicator,ToastAndroid,Modal} from 'react-native';
import {Card} from 'react-native-elements';
import SigninForm from '../components/SigninForm';
import firebase from 'firebase';
import {widthToDp,heightToDp} from '../Responsive';

class  SigninScreen extends Component{
   state={email:'',password:'',visible:false}


   showToast(msg){
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };


    onButtonPress(email,password){
        this.setState({visible:true})

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((data)=>{
            this.showToast('Successfully Login');
            this.props.navigation.navigate('Track',{key:data.user.uid})
        })
        .catch(() =>{
                this.setState({visible:false});
                this.showToast("Incorrect Email or password");
            });
    }

render(){
 
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground source={require('./assets/Art2.png')} style={styles.image}>
          
                <Card containerStyle={styles.card}>
                    <SigninForm
                    navigation={this.props.navigation}
                    headerText="Sign In To Your Account"
                    onSubmit={({email,password})=>{this.onButtonPress(email,password)}}
                    submitButtonText="Sign In"
                    />
                </Card>
            </ImageBackground>
            <Modal transparent={true} visible={this.state.visible} animationType="fade">
                                    <StatusBar  barStyle="dark-content" backgroundColor="#000000aa"/>
                                    <View style={{backgroundColor:"#000000aa", flex:1,justifyContent:"center"}}>
                                          <ActivityIndicator size="large"/>
                                    </View>
            </Modal>
        </View>

    );
    }
}

SigninScreen.navigationOptions={
    headerShown:null

};

const styles=StyleSheet.create({
    container:{
        flex:1,
        //marginBottom:290,
        backgroundColor:"#ECF0F1"
    },
    card:{
        height:heightToDp('85'),
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
        opacity:0.8,

    },
    image: {
        flex: 1,
        justifyContent: "center",
        resizeMode:"cover"
      },

});
export default SigninScreen