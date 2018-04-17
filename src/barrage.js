
import React from 'react';
import {View,Text,Dimensions,Animated,InteractionManager} from 'react-native';
const {width, height} = Dimensions.get('window');

let domList = [
    '测试,测试,测试,测试,测试1','测试,测试,测试,测试,测试2',
    '测试,测试,测试,测试,测试3','测试,测试,测试,测试,测试4',
    '测试,测试,测试,测试,测试5','测试,测试,测试,测试,测试6',
    '测试,测试,测试,测试,测试7','测试,测试,测试,测试,测试8',
    ];

type Props ={
    width:number,
    styles:any
}


export default class extends React.Component<Props>{


    componentDidMount() {
        //this.start();
    }


    start=(left:any)=>{

        let speed = Math.floor(Math.random()*10000);
        Animated.timing(left,{
            toValue:1,
            duration:10000,
            useNativeAnimations:true,
            delay:speed
        }).start()
    };

    render(){

        return(
            <View style={this.props.styles}>
                {domList.map((item,i)=>{
                    let color1 = parseInt(Math.random() * 256);
                    let color2 = parseInt(Math.random() * 256);
                    let color3 = parseInt(Math.random() * 256);
                    let color = "rgb(" + color1 + "," + color2 + "," + color3 + ")";
                    let top = Math.round(Math.random()*230);
                    let size =  Math.round(Math.random()*10)+10;
                    this['left'+i] = new Animated.Value(0);

                    InteractionManager.runAfterInteractions(()=>{
                        this.start(this['left'+i]);
                    });

                     const left = this['left'+i].interpolate({
                        inputRange:[0,1],
                        outputRange:[this.props.width,-this.props.width]
                    });

                    return(

                        <Animated.Text
                            key={i}
                            style={{color:color,
                                position:'absolute',
                                top:top,
                                fontSize:size,
                                // transform:[{translateX:left}]
                                left:left
                            }}>
                            {item}
                        </Animated.Text>
                    )
                })}
            </View>

        )
    }

}



