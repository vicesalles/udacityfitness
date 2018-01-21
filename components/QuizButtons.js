import React,{Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,StyleSheet ,TouchableHighlight} from 'react-native';
import * a c from '../../utils/colors';

class QuizButtons extends Component{
    render(){
        return(
            <View>
                <TouchableHighlight style={styles.button,styles.true}><Text>TRUE</Text></TouchableHighlight>
                <TouchableHighlight style={styles.button,styles.false} ><Text>FALSEE</Text></TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{},
    true:{
        backgroundColor: c.green;
    },
    false:{
        backgroundColor: c.red;
    }
})