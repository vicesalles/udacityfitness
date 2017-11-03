import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import {submitEntry,deleteEntry} from '../utils/api';
import {connect} from 'react-redux';
import { addEntry } from '../actions';
import { getDailyReminderValue } from '../utils/helpers';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import UdaStepper from './UdaStepper';
import UdaSlider from './UdaSlider';
import DateHeader from './DateHeader';
import TextButton from './TextButton';

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}><Text>Submit</Text></TouchableOpacity>
    )
}

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
                <View>
                    <Ionicons name='ios-happy-outline' size={100} />
                    <Text>You already Logged your today's activity</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        } else {

            return (
                <View>
                    <DateHeader date={new Date().toString()} />
                    {Object.keys(metaInfo).map((key) => {
                        const { getIcon, type, ...rest } = metaInfo[key];
                        const value = this.state[key];
                        return (
                            <View key={key}>
                                {getIcon()}
                                {type === 'slider'
                                    ? <UdaSlider value={value}
                                        onChange={(value) => this.slide(key, value)}
                                        {...rest} />
                                    : <UdaStepper value={value}
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

export default connect()(AddEntry);