import React from 'react';
import {View,Image,ImageBackground,Text,LayoutAnimation,TouchableOpacity,Animated,UIManager} from 'react-native'
import {style} from "./style";
import {Images} from "../../assest";
import {observer} from 'mobx-react';
import {MovieStore} from "../../store";

const TopBarView=(props)=>(

    <View style={style.movieDetailTopBarView}>
        <Image source={{uri:props.uri}} style={style.movieDetailToolBar} blurRadius={ANDROID?20:40}/>
        <ImageBackground
            source={{uri:props.uri}}
            style={style.movieDetailTopView_Image}>
            <Image source={Images.icon.play} style={style.movieDetailTopView_play}/>
        </ImageBackground>
        <View style={style.movieDetailToolBarTitleView}>
            <Text style={style.movieDetailTitleCn} numberOfLines={1}>{props.titleCn}</Text>
            <Text style={style.movieDetailTitleEn} numberOfLines={1}>{props.titleEn}</Text>
        </View>
        {props.rating>0?
            <View style={[style.movieDetailTopView_Score,{backgroundColor:'red'}]}>
                <Text style={{fontSize:26,color:'#fff'}}>{dealText(props.rating)[0]}</Text>
                <Text style={{fontSize:20,color:'#fff',marginBottom:10}}>{dealText(props.rating)[1]}</Text>
                <Text style={[style.score,{marginBottom:10}]}>{dealText(props.rating)[2]}</Text>
            </View>:null}
        <View style={style.movieDetailTopView_Title}>
            <View style={style.movieDetailTop_Title_two}>
                <Text numberOfLines={1} style={style.runTime}>{props.runTime}</Text>
            </View>
            <View style={[style.movieDetailTop_Title_two]}>
                <Text numberOfLines={1} style={style.type}>{Symbol(props.type)}</Text>
            </View>
            <View style={[style.movieDetailTop_Title_two]}>
                <Text numberOfLines={1} style={style.location}>{Timetransformation(props.date)} {props.location}上映</Text>
            </View>
            <View style={[style.movieDetailTop_Title_two,{height:15,width:WIDTH/2}]}>
                <Text numberOfLines={1} style={style.commonSpecial}>
                    {commonSpecial(props.commonSpecial)? "❝"+props.commonSpecial:null}
                </Text>
            </View>
            <View style={style.movieLabel}>
                {props.isIMAX3D?
                    <View style={{flexDirection:'row'}}>
                        <MovieLabel label='3D'/>
                        <MovieLabel label='IMAX 3D'/>
                    </View>:props.isIMAX?<View>
                        <MovieLable label='IMAX'/>
                    </View>:null
                }
            </View>
        </View>

    </View>
);

function dealText(text) {
    let string = JSON.stringify(text)
    return string.split("");
}

function Symbol(array) {
    return array.join('/')
}

function Timetransformation(date:string) {

    date = new Date(date*1000);//如果date为13位不需要乘1000
    let Y = date.getFullYear() + '年';
    let M = (date.getMonth()+1) + '月';
    let D = ( date.getDate()) + '日';
    return Y+M+D;
}

const MovieLabel=(props)=>(

    <View style={style.movieLabelView}>
        <Text style={style.movieLabelTitle}>{props.label}</Text>
    </View>
);

function commonSpecial(text:string) {
    if (text.length!==0){
        return true
    }else {
        return false
    }
}

@observer
class Plot extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.customSpring={
            duration: 400,
            create: {
                type: LayoutAnimation.Types.spring,
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: 0.8
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 0.8
            }
        };
        if (ANDROID) {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.openMoreAnimated = new Animated.Value(0);

    }

    render(){

        const rotateZ = this.openMoreAnimated.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','-180deg']
        });

        return(
            <View
                ref='Plot'
                style={[style.plotView,MovieStore.openMore?{}:{height:100}]}>
                <Text
                    selectable={true}
                    style={style.plotContent} numberOfLines={MovieStore.openMore?null:2}>
                    剧情: {this.props.plot}
                </Text>
                <TouchableOpacity
                    style={[style.openMoreView]}
                    onPress={this.openMore}>
                    <Animated.Image
                        style={[style.openMore,{transform:[{
                            rotateZ:rotateZ
                        }]}]}
                        source={Images.default.open_more}/>
                </TouchableOpacity>
            </View>
        )
    }

    openMore=()=>{

        LayoutAnimation.configureNext(this.customSpring);

        Animated.timing(this.openMoreAnimated,{
            toValue:MovieStore.openMore?0:1,
            duration:500
        }).start();
        MovieStore.showMoreContent();
    };

}

export {
    TopBarView,Plot
}