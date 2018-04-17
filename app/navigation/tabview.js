/**
 * @flow
 * 底部tab配置页
 */
import React from 'react';
import {Home} from "../screen/home/home";
import {Mine} from "../screen/mine/mine";
import {Image} from 'react-native';
import {style} from "./style";
import {Images} from "../assest/index";
import {TabBarBottom,TabNavigator} from 'react-navigation';
import {Colors} from "../assest/colors";
import {TabTop} from "./tabTopview";
import {ClassBook} from "../screen/book";

const TabRouteConfigs = {

    // Home:{
    //     screen:Home,
    //     navigationOptions:({navigation})=>(TabBarItem('电影',Images.tab.home_selected,Images.tab.home_uncheck)),
    // },
    ClassBook:{
        screen:ClassBook,
        navigationOptions:({navigation})=>(TabBarItem('图书分类',Images.tab.class_selected,Images.tab.class_uncheck))
    },
    Mine:{
        screen:Mine,
        navigationOptions:({navigation})=>(TabBarItem('我的',Images.tab.mine_selected,Images.tab.mine_uncheck))
    },
};

const TabNavigatorConfigs = {

    animationEnabled: false,
    initialRouteName: 'ClassBook',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: false,
    tabBarOptions:{
        activeTintColor:Colors.activeTintColor,
        inactiveTintColor:Colors.inactiveTintColor,
        showIcon:true,
        indicatorStyle:style.indicatorStyle,
        style:style.tabStyle,
        labelStyle:style.labelStyle
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
        }
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

const Tab = TabNavigator(TabRouteConfigs, TabNavigatorConfigs);

export {
    Tab
}


