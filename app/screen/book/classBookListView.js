import React from 'react';
import {View,FlatList,ActivityIndicator,Text,TouchableOpacity,Animated,Easing} from 'react-native';
import {style} from "./style";
import {observer} from 'mobx-react'
import {Colors} from "../../assest/colors";
import {BookClassListStore} from "../../store";
import {BaseApi} from "../../assest/api";
import {ImageView} from "../home/defaultView";
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-ui-lib';
let array = [{},{},{},{},{},{}];

@observer
class ClassBookListView extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.MyCustomComponent = Animatable.createAnimatableComponent(TouchableOpacity);
      }


    render(){

       console.log(BookClassListStore.data.slice(0))

        if (BookClassListStore.loading){
            return (
                <View>
                    <View style={style.loadingView}>
                        <ActivityIndicator
                            size='small'
                            color={Colors.activeTintColor}/>
                    </View>
                    <LoadView/>
                </View>
            )
        }

        return(
           <FlatList
               style={{backgroundColor:'#fff'}}
                data={this.props.data}
                keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                renderItem={this._renderItem}
                onEndReached={this.props.onEndReached}
                ListFooterComponent={this._ListFooterComponent}
           />
        )
    }

    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{

        let bookTitle = item.title;
        let shortIntro = item.shortIntro;
        let cover = BaseApi.BookBase4 + item.cover;
        let retentionRatio = item.retentionRatio;
        let _id = item._id;
        if (item.latelyFollower-10000>0){
          this.latelyFollower = (item.latelyFollower/10000).toFixed(1);
        }else {
          this.latelyFollower =item.latelyFollower;
        }

        return(
            <TouchableOpacity
                onPress={()=>this.props.jump(_id,bookTitle)}
                activeOpacity={1}
                style={style.bookLoadView}>
                <ImageView uri={cover} styles={[style.leftBookView,]}/>
                <View style={style.rightBookView}>
                    <Text style={style.BookViewTitle} numberOfLines={1}>{bookTitle}</Text>
                    <Text numberOfLines={2} style={style.BookViewContext}>{shortIntro}</Text>
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginRight:20,flexDirection:'row'}}>
                            <Text style={style.latelyFollower}>{this.latelyFollower}</Text>
                            {(item.latelyFollower-10000>0)?
                                <Text style={style.latelyFollower}>万</Text>:null}
                            <Text style={style.retentionRatio}>人气</Text>
                        </View>
                        <View  style={{marginRight:20,flexDirection:'row'}}>
                            <Text style={style.latelyFollower}>{retentionRatio}% </Text>
                            <Text style={style.retentionRatio}>读者留存</Text>
                        </View>

                    </View>
                </View>
                <View style={style.bookLoadBottomView}/>
            </TouchableOpacity>
        )
    };



    _ListFooterComponent=()=>{

        if (!BookClassListStore.loadingMore){
            return(
                <View style={style.loadingMore}>
                    <ActivityIndicator color={Colors.movieText} size='small'/>
                    <Text style={{color:Colors.movieText,fontSize:12,marginLeft:5}}>加载中...</Text>
                </View>
            )
        }else {
            return(
                <View style={style.loadingMore}>
                   <Text style={{color:Colors.movieText,fontSize:12}} >加载完毕</Text>
                </View>
            )
        }
    }

}


const LoadView=()=>(

    array.map((item,i)=>{
        return(
            <View style={style.bookLoadView} key={i}>
                <View style={style.leftBookView}/>

                <View style={style.rightBookView}>
                    <View style={style.rightBookViewTitle}/>
                    <View style={[style.rightBookViewTitle,{width:WIDTH/2,marginTop:15}]}/>
                    <View style={[style.rightBookViewTitle,{width:WIDTH/2-20}]}/>

                    <View style={{flexDirection:'row',marginBottom:10}}>
                        <View style={[style.rightBookViewTitle,{width:WIDTH/6,marginRight:10}]}/>
                        <View style={[style.rightBookViewTitle,{width:WIDTH/6}]}/>
                    </View>
                </View>
                <View style={style.bookLoadBottomView}/>
            </View>
        )
    })
);



export {
    ClassBookListView
}