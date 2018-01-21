import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import {white,purple,grey} from '../utils/colors';
export default function UdaciSteppers({ value, max, unit, step, onIncrement, onDecrement }) {
    return (
        <View style={styles.row}>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onDecrement}>
                    <FontAwesome name='minus' size={30} color={'white'}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={onIncrement}>
                    <FontAwesome name='plus' size={30} color={'white'}/>
                </TouchableOpacity>
            </View>
            <View style={styles.units}>
                <Text style={{fontSize:24,textAlign:'center'}}>{value}</Text>
                <Text style={{fontSize:18,color:grey}} >{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    button:{
        backgroundColor:purple,
        padding:10,
        marginLeft:10
    },
    buttons:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-start'
    },
    units:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:85
    }
})