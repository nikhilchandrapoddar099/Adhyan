
import React  from 'react';
import {StyleSheet, View, Image,TouchableOpacity, FlatList,Dimensions} from 'react-native';
import {Text,Card,Avatar} from 'react-native-elements';
import {widthToDp,heightToDp} from '../Responsive'
import FastImage from 'react-native-fast-image';

const TrackForm=({posts, data, uid, navigation})=>{
    const array = Object.values( posts );

    const renderTime=(item)=>{
        var mon=['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var full=date.toString() + '-' + month.toString() + '-' + year.toString();
        var x=item.upload_date.split('-')

        
        if(full.toString() == item.upload_date){
            return <Text style={{color:"#515A5A",fontSize:12,marginLeft:5,alignSelf:"center"}}>{"Today "+item.upload_time}</Text>
        }
        else{
            if(year==x[2]){
                if(month==x[1]){
                    var d=Number(date)-Number(x[0])
                    if(d==1){
                        return <Text style={{color:"#515A5A",fontSize:12,marginLeft:5}}>{"Yesterday"}</Text>  
                    }
                    else{
                    return <Text style={{color:"#515A5A",fontSize:12,marginLeft:5}}>{""+x[0]+" "+mon[Number(month)-1]}</Text>  
                    }

                }
                else{
                    var m=Number(month)-Number(x[1])
                    return <Text style={{color:"#515A5A",fontSize:12,marginLeft:5}}>{x[0]+" "+mon[x[1]-1]}</Text>     
                }
               
            }
            else{
                var y=Number(year)-Number(x[2])
                return <Text style={{color:"#515A5A",fontSize:12,marginLeft:5}}>{""+y+" "+ "year ago"}</Text>
            }
            
        }
    
}
      

   
    return <FlatList
                    data={array}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item} ) => <View>
                                                                        <TouchableOpacity onPress={()=>{ navigation.navigate('Post', {item:item,uid:uid,data:data})}}>
                                                                                <Card containerStyle={styles.cards1}>
                                                                                        <View style={{flexDirection:"row",padding:3,alignItems:"center",marginLeft:5}}>
                                                                                            <Avatar rounded source={{uri:item.owner_token}} />
                                                                                            <View>
                                                                                                <Text style={{marginLeft:15,fontFamily:"ConcertOne-Regular",fontSize:18}}>{item.owner}</Text>
                                                                                                <View style={{flexDirection:"row"}}>
                                                                                                    <FastImage source={require('../screens/assets/teacher.png')} style={{width:15,height:15,marginLeft:15}}/>
                                                                                                    <Text style={{marginLeft:10,fontSize:12,padding:0,color:"#515A5A"}}>{item.owner_profession}</Text>
                                                                                                <FastImage source={require('../screens/assets/calendar.png')} style={{width:15,height:15,marginLeft:30}}/>
                                                                                                    {renderTime(item)}
                                                                                                </View>
                                                                                            </View>
                                                                                       
                                                                                        </View>
                                                                                </Card>

                                                                        
                                                                        <FastImage style={{flex:1,height:160,margin:0,padding:0,marginTop:3,marginBottom:0,width:Dimensions.get('window').width}} source={{ uri: item.access_token,priority: FastImage.priority.high}} />
                                                                        <Text style={{color:"white",fontSize:20, alignSelf:"center", position:"absolute",marginTop:80}}>{item.title}</Text>
                                                                        <Text style={{color:"white",fontSize:15,alignSelf:"center",position:"absolute",marginTop:105}}>{item.Book_std}</Text>
                                                                        
                                                                        
                                                                        <Card containerStyle={styles.cards}>
                                                                            <View style={{flexDirection:"row",height:50}}>
                                                                                <Text style={{fontSize:14,alignSelf:"center",marginTop:5}}>{(item.Book_des).substring(0,155)}</Text>
                                                                            </View>
                                                                        </Card>
                                                
                                                                        </TouchableOpacity>
                                                                        
                                                    
                                                          </View>
                                        }
                            keyExtractor={(item) => item.key}
                                      
                              />

}
const styles=StyleSheet.create({
    cards1:{
        //alignItems:"center",
        //position:"absolute",
        marginTop:10,
        padding:0,
        margin:0,
        //backgroundColor:"#3b5998",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        //opacity:0.6,
        elevation: 24,
        borderWidth:0,
        //justifyContent:"flex-start"
        width:Dimensions.get('window').width,
        //alignSelf:"center",

        //flexDirection:""
  
    },
    cards:{
        //alignItems:"center",
        //position:"absolute",
        marginTop:0,
        padding:10,
        paddingBottom:20,
        margin:0,
        //backgroundColor:"#3b5998",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.18,
        shadowRadius: 16.00,
        //opacity:0.6,
        elevation: 5,
        borderWidth:0,
        //justifyContent:"flex-start"
        width:Dimensions.get('window').width,
        //alignSelf:"center",
      
        //flexDirection:""
    },
    
    
    
})

export default TrackForm;
