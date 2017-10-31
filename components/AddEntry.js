import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Stepper from './Stepper';
import Slider from './Slider';
import DateHeader from './DateHeader';

export default class AddEntry extends Component {
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

        this.setState(() => {
            return {
                ...state,
                [metric]: value
            }
        })
    }

    render() {
        const metaInfo = getMetricMetaInfo();
        return (
            <View>
                <DateHeader date={new Date().toLocalDateString()}/>
                {Object.keys(metaInfo).map((key)=>{
                    const {getIcon,type,...rest} = metaInfo[key];
                    const value = this.state[key];
                    return(
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                            ?<Slider value={value} onChange={(value)=> this.slide(key,value)} {...rest}/>
                            :<Stepper value={value}
                            onIncrement={()=>{this.increment(key)}}
                            onDecrement={()=>{this.decrement(key)}}
                            {...rest}/>}
                        </View>
                    )

                })}
            </View>
        )
    }
}