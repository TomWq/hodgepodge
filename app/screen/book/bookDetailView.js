import React from 'react';
import {View,Image,Text,ScrollView,ActivityIndicator,TouchableOpacity,FlatList,Animated,InteractionManager} from 'react-native';
import {style} from "./style";
import {Images} from "../../assest/images";
import {observer} from 'mobx-react';
import {BookClassListStore} from "../../store/bookClassListStore";
import {Colors} from "../../assest/colors";
import {ImageView} from "../home/defaultView";
import {BaseApi} from "../../assest/api";
import {toJS} from 'mobx';
import StarRating from 'react-native-star-rating';
import {HeaderBar} from "../../component/headerBar";
const array = [{},{},{},{},{}];

@observer
class BookDetailView extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.title_opacity = new Animated.Value(0);
          this.borderBottomWidth = new Animated.Value(0);

      }

    componentDidMount() {
       this.fetchDate(this.props.id)

    }

    fetchDate=(id)=>{
        BookClassListStore.fetchBookDetail(id);

    };


    render(){


        const data = toJS(BookClassListStore.bookDetail);
        const comment = BookClassListStore.comment.slice(0);
        const evaluation_data = BookClassListStore.evaluation_data.slice(0);
        const evaluation_total = BookClassListStore.evaluation_total;

        console.log(data)
        if (data){
            this.cover = BaseApi.BookBase4 + data.cover;
            //console.log(data)
            this.title = data.title;
            this.author = data.author;
            this.majorCate = data.majorCate;
            const score = data.rating;
            if (score){
               this.score = score.score.toFixed(1);
               this.count = getSize(score.count,1);
            }
            const copyright = data.copyright;
            if (copyright){
                this.copyright = copyright;
                this.showCopyright = true
            }else {
                this.showCopyright = false;
            }

            this.nowDate = new Date();
            this.date =  getTime(data.updated,this.nowDate);
            this.latelyFollower = getSize(data.latelyFollower,1); //人气
            this.serializeWordCount = getSize(data.serializeWordCount,1); //更新字数
            this.postCount = getSize(data.postCount,1); //帖子
            this.retentionRatio = data.retentionRatio + '%';  //留存
            if (data.serializeWordCount>-1){
                this.array1 = [{title:'追书人气',number:''},{title:'读者存留',number:''},{title:'社区帖子',number:''},{title:'日更新字',number:''}];
                this.array2 = [this.latelyFollower,this.retentionRatio,this.postCount,this.serializeWordCount];
                this.wordCount = getSize(data.wordCount,0)+' 字';

            }else {
                this.array1 = [{title:'追书人气',number:''},{title:'读者存留',number:''},{title:'社区帖子',number:''}];
                this.array2 = [this.latelyFollower,this.retentionRatio,this.postCount];
                this.wordCount = data.chaptersCount +' 话';
            }
            this.longIntro = data.longIntro;
            this.originalPriceText = BookClassListStore.originalPriceText;
            if (comment[0]){
                //console.log(666,comment[0].comment);
                if (comment[0].comment.length>0){
                    this.commentTitle = comment[0].comment;
                    this.showRecommendedView= true;
                }else {
                    this.showRecommendedView= false;
                }
            }else {
                this.showRecommendedView= false;
            }

        }

        if (BookClassListStore.bookDetailLoading){
            return(
                <View style={{flex:1}}>
                    <View style={style.loadingView}>
                        <ActivityIndicator color={Colors.activeTintColor}/>
                    </View>
                    <LoadView/>
                </View>
            )
        }

        const title_opacity = this.title_opacity.interpolate({
            inputRange:[60,120],
            outputRange:[0,1]
        });

        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>

                <HeaderBar back
                           right
                           opacity={title_opacity}
                           styles={{backgroundColor:'#fff',borderBottomWidth:0}}
                           title={this.title}
                           source={Images.icon.comments}
                           onRightButtonPress={()=>this.props.navigate('BookComments',{id:this.props.id, transition: 'forHorizontal1',})}
                            />

                <ScrollView
                    onScroll={Animated.event([{
                        nativeEvent:{
                            contentOffset:{
                                y:this.title_opacity
                            }
                        }
                    }])}
                    scrollEventThrottle={300}
                    style={{flex:1}}
                    showsVerticalScrollIndicator={false}>
                    <View style={style.bookDetailViewTop}>
                        <ImageView uri={this.cover} styles={style.bookDetailViewTopLeftImg}/>
                        <View style={style.bookDetailViewTopTextView}>
                            <Text style={style.bookDetailViewTopTitleRight} numberOfLines={1}>{this.title}</Text>
                            <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                                <Text style={style.scoreLeftTitle}>{this.score}</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    emptyStar={Images.icon.start1}
                                    fullStar={Images.icon.start3}
                                    halfStar={Images.icon.start2}
                                    starSize={16}
                                    rating={this.score/2}
                                    containerStyle={{width:80}}
                                    />
                                <View style={{width:POXEL,height:15,backgroundColor:Colors.headerBottomColor,marginLeft:10,marginRight:10}}/>
                                <Text style={{color:Colors.movieText}}>{this.count}</Text>
                                <Text style={{color:Colors.movieText}}>人评</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',height:30}}>
                                <Text style={style.authorView}>{this.author}</Text>
                                <View style={{width:POXEL,height:15,backgroundColor:Colors.headerBottomColor,marginLeft:10,marginRight:10}}/>
                                <Text style={style.majorCate}>{this.majorCate}</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',height:30}}>
                                <Text style={style.wordCount}>{this.wordCount}</Text>
                                <View style={{width:POXEL,height:15,backgroundColor:Colors.headerBottomColor,marginLeft:10,marginRight:10}}/>
                                <Text style={style.wordCount}>{this.date}</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',height:30}}>
                                <Text style={style.wordCount}>{this.originalPriceText}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={style.bookDetailViewBottomView}>
                        <View style={{width:WIDTH-60}}>
                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            {this.array2.map((item,i)=>{
                                return(
                                    <View
                                        key={i}
                                        style={style.bookDetailViewBottomTitle}>
                                        <Text style={[style.bookDetailViewBottomTitleStyle,{fontSize:18,fontWeight:'600'}]}>{item}</Text>
                                    </View>
                                )
                            })}
                            </View>
                            <View  style={{flexDirection:'row',justifyContent:'space-around'}}>

                            {this.array1.map((item,i)=>{
                                return(
                                    <View
                                        key={i}
                                        style={style.bookDetailViewBottomTitle}>
                                        <Text style={style.bookDetailViewBottomTitleStyle}>{item.title}</Text>
                                    </View>
                                )
                            })}
                            </View>
                        </View>
                        <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>
                    </View>

                    {this.showRecommendedView?
                        <View style={style.recommendedView}>
                            <View style={style.recommended}>
                                <Text style={style.recommendedTitle}>编辑推荐</Text>
                                <Text style={style.recommendedContext} numberOfLines={4}>{this.commentTitle}</Text>
                            </View>
                        </View>
                        :null}
                    <View style={style.IntroductionView}>
                        <Text style={style.IntroductionTitle}>简介</Text>
                        <View style={style.longIntroView}>
                            <Text numberOfLines={4} style={style.longIntro}>{this.longIntro}</Text>
                        </View>
                        <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>
                    </View>

                    <View style={style.evaluationView}>
                        <Text style={style.IntroductionTitle}>热门短评</Text>
                           {evaluation_data.map((item,i)=>{

                               let context = ClearBr(item.content);

                               return(
                                   <View key={i} style={style.evaluationItemView}>
                                       <View style={style.evaluationItemTopView}>
                                           <View style={{flexDirection:'row',alignItems:'center',marginLeft:20}}>
                                               <ImageView uri={BaseApi.BookBase4+item.author.avatar} styles={style.evaluationItemImageView}/>
                                               <Text style={style.avatarTitle}>{item.author.nickname}</Text>
                                               <View style={style.avatarLvView}>
                                                   <Text style={style.avatarLv}>LV.{item.author.lv}</Text>
                                               </View>

                                           </View>
                                           <View>
                                               <StarRating
                                                   disabled={false}
                                                   maxStars={5}
                                                   emptyStar={Images.icon.start1}
                                                   fullStar={Images.icon.start3}
                                                   halfStar={Images.icon.start2}
                                                   starSize={12}
                                                   rating={item.rating}
                                                   containerStyle={{width:60,marginRight:30,marginBottom:10}}
                                               />
                                           </View>
                                       </View>
                                       <View style={style.avatarContentView}>
                                           <Text style={style.avatarContent}>{context}</Text>
                                       </View>
                                       <View style={{flexDirection:'row',justifyContent:'space-between',height:30,alignItems:'center'}}>
                                           <View style={{marginLeft:30}}>
                                               <Text style={style.avatarTitle}>{getTime(item.updated,this.nowDate)}</Text>
                                           </View>
                                           <View style={{marginRight:30,flexDirection:'row',alignItems:'center'}}>
                                               <Image source={Images.icon.praise} style={style.praise}/>
                                               <Text style={style.avatarTitle}>{item.likeCount}</Text>
                                           </View>
                                       </View>
                                   </View>
                               )
                           })}

                           <TouchableOpacity
                               onPress={()=>this.props.navigate('BookComments',{id:this.props.id, transition: 'forHorizontal1',})}
                               activeOpacity={1}
                               style={style.allEvaluation}>
                               <Text style={style.evaluation_total}>全部短评{evaluation_total}条></Text>
                           </TouchableOpacity>

                          <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>

                   </View>

                    <View style={style.evaluationView}>
                        <View style={{flexDirection:'row',alignItems:'center',height:60,marginTop:10}}>
                        <Text style={style.evaluationViewTitle}>猜你喜欢</Text>
                            <TouchableOpacity style={style.lookMoreView}><Text style={style.lookMoreTitle}>查看更多></Text></TouchableOpacity>
                        </View>
                        <FlatList
                            contentContainerStyle={{justifyContent:'center',alignItems:'center',marginBottom:30}}
                            data={BookClassListStore.recommend_data.slice(0,6)}
                            keyExtractor={this._keyExtractor}
                            showsVerticalScrollIndicator={false}
                            renderItem={this._renderItem}
                            numColumns={3}
                            bounces={false}

                        />
                        <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>
                    </View>

                    {this.showCopyright?
                    <View>
                        <Text style={style.IntroductionTitle}>图书信息</Text>
                        <View style={{flexDirection:'row',marginLeft:30}}>
                        <Text style={style.copyright}>版权:</Text><Text style={style.copyright}>{this.copyright}</Text>
                        </View>
                    </View>
                        :null}

                    <View style={{width:WIDTH,height:100}}/>

                </ScrollView>

                <View style={style.bookBottomView}>
                    <View style={style.ChaseView}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={style.dotChaseView}>
                            <Text style={style.dotChaseTitle}>不追了</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.ChaseView}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={()=>this.props.navigate('BookReaderScreen')}
                            style={[style.dotChaseView,{backgroundColor:'red'}]}>
                            <Text style={[style.dotChaseTitle,{color:'#fff'}]}>开始阅读</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{

        let recommend_image = BaseApi.BookBase4+item.cover;
        let recommend_title = item.title;
        let recommend_id = item._id;


        return(
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={()=>this.fetchDate(recommend_id)}
                style={style.recommend_book}>
                <ImageView uri={recommend_image} styles={style.recommend_image}/>
                <Text style={{fontSize:12,width:WIDTH/3-40}} numberOfLines={1}>{recommend_title}</Text>
            </TouchableOpacity>
        )
    }


}

