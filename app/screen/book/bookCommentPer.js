import React from 'react';
import {View,ScrollView,Text,Image,TextInput,} from 'react-native';
import {HeaderBar} from "../../component/headerBar";
import {style} from "./style";
import {ImageView} from "../home/defaultView";
import StarRating from 'react-native-star-rating';
import {Images} from "../../assest/images";
import {Colors} from "../../assest/colors";
class BookCommentPer extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          //content:content,avatar:avatar,created:created,lv:lv,nickname:nickname,title:title
          const params = this.props.navigation.state.params;
          this.content = params.content;
          this.avatar = params.avatar;
          this.created = params.created;
          this.lv = params.lv;
          this.nickname = params.nickname;
          this.title = params.title;
          this.rating= params.rating;
          this.cover = params.cover;
          this.bookTitle =params.bookTitle;
          this.state = {};
          console.log(this.content)


      }

    render(){

        return(
            <View style={{flex:1}}>
                <HeaderBar title='详情' back/>
                <ScrollView
                    contentContainerStyle={{paddingLeft:20,paddingRight:20}}
                >
                    <View style={[style.bookReviewScreenViewBottom,{marginTop:20}]}>
                        <ImageView uri={this.avatar} styles={style.evaluationItemImageView}/>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={style.nickname}>{this.nickname}</Text>
                                <View style={style.avatarLvView}>
                                    <Text style={style.avatarLv}>lv.{this.lv}</Text>
                                </View>
                            </View>
                            <Text style={style.wordCount1}>{this.created}</Text>
                        </View>
                    </View>
                    <Text style={[style.bookCommentPerTopTitle,{marginTop:20}]} numberOfLines={2}>{this.title}</Text>
                    <Text style={[style.wordCount,{lineHeight:25,marginTop:20}]}>{this.content}</Text>
                    {this.rating?
                    <View style={style.bookCommentPerBottom}>
                        <ImageView uri={this.cover} styles={style.leftBookView} />
                        <View style={{marginLeft:20,height:100}}>
                            <Text style={[style.bookDetailViewTopTitleRight,{fontWeight:'500',fontSize:18,marginBottom:10}]}>{this.bookTitle}</Text>
                            <Text style={[style.authorView,{color:Colors.movieText,fontSize:14,marginBottom:10}]}>楼主打分</Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                emptyStar={Images.icon.start1}
                                fullStar={Images.icon.start3}
                                halfStar={Images.icon.start2}
                                starSize={18}
                                rating={this.rating}
                                containerStyle={{width:60,marginBottom:5}}/>
                        </View>
                    </View>:null
                    }


                    <View style={{width:WIDTH,height:110}}/>

                </ScrollView>
                <View style={style.commentsView}>
                    <Image source={Images.icon.chapter_review_send} style={style.chapter_review_send}/>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder='添加评论...'
                        placeholderTextColor={Colors.movieText}
                        style={{width:WIDTH-120,height:60,paddingLeft:20}}
                    />

                    <View style={style.sendView}>
                        <Text style={{color:'#fff'}}>发送</Text>
                    </View>
                </View>

            </View>
        )
    }

}
export {
    BookCommentPer
}