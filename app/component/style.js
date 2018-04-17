import {StyleSheet} from 'react-native';
import {scaleSize,ifIphoneX} from "../utils/screenUtil";
import {Colors} from "../assest/colors";

const style = StyleSheet.create({

    loadingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    loadDialog:{
        width:80,
        height:80,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.7)',
        borderRadius:10
    },
    loadingTitle:{
        color:'#fff',
        fontSize:10,
        marginTop:10
    },
    headerBarView:{
        width:WIDTH,
        ...ifIphoneX({
            height:86,

        },{
            height:IOS?66:76,

        }),
        backgroundColor:Colors.headerBarColor,
        borderBottomWidth:POXEL,
        borderBottomColor:Colors.headerBottomColor,


    },
    statusBarView:{
        width:WIDTH,
        ...ifIphoneX({
            height:40
        },{
            height:20,
        }),
        backgroundColor:'transparent'
    },
    headerTitleView:{
        width:WIDTH,
        height:IOS?46:56,
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    backView:{
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        position:'absolute',
        left:0
    },
    headerBack:{
        height: 25,
        width: 25,
        marginLeft: 15,
        marginVertical: 12,
        resizeMode: 'contain',

    },
    headerRightView:{
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        position:'absolute',
        right:0,

    },
    headerRight:{
        height: scaleSize(50),
        width: scaleSize(50),
        marginRight: 20,
        resizeMode: 'contain',
    },
    headerBacKTitle:{
        fontSize: 17,
        paddingRight: 10,
        color: 'rgba(0, 0, 0, .9)',
        fontWeight: IOS ? '700' : '500',
    },
    headerTitle:{
        fontSize: IOS? 17 : 20,
        fontWeight: IOS ? '700' : '500',
        color: 'rgba(0, 0, 0, .9)',
        textAlign: 'center',
        marginHorizontal: 16,
        width:WIDTH/2
    },
    downAnimatedView:{
        flex:1,
        position:'absolute',
        width:WIDTH,
        height:HEIGHT,
        left:0,
        top:0,
    },
    mask:{
        //justifyContent:"center",
        backgroundColor:"#383838",
        opacity:0.5,
        position:"absolute",
        width:WIDTH,
        height:HEIGHT,
        left:0,
       top:0,
    },
    tip:{
        alignItems:"center",
        justifyContent:"space-between",

    },
    chooseTypeView:{
        position:'absolute',
        bottom:0,
        left:0,
    },
    arrayTypeView:{
        width:WIDTH,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    }
})

export {
    style
}