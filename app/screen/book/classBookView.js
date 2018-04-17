import React from 'react';
import {SectionList,View,Text,FlatList,TouchableOpacity,Image,ScrollView,Animated,Easing,PanResponder,LayoutAnimation} from 'react-native';
import {style} from "./style";
import {BaseApi} from "../../assest/api";
import {ImageView} from "../home/defaultView";
import {Images} from "../../assest/images";
const leftArray = ['男生','女生','漫画','出版'];

class ClassBookView extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.navigate = this.props.navigate;
          this.state={
              lineXY:new Animated.Value(0),
              offset:0,


          };

      }

    render(){

          const offset = this.state.lineXY.interpolate({
              inputRange:[0,1],
              outputRange:[0,this.state.offset]
          });


        return(
            <View style={style.container1}>


                <FlatList
                    ref='scrollView'
                    data={leftArray}
                    scrollEnabled={false}
                    keyExtractor={(item, index)=>'index'+index+item}
                    renderItem={this.renderItemLeft}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={style.leftScrollView}/>

                <Animated.View
                    style={[style.indicator,{transform:[{translateY:offset}]}]}/>

                <SectionList
                    ref='sectionList'
                    sections={this.props.sections}
                    renderItem={this._renderItem}
                    renderSectionHeader={this.renderSectionHeader}
                    keyExtractor={(item,i)=>item.bookCount}
                    onViewableItemsChanged = {(info)=>this.itemChange(info)}
                    ListFooterComponent={this.ListFooterComponent}
                    stickySectionHeadersEnabled={true}
                    showsVerticalScrollIndicator={false}
                    indicatorStyle='default'/>
            </View>

        )
    }


    ListFooterComponent=()=>{
        return(
            <View style={style.ListFooterComponent}>
                <Text style={style.ListFooterComponentTitle}>到底了(*^__^*) 嘻嘻……</Text>
            </View>
        )
    }

    renderItemLeft=({item,index})=>{

        return(
            <TouchableOpacity
                onLayout={this.onLayout}
                activeOpacity={0.9}
                onPress={()=>this.onChange(index)}
                style={style.leftArrayView}>
                <Text>{item}</Text>
            </TouchableOpacity>
        )
    };

    onLayout=(event)=>{
        const {height} = event.nativeEvent.layout;
        this.setState({
            offset:height
        })
    };

    offsetAnimated=(i)=>{
        Animated.spring(this.state.lineXY,{
            toValue:i,
            useNativeAnimations:true
        }).start();
    };

    onChange(i){

        const params = {animated:true,itemIndex:0,sectionIndex:i,viewOffset:30};
        this.refs.sectionList.scrollToLocation(params)

    };


    itemChange(info){

        let section = info.viewableItems[0].section.key;

        if (section){
            let index = leftArray.indexOf(section);
            if (index<0){
                index = 0;
            }
            this.offsetAnimated(index);
            // this.refs.indicator.scrollTo({x:0,y:0,animated:true})
        }

    }

    renderSectionHeader=({section})=>{

        let headerTitle = section.key;

        return(
            <View style={style.renderSectionHeader}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={style.new_buy_star_bg_cell}/>
                    <Image source={Images.icon.new_buy_star_bg} style={style.new_buy_star_bg}/>
                </View>
                <Text style={style.renderSectionHeaderTitle}>{headerTitle}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={Images.icon.new_buy_star_bg} style={style.new_buy_star_bg}/>
                    <View style={style.new_buy_star_bg_cell}/>
                </View>
            </View>
        )
    };

    _renderItem=({item})=>{

        return(
            <FlatList
                style={{marginTop:10,marginBottom:10}}
                data={item}
                numColumns = {2}
                renderItem = {this.renderItem}
                keyExtractor={(item, index)=>'index'+index+item}
            />
        )
    };

    renderItem=({item})=>{

        let image1 = BaseApi.BookBase4+item.bookCover[0];
        let image2 = BaseApi.BookBase4+item.bookCover[1];
        let image3 = BaseApi.BookBase4+item.bookCover[2];


        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.navigate('ClassListView',{
                    major:item.name,
                    gender:item.type,
                    transition: 'forHorizontal1',
                })}
                style={style.renderItemTitle}>

                <View style={style.ItemView}>
                <Text style={style.itemTitle}>{item.name}</Text>
                <Text style={style.bookCount}>{item.bookCount}本</Text>
                </View>


                <View style={style.bookItemImg}>
                    <ImageView uri={image1} styles={style.bookItemImgView}/>
                    <ImageView uri={image2} styles={style.bookItemImgView1}/>
                    <ImageView uri={image3} styles={style.bookItemImgView2}/>
                </View>
            </TouchableOpacity>
        )
    };

}

export {
    ClassBookView
}