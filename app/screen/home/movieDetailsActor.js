import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {style} from "./style";
import {ImageView} from "./defaultView";
import {String} from "../../assest";

let actorDate,director;
export default class MovieDetailsActor extends React.Component{


    constructor(props){
        super(props);

        actorDate = this.props.actorDate.slice(0);
        director = this.props.director;

        actorDate.insert(0,director)

    }


    render(){

        //console.log(this.props.actorDate.slice(0));


        return(
            <View style={style.actorView}>
                <Carousel
                    data={actorDate}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={WIDTH}
                    itemWidth={WIDTH/3}
                    hasParallaxImages={true}
                    inactiveSlideScale={0.6}
                    inactiveSlideOpacity={0.8}
                    autoplay={false}
                    loop={false}
                    layout={'default'}
                    firstItem={1}/>

                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('ActorView')}
                    style={style.moreActorView}>
                    <Text style={style.moreActorViewTitle}>{String.moreActorView}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    _renderItemWithParallax=({item})=> {

        return (
            <TouchableOpacity
                onPress={()=>this.onPress(item)}
                activeOpacity={0.9}
                style={style.actorItemView}>
                <ImageView
                    styles={style.actorItemImage}
                    uri={item.img}/>
                <Text style={style.actorItemTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={style.actorItemTitle} numberOfLines={1}>{item.nameEn}</Text>
                {item.roleName?
                <Text style={style.actorItemTitle} numberOfLines={1}>饰: {item.roleName}</Text>
                    :null}
            </TouchableOpacity>

        )
    }

    onPress(item){
        console.log(item);
        if (item.actorId){
            //console.log(item.actorId);
            this.props.navigation.navigate('ActorDetails',{itemId:item.actorId})
        }else {
            //console.log(item.directorId)
            this.props.navigation.navigate('ActorDetails',{itemId:item.directorId})
        }
    }

}

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};


