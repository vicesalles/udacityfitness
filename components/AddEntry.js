import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import {submitEntry,removeEntry} from '../utils/api';
import {connect} from 'react-redux';
import { addEntry } from '../actions';
import { getDailyReminderValue } from '../utils/helpers';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import UdaciSteppers from './UdaciSteppers';
import UdaciSlider from './UdaciSlider';
import DateHeader from './DateHeader';
import TextButton from './TextButton';
import {white, purple, grey } from '../utils/colors';

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity style={styles.submitButton} onPress={onPress}><Text style={styles.submitButtonText}>Submit</Text></TouchableOpacity>
    )
}

//PASSO AL VIDEO DE DESPRES DE DIMENSIONS API

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor: white
    },
    row:{
        flexDirection:'row',
        flex:1,
        alignItems:'center'
    },
    center:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        marginLeft:30,
        marginRight:30
    },
    submitButton:{
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight:30,
        height: 45,
        borderRadius:2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButtonText:{
        color:white,
        fontSize:22,
        textAlign: 'center'
    }
})

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }
    //Increment value for given metric
    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric);
        this.setState((state) => {
            const count = state[metric] + step;
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        });
    }
    //Decrement value for given metric
    decrement = (metric) => {

        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step;
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        });
    }

    //Slider
    slide = (metric, value) => {

        this.setState((state) => {
            return {
                ...state,
                [metric]: value
            }
        })
    }

    //Submit changes

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        this.props.dispatch(addEntry({
            [key]:entry
        }));

        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        })

        submitEntry({key,entry});
    }
    reset = () => {
        const key = timeToString();
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))
        removeEntry(key);

    }
    render() {
        const metaInfo = getMetricMetaInfo();
        
        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons name='md-happy' size={100} />
                    <Text>You already Logged your today's activity</Text>
                    <TextButton style={{padding:10, backgroundColor:purple, borderRadius:8}} onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        } else {

            return (
                <View style={styles.container}>
                <Text>{this.props.alreadyLogged}</Text>
                    <DateHeader date={new Date().toString()} />
                    {Object.keys(metaInfo).map((key) => {
                        const { getIcon, type, ...rest } = metaInfo[key];
                        const value = this.state[key];
                        return (
                            <View key={key} style={styles.row}>
                                {getIcon()}
                                {type === 'slider'
                                    ? <UdaciSlider value={value}
                                        onChange={(value) => this.slide(key, value)}
                                        {...rest} />
                                    : <UdaciSteppers value={value}
                                        onIncrement={() => { this.increment(key) }}
                                        onDecrement={() => { this.decrement(key) }}
                                        {...rest} />}
                            </View>
                        )

                    })}
                    <SubmitBtn onPress={this.submit} />
                </View>
            )
        }
    }
}

function mapStateToProps (state){
    const key = timeToString();
    return{
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry);