import React from 'react';
import {View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import {style} from "./style";
import {Images} from "../../assest/images";
import {scaleSize} from "../../utils/screenUtil";
const type = [
    {title:'热门',label:'hot'},
    {title:'新书',label:'new'},
    {title:'好评',label:'reputation'},
    {title:'完结',label:'over'},
    {title:'VIP',label:'monthly'}];

class ClassListViewTopView extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
       this.state={
           index:0,
           index1:0,
        }

      }

    render(){

        // this.props.classType.map((item,i)=>{
        //     console.log(item.title)
        // });

        return(

            <View style={[style.classListViewTopView,
                {height:this.props.isClassType?scaleSize(140):scaleSize(90)}]}>
                <View style={{flexDirection:'row',marginBottom:10,marginLeft:10}}>
                {type.map((item,i)=>{
                    return(
                        <TouchableOpacity
                            key={i}
                            onPress={()=>this.onPress(i,item)}
                            activeOpacity={0.9}
                            style={[style.leftTypeView,{backgroundColor:this.state.index===i?'red':null}]}>
                            <Text style={[style.drop_down_title,{color:this.state.index===i?'#fff':'#666666'}]}>{item.title}</Text>
                        </TouchableOpacity>
                    )})}
                </View>
                {/*<View style={style.divider}/>*/}
                {this.props.isClassType?
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{marginLeft:10,marginRight:20}}>
                    {this.props.classType.map((item,i)=>{
                        return(
                            <TouchableOpacity
                                key={i}
                                onPress={()=>this.onPress1(i,item)}
                                activeOpacity={0.9}
                                style={[style.leftTypeView,{width:WIDTH/5,backgroundColor:this.state.index1===i?'red':null}]}>
                                <Text style={[style.drop_down_title,{color:this.state.index1===i?'#fff':'#666666'}]}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>:null}
            </View>
        )
    }

    onPress(index,item){
        this.setState({index});
        this.props.onChoose(item)
    }

    onPress1(index1,item){
        this.setState({index1})
        this.props.onChooseClass(item.title)
    }

}



export {
    ClassListViewTopView
}