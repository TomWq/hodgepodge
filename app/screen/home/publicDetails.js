import React from 'react';
import {View,Image,ScrollView,SafeAreaView} from 'react-native';
import {style} from "./style";
import {Images} from "../../assest";
import MyBackButton from '../../component/myBackButton';
import {TopBarView,Plot} from './movieDetailsTopView';
import MovieDetailsActor from './movieDetailsActor'
import {MovieDetailsVideo} from './movieDetailsVideo';

const PublicDetails = (props)=>{

    const {uri,rating,titleCn,titleEn,runTime,type,date,location,director,
        commonSpecial,isIMAX3D,isIMAX,plot,actors,navigation,video} = props;


    return(

            <View style={style.container}>
            <ScrollView>
                <TopBarView uri={uri}
                            rating={rating}
                            titleCn={titleCn}
                            titleEn={titleEn}
                            runTime={runTime}
                            type={type}
                            date={date}
                            location={location}
                            isIMAX3D={isIMAX3D}
                            isIMAX={isIMAX}
                            commonSpecial={commonSpecial}/>
                <Segmentation/>
                <Plot plot={plot}/>
                <Segmentation/>
                <MovieDetailsActor
                    navigation={navigation}
                    director={director}
                    actorDate={actors}/>
                <Segmentation/>
                {/*<MovieDetailsVideo*/}
                    {/*videoUrl={video.hightUrl}*/}
                    {/*videoCover={video.img}*/}
                {/*/>*/}
            </ScrollView>
            <TopButtonView/>
            </View>

    );
};


const TopButtonView = ()=>(

    <View style={style.topButtonView}>
        <MyBackButton>
            <Image source={Images.icon.back} style={style.movieDetailTopView_Back}/>
        </MyBackButton>
        <Image source={Images.icon.start} style={style.movieDetailTopView_Start}/>
    </View>
);

const Segmentation=()=><View style={style.segmentation}/>;

export {
    PublicDetails
}