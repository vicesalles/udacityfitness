import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History'
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {TabNavigator,StackNavigator} from 'react-navigation';
import {purple,white} from './utils/colors';
import {FontAwesome,Ionicons} from '@expo/vector-icons';
import { Constants} from 'expo';

function UdaciStatusBar({backgroundColor,...props}){
  return(
    <View style={{backgroundColor,height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
  History:{
    screen:History,
    navigationOptions:{
      tabBarLabel: 'History',
      tabBarIcon: ({tintColor}) => <Ionicons name="md-bookmarks" size={30} color={tintColor}/>
    }
  },
  AddEntry:{
    screen:AddEntry,
    navigationOptions:{
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({tintColor}) => <Ionicons name="plus-square" size={30} color={tintColor}/>
    }
  }
},{
  navigationOptions:{
    header:null
  },
  tabBarOptions:{
    activeTintColor: white,
    style:{
      height:56,
      backgroundColor: purple,
      shadowOffset:{
        width:0,
        height:3
      },
      shadowRadius:6,
      shadowOpacity:1
    }
  }
})


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
      <View style={{flex:1}}>
         <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
         <Tabs/>
      </View>
      </Provider>
    );
  }
}

