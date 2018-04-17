import {StyleSheet} from 'react-native';
import {scaleSize} from "../utils/screenUtil";
import {Colors} from "../assest/colors";

const style = StyleSheet.create({
    icon:{
        width:scaleSize(42),
        height:scaleSize(42)
    },
    indicatorStyle:{
        height:scaleSize(8),
        backgroundColor:Colors.activeTintColor,
        borderRadius:scaleSize(4),
        width:scaleSize(40)
    },
    labelStyle:{
        fontSize: scaleSize(20), // 文字大小
        marginBottom: scaleSize(3),

    },
    labelStyleTop:{
        fontSize: scaleSize(32), // 文字大小

    },
    tabStyleTop:{
        backgroundColor: Colors.backgroundColor,
        elevation:0,
        shadowOpacity:0,
        borderBottomColor:Colors.borderBottomColor,
        borderBottomWidth:scaleSize(1),

    },
    tabStyle:{
        backgroundColor: Colors.backgroundColor,

    },
    cardStyle:{
        backgroundColor:Colors.backgroundColor
    }
});

export {
    style
}