const LoadView = ()=>{

    this.array1 = [{title:'追书人气',number:''},{title:'读者存留',number:''},{title:'社区帖子',number:''},{title:'日更新字',number:''}];

    return(
        <View style={{flex:1,backgroundColor:'#fff'}}>

            <HeaderBar back styles={{backgroundColor:'#fff',borderBottomWidth:0}}/>

            <View style={style.bookDetailViewTop}>
                <View style={style.bookDetailViewTopLeftImg}/>
                <View style={style.bookDetailViewTopTextView}>
                    <View style={style.bookDetailViewTopRight}/>
                    <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                        <View style={style.scoreLeft}/>
                        {array.map((item,i)=>{
                            return(
                                <Image key={i} source={Images.icon.my_evaluate_star_dark} style={style.score}/>
                            )
                        })}
                    </View>
                    <View style={{flexDirection:'row',height:20,alignItems:'center'}}>
                        <View style={[style.scoreLeft,{width:50}]}/>
                        <View style={[style.scoreLeft,{width:50}]}/>
                    </View>
                    <View style={[style.scoreLeft,{width:WIDTH/2-10,marginTop:15}]}/>
                    <View style={[style.scoreLeft,{width:WIDTH/2-40,marginTop:15}]}/>
                    <View style={[style.scoreLeft,{width:WIDTH/2-10,marginTop:15}]}/>
                </View>
            </View>
            <View style={style.bookDetailViewBottomView}>

                <View style={{width:WIDTH-60,flexDirection:'row'}}>
                    {this.array1.map((item,i)=>{
                        return(
                            <View
                                key={i}
                                style={style.bookDetailViewBottomTitle}>
                                <Text style={style.bookDetailViewBottomTitleStyle}>{item.title}</Text>
                            </View>
                        )
                    })}
                </View>

                <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>

            </View>

            <View style={style.IntroductionView}>
                <Text style={style.IntroductionTitle}>简介</Text>
                <View style={style.IntroductionViewItem}/>
                <View style={[style.IntroductionViewItem,{width:WIDTH-80}]}/>
                <View style={[style.IntroductionViewItem,{width:WIDTH-100}]}/>
                <View style={[style.IntroductionViewItem,{width:WIDTH-100}]}/>
            </View>

            <View style={style.bookBottomView}>
                <View style={style.ChaseView}>
                    <View style={style.dotChaseView}>
                        <Text style={style.dotChaseTitle}>不追了</Text>
                    </View>
                </View>
                <View style={style.ChaseView}>
                    <View style={[style.dotChaseView,{backgroundColor:'red'}]}>
                        <Text style={[style.dotChaseTitle,{color:'#fff'}]}>开始阅读</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

export function getTime(faultDate,completeTime) {


    let time;
    let stime  = Date.parse(new Date(faultDate));
    let etime = Date.parse(new Date(completeTime));
    let usedTime  = etime-stime;
    let days = Math.floor(usedTime/(24*3600*1000));
    //计算出小时数
    let leave1 = usedTime%(24*3600*1000);
    let hours = Math.floor(leave1/(3600*1000));
    //计算相差分钟数
    let leave2 = leave1%(3600*1000);
    let minutes =Math.floor(leave2/(60*1000));
    if (days>365){
        time = (days/365).toFixed(0)+'年前'
    }else if (days>=30){
        time = (days/30).toFixed(0)+'月前';
    }
    else if (days>=1 && days<=30){
        time = days + "天前"

    } else {
        if (hours<24 && hours>1){
            time = hours + "小时前";
        }else {
            if (minutes ===0){
                time = '刚刚';
            }else {
                time = minutes + "分钟前";
            }
        }
    }
    return time;
}

export function getSize(number,decimal) {

    let size ;

    if (number>10000){
        size = (number/10000).toFixed(decimal) + "万"
    }else {
        size = number
    }
    return size;
}

//去除换行
function ClearBr(key) {
    key = key.replace(/<\/?.+?>/g,"");
    key = key.replace(/[\r\n]/g, "");
    return key;
}

export {
    BookDetailView
}