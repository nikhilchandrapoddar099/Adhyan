import React, { Children } from 'react';
import {View,StyleSheet} from 'react-native';


const Spacer=({Children})=>{
return <View style={style1.space}>{Children}</View>
}


const style1=StyleSheet.create({
    space:{
        margin:10,
    }

});

export default Spacer;