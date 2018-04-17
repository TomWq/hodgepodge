import React from 'react';
import {View,ScrollView,Image,Text,TouchableOpacity,Animated,InteractionManager} from 'react-native';
import {HeaderBar} from "../../component/headerBar";
import {observer} from 'mobx-react';
import {BookClassListStore} from "../../store/bookClassListStore";
import {style} from "./style";
import {ImageView} from "../home/defaultView";
import {toJS} from 'mobx';
import {BaseApi} from "../../assest/api";
import {getSize} from "./bookDetailView";
import {Images} from "../../assest/images";
import {Colors} from "../../assest/colors";
import {  DiscussScreen, BookReviewScreen, ShortReviewScreen,} from './bookCommentTabView'
const array1 = [{title:'讨论'},{title:'书评'},{title:'短评'}];

@observer
class BookComments extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.id = this.props.navigation.state.params.id;
        this.title_opacity = new Animated.Value(0);
        this.state={
            lineXY:new Animated.Value(0),
            offset:0,
            index:0
        }
      }

    componentDidMount() {
        BookClassListStore.fetchBookComments(this.id)
    }

    render(){

        const title_opacity = this.title_opacity.interpolate({
            inputRange:[0,WIDTH/5+50],
            outputRange:[1,0]
        });

        const offset = this.state.lineXY.interpolate({
            inputRange:[0,1],
            outputRange:[0,this.state.offset]
        });

        const bookData = toJS(BookClassListStore.bookDetail);
        if (bookData){
            this.cover = BaseApi.BookBase4 + bookData.cover;
            this.title = bookData.title;
            this.author = bookData.author;
            this.latelyFollower = getSize(bookData.latelyFollower,1);
            this.newComments = BookClassListStore.bookCommentsToday
        }




        return(
            <View style={{flex:1}}>
                {BookClassListStore.bookCommentsLoading?
                    <LoadView/>:

                    <View style={{flex:1}}>
                        <HeaderBar back title='书评区' onClose={this.props.onClose} styles={{borderBottomWidth:0}}/>
                        <ScrollView
                            bounces={false}
                            alwaysBounceHorizontal={false}
                            showsVerticalScrollIndicator={false}
                            onScroll={Animated.event([{
                                nativeEvent:{
                                    contentOffset:{
                                        y:this.title_opacity
                                    }
                                }
                            }])}
                            scrollEventThrottle={200}
                            stickyHeaderIndices={[1]}>

                            <Animated.View style={[style.bookCommentsTopView,{opacity:title_opacity}]}>
                                <ImageView uri={this.cover} styles={style.bookCommentsTopLeftImg}/>
                                <View style={style.bookCommentsTopTextView}>
                                    <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                                        <Text style={[style.bookDetailViewTopTitleRight,{fontWeight:'500',fontSize:18,width:150}]} numberOfLines={1}>{this.title}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',height:20,alignItems:'center'}}>
                                        <Image source={Images.icon.header} style={style.authorImage}/>
                                        <Text style={[style.authorView,{color:Colors.movieText,fontSize:14}]}>{this.author}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',height:30}}>
                                        <Text style={style.wordCount1}>讨论区人气: {this.latelyFollower}</Text>
                                        <View style={{width:POXEL,height:15,backgroundColor:Colors.headerBottomColor,marginLeft:10,marginRight:10}}/>
                                        <Text style={style.wordCount1}>今日新增讨论: {this.newComments}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={[style.collectionView,{backgroundColor:'red'}]}>
                                    <Text style={{color:'#fff'}}>收藏本书</Text>
                                </TouchableOpacity>
                            </Animated.View>

                            <View>
                            <View style={style.bookCommentsTabView}>
                                {array1.map((item,i)=>{
                                    return(
                                        <TouchableOpacity
                                            onLayout={this.onLayout}
                                            style={style.tabView}
                                            onPress={()=>this.onChange(i)}
                                            key={i}>
                                            <Text style={[style.bookCommentsTabTitle,{color:this.state.index===i?'red':Colors.movieText,}]}>{item.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                            <Animated.View style={[style.indicator1,{transform:[{translateX:offset}]}]}/>
                            </View>
                            <ScrollView
                                ref='scrollView'
                                style={{flex:1,width:WIDTH}}
                                bounces={false}
                                alwaysBounceHorizontal={false}
                                horizontal={true}
                                scrollEnabled={false}
                                pagingEnabled={true}
                                {...this.props}
                                showsHorizontalScrollIndicator={false}>
                                <DiscussScreen navigate={this.props.navigation.navigate}  bookComments={BookClassListStore.bookComments.slice(0)}/>
                                <BookReviewScreen navigate={this.props.navigation.navigate}  cover={this.cover} title={this.title}  bookReviewsComments={BookClassListStore.bookReviewsComments.slice(0)}/>
                                <ShortReviewScreen  bookShortComments={BookClassListStore.bookShortComments.slice(0)}/>
                            </ScrollView>
                        </ScrollView>
                    </View>

                }
            </View>
        )
    }

    onLayout=(event)=>{
        const {width} = event.nativeEvent.layout;
        this.setState({
            offset:width
        })
    }

    onChange(i){

        this.setState({
            index:i
        })

        if (i ===0){
            this.refs.scrollView.scrollTo({x:0,y:0,animated:true})
        }else if (i ===1){
            this.refs.scrollView.scrollTo({x:WIDTH,y:0,animated:true})
        }else {
            this.refs.scrollView.scrollToEnd();
        }

        Animated.spring(this.state.lineXY,{
            toValue:i,
            useNativeAnimations:true
        }).start();

    }
}


const LoadView =()=>{

    return(
        <View style={{flex:1}}>
            <HeaderBar close styles={{borderBottomWidth:0}} title='书评区'/>
            <View style={style.bookCommentsTopView}>
                <View style={style.bookCommentsTopLeftImg}/>
                <View style={style.bookCommentsTopTextView}>
                    <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                        <View style={style.scoreLeft}/>
                    </View>
                    <View style={{flexDirection:'row',height:20,alignItems:'center'}}>
                        <View style={[style.scoreLeft,{width:50}]}/>
                        <View style={[style.scoreLeft,{width:50}]}/>
                    </View>
                    <View style={[style.scoreLeft,{width:WIDTH/2-10,marginTop:15}]}/>
                    <View style={[style.scoreLeft,{width:WIDTH/2-40,marginTop:15}]}/>
                </View>
                <View style={style.collectionView}>
                    <Text style={{color:'#fff'}}>收藏</Text>
                </View>
            </View>
            <View style={style.bookCommentsTabView}>
                {array1.map((item,i)=>{
                    return(
                        <Text key={i} style={style.bookCommentsTabTitle}>{item.title}</Text>
                    )
                })}
            </View>
            <View style={style.bookCommentsItemView}>
                {array1.map((item,i)=>{
                    return(
                        <View key={i} style={style.bookCommentsItem}>
                            <View style={style.bookCommentsItemBottom}>
                                <View style={style.bookCommentsItemBottomLeftImage}/>
                                <View>
                                    <View style={style.bookCommentsItemRight}/>
                                    <View style={[style.bookCommentsItemRight,{width:WIDTH/2-30}]}/>
                                    <View style={[style.bookCommentsItemRight,{width:WIDTH/2-40}]}/>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>

    )

};

export {
    BookComments
}