/**
 * @flow
 * 底部tab配置页
 */
import React from 'react';
import {Home} from "../screen/home/home";
import {Image} from 'react-native';
import {style} from "./style";
import {Images} from "../assest/index";
import {TabNavigator,TabBarTop} from 'react-navigation';
import {Colors} from "../assest/colors";
import {Ticket} from "../screen/home/ticket";
import {Hot} from "../screen/home/hot";
import {Immediately} from "../screen/home/immediately";

const TabRouteConfigs = {

    Ticket:{
        screen:Ticket,
        navigationOptions:({navigation,screenProps})=>(TabBarItem('正在预售',Images.tab.home_selected,Images.tab.home_uncheck)),
    },
    Hot:{
        screen:Hot,
        navigationOptions:({navigation,screenProps})=>(TabBarItem('正在热映',Images.tab.mine_selected,Images.tab.mine_uncheck))
    },
    Immediately:{
        screen:Immediately,
        navigationOptions:({navigation,screenProps})=>(TabBarItem('即将上映',Images.tab.mine_selected,Images.tab.mine_uncheck))
    },

};

const TabNavigatorConfigs = {

    animationEnabled: true,
    initialRouteName: 'Ticket',
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    lazy: true,
    swipeEnabled: true,

    tabBarOptions:{
        activeTintColor:Colors.activeTintColor,
        inactiveTintColor:Colors.inactiveTintColor,
        showIcon:false,
        indicatorStyle:style.indicatorStyle,
        style:style.tabStyleTop,
        labelStyle:style.labelStyleTop,
        scrollEnabled:false,
        pressColor:'#717171',
        bounces:true,
        useNativeDriver:true,
    }
}

const TabBarItem =(title:string,selected:string|number,uncheck:string|number)=>{
    return{
        tabBarLabel:title,
        title:title,
        tabBarIcon:({tintColor,focused})=>{
            return(
                focused? TabBarItemImage(selected) :TabBarItemImage(uncheck)
            )
        },

    }
};

const TabBarItemImage=(source:string|number)=>{
    return(
        <Image
            style={style.icon}
            source={source}
        />
    )
};

const TabTop = TabNavigator(TabRouteConfigs, TabNavigatorConfigs);

export {
    TabTop
}


