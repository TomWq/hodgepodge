/**
 * @flow
 */
import React from 'react';
import {View,StatusBar} from 'react-native';
import {TabTop} from "../../navigation";

class Home extends React.Component<any,{}>{

    componentDidMount() {
       IOS? StatusBar.setBarStyle('dark-content',true): null
    }

    render(){

        return(
            <View style={{flex:1}}>
                <StatusBar hidden={false}
                           backgroundColor='black'
                           />
                <View style={{height:IOS?20:0}}/>
                <TabTop screenProps={this.props.navigation}/>
            </View>

        )
    }
}

export {
    Home
}