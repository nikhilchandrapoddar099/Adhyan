
import React ,{useEffect,useState,useContext} from 'react';
import {View,StatusBar,Image,TouchableOpacity,FlatList,StyleSheet,Modal,ToastAndroid} from 'react-native';
import {Card,Text} from 'react-native-elements';
import { database } from 'firebase';
import {Context as AuthContext} from '../context/AuthContext';
import { YellowBox } from 'react-native';
import {widthToDp,heightToDp} from '../Responsive';
import { Avatar } from 'react-native-paper';

const MsgScreen=({navigation})=>{
    const {state}=useContext(AuthContext);
    const [post, setPost]=useState('');
    const [visible, setVisible] = useState(false);
    const [item,setItem] =useState('')
    const [data,setData] =useState('')
    useEffect(()=>{
        YellowBox.ignoreWarnings(['VirtualizedLists']);

        database().ref("users/"+ state.key).on("value",datasnap=>{
            if(data.length!=datasnap.val()){
                setData(datasnap.val())
            }

         database().ref("messages/" + state.key).on("value",datasnap=>{
                var returnArray = []
                    datasnap.forEach(function(snap) {
                                let x=Object.values(snap.val())
                                let item=x[x.length -1];
                                returnArray.push(item);
                            
                            
                    });
                    if(post.length!=returnArray.length){
                        setPost(returnArray)  
                    }
              
                    
                
        })

    })
     

    },[post])


    const renderTime=(item)=>{
        var mon=['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var full=date.toString() + '-' + month.toString() + '-' + year.toString();
        var x=item.date.split('-')

        
        if(full.toString() == item.date){
            return <Text style={{color:"#515A5A",fontSize:widthToDp('3.2'),margin:0,marginLeft:widthToDp('5')}}>{" .  "+item.time}</Text>
        }
        else{
            if(year==x[2]){
                if(month==x[1]){
                    var d=Number(date)-Number(x[0])
                    if(d==1){
                        return <Text style={{color:"#515A5A",fontSize:widthToDp('3.2'),margin:0,marginLeft:widthToDp('5')}}>{" .  " + "Yesterday"}</Text>  
                    }
                    else{
                    return <Text style={{color:"#515A5A",fontSize:widthToDp('3.2'),margin:0,marginLeft:widthToDp('5')}}>{" .  "+mon[d+1]}</Text>  
                    }

                }
                else{
                    var m=Number(month)-Number(x[1])
                    return <Text style={{color:"#515A5A",fontSize:widthToDp('3.2'),margin:0,marginLeft:widthToDp('5')}}>{" .  "+m +" "+ "month ago"}</Text>     
                }
               
            }
            else{
                var y=Number(year)-Number(x[2])
                return <Text style={{color:"#515A5A",fontSize:widthToDp('3.2'),margin:0,marginLeft:widthToDp('5')}}>{" .  "+y+" "+ "year ago"}</Text>
            }
            
        }
    
}

   
      
    const renderName=(item)=>{
         
            if(item.Me_Msg){
                return <Text style={{color:"black",fontSize:widthToDp('4'),padding:widthToDp('0.6'),marginLeft:widthToDp('4'),fontWeight:"900"}}>{item.items.owner}</Text>
            }
    
            
            else{

                if(item.seen){
                    return  <Text style={{color:"black",fontSize:widthToDp('4'),padding:widthToDp('0.6'),marginLeft:widthToDp('4'),fontWeight:"bold"}}>{item.items.owner}</Text>
                 
    
                }
                else{
                    return  <Text style={{color:"black",fontSize:widthToDp('4'),padding:widthToDp('0.6'),marginLeft:widthToDp('4'),fontWeight:"900"}}>{item.items.owner}</Text>
                }
    
            }
        }


    const renderMsg=(item)=>{
            if(item.Me_Msg){
                var x=item.Me_Msg
                if(item.seen==false){
                    return <View style={{flexDirection:"row"}}>
                           
                          <Text style={{color:"#515A5A",fontSize:widthToDp('3.2'),margin:0,marginLeft:widthToDp('5')}}>{"You: "+x.substring(0,20)+"."}</Text>
                          <Image source={{ uri:item.items.owner_token}} style={{height:heightToDp('1.5'),width:widthToDp(3),borderRadius:15,alignSelf:"center",marginLeft:widthToDp('1')}}/>
                    </View>
                }
                else{
                    return <Text style={{color:"#515A5A",fontSize:widthToDp('3.2'),marginLeft:widthToDp('5'),margin:0}}>{"You: "+x.substring(0,25)}</Text>
                }
               
    
            }
            else{
                var x=item.User_Msg
                if(item.seen){
                    return <View style={{flexDirection:'row',alignItems:"center"}}>
                                <View style={{height:10,width:10,backgroundColor:"#0076FE",borderRadius:9,marginLeft:widthToDp('5')}}>
                                </View>
                                <Text style={{fontSize:widthToDp('3.2'),marginLeft:widthToDp('1.5'),fontWeight:"bold"}}>{x.substring(0,25)}</Text>
                            </View>
      
                }
                else{
                    return <View style={{flexDirection:"row"}}>
                         <Text style={{color:"#515A5A",fontSize:widthToDp('3.2'),marginLeft:widthToDp('5'),margin:0}}>{x.substring(0,25)}</Text>
                         <Image source={{ uri:item.data.owner_token}} style={{height:heightToDp('1.5'),width:widthToDp(3),borderRadius:15,alignSelf:"center",marginLeft:widthToDp('1.5')}}/>
                    </View>
    
                }
    
            }
        }
        const yes=(item)=>{
            if(item.User_Msg){
                                database().ref("messages/"+item.data.uid+"/"+item.items.uid+"/"+item.ref).update({
                                    seen:false
                                })
            
                                database().ref("messages/"+item.items.uid+"/"+item.data.uid+"/"+item.ref1).on("value",datasnap=>{
                                        if(datasnap.val()){
                                            database().ref("messages/"+item.items.uid+"/"+item.data.uid+"/"+item.ref1).update({
                                                seen:false
                                            })
                                        }
                                })
           
                             }
    
                         }


    const renderProfile=(item)=>{
             
            return  <>
               <TouchableOpacity onPress={()=>{yes(item), navigation.navigate('Chat', {data:item.data, item:item.items})}} onLongPress={()=>{long(item)}}>
                        <View style={{flexDirection:"row",margin:widthToDp('2'),padding:widthToDp('0.5'),borderRadius:10,marginTop:1}}>
                                <Avatar.Image size={widthToDp('13.5')} source={{uri:item.items.owner_token}} />
                                <View>
                                        {renderName(item)}
                                        <View style={{flexDirection:"row"}}>
                                                
                                                {renderMsg(item)}
                                                {renderTime(item)}
                                               
                                                
                                        </View>
                                </View>
                        </View>
                </TouchableOpacity>

                          </>
    }

    const long=(item)=>{
        setItem(item.items)
        setData(item.data)
        setVisible(true)
        
        
    }


    const deleted=()=>{
        const userRef=database().ref("messages/"+data.uid+"/"+item.uid);
            userRef.remove()
            ToastAndroid.show("Msg Removed", ToastAndroid.SHORT);
        

    }

    

 


 

    
    return (
        <View style={{flex:1}}>
              <StatusBar  barStyle="dark-content"/>
              {data? <>
                <View style={{flexDirection:"row",margin:widthToDp('1.5'),padding:0,borderRadius:10,marginVertical:heightToDp('4.3'),alignItems:"center"}}>
                    <View style={{paddingLeft:8}}>
                            <Avatar.Image size={widthToDp('9.5')} source={{uri:data.owner_token}} />
                    </View>
                    <Text style={{color:"black",fontFamily:"ConcertOne-Regular",fontSize:widthToDp('8'),padding:widthToDp('3'),marginLeft:widthToDp('3')}}>Chats</Text>
                </View>
                </>
            :null

        }
              
           {post? <>
           
            <FlatList
                        data={post}
                        renderItem={({ item }) => <>
                                                    {renderProfile(item)}
                                                </>
                        }
                        keyExtractor={(item) => item.key}

                       
            />
            </>
              : null
            }
            
         
            <View style={{marginTop:heightToDp('54'),position:"absolute",alignSelf:"center"}}>
                <Image source={require('./assets/fly.png')} style={{height:heightToDp('12'),width:widthToDp('25'),alignSelf:"center"}}/>
                 <Text style={{fontSize:widthToDp('4.5'),marginTop:heightToDp('0'),alignSelf:"center"}}>Adhyan ChatBox</Text>
                 <Text style={{fontSize:widthToDp('3'),alignSelf:"center"}}>Start a chat</Text>
           </View>

           <Modal transparent={true} visible={visible} animationType="fade">
                                    <StatusBar  barStyle="dark-content" backgroundColor="#000000aa"/>
                                    <View style={{backgroundColor:"#000000aa", flex:1,justifyContent:"flex-end",margin:0,padding:0}}>
                                        <Card containerstyle={styles.card1}>
                                            <View style={{flexDirection:"row"}}>
                                                <Avatar.Image size={widthToDp('14')} source={{uri:item.owner_token}} />
                                                <View style={{marginLeft:20}}>
                                                    <Text style={{fontSize:widthToDp('4'),fontWeight:"bold"}}>Delete message</Text>
                                                    <Text style={{fontSize:widthToDp('3.3'),color:"#A6ACAF"}}>Are you sure want to remove this chat?</Text>
                                                </View>
                                            </View>

                                               <View style={{flexDirection:"row",marginTop:0,alignSelf:"flex-end"}}>
                                                        <TouchableOpacity  style={{marginTop:0}} onPress={()=>{setVisible(false)}}>
                                                            <Card containerStyle={styles.container4}>
                                                                    <Text style={{color:"black",fontSize:widthToDp('3.4')}} >No</Text>
                                                            </Card>
                                                            
                                                        </TouchableOpacity>

                                                        <TouchableOpacity  style={{marginTop:0}} onPress={()=>{deleted(item),setVisible(false)}}>
                                                            <Card containerStyle={styles.container5}>
                                                                    <Text style={{color:"white",fontSize:widthToDp('3.4')}} >Yes</Text>
                                                            </Card>
                                                            
                                                        </TouchableOpacity>
                                                </View>       
                                        </Card>
                                    </View>
                    </Modal>
          
           

        </View>

    );
}

const styles=StyleSheet.create({
    card1:{
        margin:0,
        padding:0,
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
          alignSelf:"center",
          //width:widthToDp('80')

    },
    container4:{
        alignItems:"center",
       // marginTop:35,
       //marginLeft:0,
        backgroundColor:"white",
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
        height:heightToDp('4.9'),
        width:widthToDp('28')
    },
    container5:{
        alignItems:"center",
        //marginTop:35,
       // marginTop:400,
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
        height:heightToDp('4.9'),
        width:widthToDp('28')
        
    },
  
})

export default MsgScreen;