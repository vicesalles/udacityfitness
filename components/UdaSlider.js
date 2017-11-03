import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import {grey} from '../utils/colors'

export default function UdaSlider({max,unit,step,value,onChange}) {
    return (
        <View style={{flexDirection:'row',flex:1}}>
            <Slider
            step={step}
            value={value}
            maximumValue={max}
            minimumValue={0}
            onValueChange={onChange}
            style={{flex:1}}
            />
            <View style={{flex:1}}>
                <Text style={{fontSize:24, textAlign:'center'}} >{value}</Text>
                <Text style={{fontSize:18, textAlign:'center'}} >{unit}</Text>
            </View>
        </View>
    )
}