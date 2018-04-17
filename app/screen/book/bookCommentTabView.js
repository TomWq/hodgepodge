import React from 'react';
import {View,ScrollView,Text,TouchableOpacity,FlatList,Image} from 'react-native';
const array1 = [{title:'讨论'},{title:'书评'},{title:'短评'}];
import {style} from "./style";
import {BookClassListStore} from "../../store/bookClassListStore";
import {observer} from 'mobx-react';
import {Images} from "../../assest/images";
import {BaseApi} from "../../assest/api";
import {getTime} from "./bookDetailView";
import {ImageView} from "../home/defaultView";
import {Colors} from "../../assest/colors";
import StarRating from 'react-native-star-rating';

class DiscussScreen extends React.Component{



    render(){

        console.log(this.props.bookComments)

        return(
            <FlatList
                data={this.props.bookComments}
                keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                bounces={false}
                scrollEnabled={false}
                onScroll={this._onScroll}
                ListHeaderComponent={this.ListHeaderComponent}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />
        )
    }

    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{

        let title = item.title;
        let created = getTime(item.created,new Date());
        let content = item.content;
        let likeCount = item.likeCount;
        let commentCount =item.commentCount;
        let avatar = BaseApi.BookBase4 +item.author.avatar;
        let nickname = item.author.nickname;
        let lv = item.author.lv;

        const params ={
            content:content,avatar:avatar,created:created,lv:lv,nickname:nickname,title:title
        };

        return(
           <TouchableOpacity
               activeOpacity={0.9}
               onPress={()=> this.props.navigate('BookCommentPer',params)}
               style={style.bookReviewScreenView}>
               <Text style={style.bookReviewScreenViewTitle} numberOfLines={2}>{title}</Text>
               <View style={style.bookReviewScreenViewBottom}>
                   <ImageView uri={avatar} styles={style.evaluationItemImageView}/>
                   <View>
                       <View style={{flexDirection:'row'}}>
                           <Text style={style.nickname}>{nickname}</Text>
                           <View style={style.avatarLvView}>
                           <Text style={style.avatarLv}>lv.{lv}</Text>
                           </View>
                       </View>
                       <Text style={style.wordCount1}>{created}</Text>
                   </View>
               </View>
               <View style={style.bookReviewScreenViewRight}>
                   <Image source={Images.icon.zan} style={style.commentTopViewLeft1}/>
                   <Text style={[style.wordCount1,{fontSize:13,marginRight:15}]}>{likeCount}</Text>
                   <Image source={Images.icon.message} style={style.commentTopViewLeft1}/>
                   <Text  style={[style.wordCount1,{fontSize:13}]}>{commentCount}</Text>
               </View>
           </TouchableOpacity>
        )
    };
    ListHeaderComponent=()=>{
        return(
            <View style={style.commentTopView}>
                <Image style={style.commentTopViewLeft} source={Images.icon.message}/>
                <Text style={style.commentTopViewRight}>{BookClassListStore.bookCommentsTotal}条讨论</Text>
            </View>
        )
    };


}

const ItemSeparatorComponent=()=>(
    <View style={style.itemSeparatorComponent}>
        <View style={{width:WIDTH-40,height:POXEL,backgroundColor:Colors.defaultColor}}/>
    </View>
)

class BookReviewScreen extends React.Component{

    render(){

        return(
            <FlatList
                data={this.props.bookReviewsComments}
                keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                bounces={false}
                ListHeaderComponent={this.ListHeaderComponent}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />
        )
    }

    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{

        let title = item.title;
        let content = item.content;
        let avatar = BaseApi.BookBase4 +item.author.avatar;
        let nickname = item.author.nickname;
        let lv = item.author.lv;
        let created = getTime(item.created,new Date());
        let yes = item.helpful.yes + '有用';
        let rating = item.rating;
        let state = item.state;  //"distillate" 精品
        let id = item.author._id;
        let cover = this.props.cover;
        let bookTitle = this.props.title;

        const params ={
            content:content,avatar:avatar,created:created,lv:lv,nickname:nickname,title:title,
            rating:rating,cover:cover,bookTitle:bookTitle
        };

        return(
            <TouchableOpacity
                onPress={()=> this.props.navigate('BookCommentPer',params)}
                activeOpacity={0.9}
                style={[style.bookReviewScreenView,{height:200}]}>
                <Text style={style.bookReviewScreenViewTitle} numberOfLines={1}>{title}</Text>
                <Text numberOfLines={3} style={style.bookReviewScreenContent}>{content}</Text>
                <View style={style.bookReviewScreenViewBottom}>
                    <ImageView uri={avatar} styles={style.evaluationItemImageView}/>
                    <View style={{width:WIDTH}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={style.nickname}>{nickname}</Text>
                            <View style={style.avatarLvView}>
                                <Text style={style.avatarLv}>lv.{lv}</Text>
                            </View>
                        </View>
                        <Text style={style.wordCount1}>{created}</Text>

                        <View style={style.ratingView}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                emptyStar={Images.icon.start1}
                                fullStar={Images.icon.start3}
                                halfStar={Images.icon.start2}
                                starSize={14}
                                rating={rating}
                                containerStyle={{width:60,marginBottom:5}}/>
                            <Text style={style.wordCount1}>{yes}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    ListHeaderComponent=()=>{
        return(
            <View style={style.commentTopView}>
                <Image style={style.commentTopViewLeft} source={Images.icon.message}/>
                <Text style={style.commentTopViewRight}>{BookClassListStore.bookReviewsTotal}条书评</Text>
            </View>
        )
    }
}

class ShortReviewScreen extends React.Component{

    render(){
        return(
            <FlatList
                data={this.props.bookShortComments}
                keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                bounces={false}
                ListHeaderComponent={this.ListHeaderComponent}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />
        )
    }

    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{

        let nickname = item.author.nickname;
        let lv = item.author.lv;
        let avatar = BaseApi.BookBase4 +item.author.avatar;
        let rating = item.rating;
        let updated = getTime(item.updated,new Date());
        let likeCount = item.likeCount;
        let content = item.content
        return(
            <View style={[style.evaluationItemView,{backgroundColor:'#fff'}]}>
                <View style={style.evaluationItemTopView}>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:20}}>
                        <ImageView uri={avatar} styles={style.evaluationItemImageView}/>
                        <Text style={style.avatarTitle}>{nickname}</Text>
                        <View style={style.avatarLvView}>
                            <Text style={style.avatarLv}>LV.{lv}</Text>
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
                            rating={rating}
                            containerStyle={{width:60,marginRight:30,marginBottom:10}}
                        />
                    </View>
                </View>
                <View style={style.avatarContentView}>
                    <Text style={style.avatarContent}>{content}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',height:30,alignItems:'center',marginBottom:10}}>
                    <View style={{marginLeft:30}}>
                        <Text style={style.avatarTitle}>{updated}</Text>
                    </View>
                    <View style={{marginRight:30,flexDirection:'row',alignItems:'center'}}>
                        <Image source={Images.icon.praise} style={style.praise}/>
                        <Text style={style.avatarTitle}>{likeCount}</Text>
                    </View>
                </View>
            </View>
        )
    };
    ListHeaderComponent=()=>{
        return(
            <View style={style.commentTopView}>
                <Image style={style.commentTopViewLeft} source={Images.icon.message}/>
                <Text style={style.commentTopViewRight}>{BookClassListStore.bookShortCommentsSum}条短评</Text>
            </View>
        )
    }
}






export {
    DiscussScreen,
   BookReviewScreen,
  ShortReviewScreen,
}