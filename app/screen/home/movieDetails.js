import React from 'react';
import {StatusBar} from 'react-native';
import {toJS} from 'mobx'
import {observer} from 'mobx-react';
import {DefaultMovieDetailScreen} from "./defaultMovieDetailScreen";
import {MovieStore} from "../../store";
import {PublicDetails} from "./publicDetails";


@observer
class MovieDetails extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.id = this.props.navigation.state.params.movieId;
           // console.log(this.id)
      }

    componentDidMount() {

        MovieStore.fetchMovieDetailData(290,this.id);

        MovieStore.fetchActorData(this.id);

        StatusBar.setBarStyle('light-content'),
            StatusBar.setBackgroundColor('rgba(0,0,0,0)')

    }



    render(){

        const data = MovieStore.movieDetailData;

        if (MovieStore.movieDetailLoading){
            return <DefaultMovieDetailScreen/>
        }

        if (data){

            let basic = data.basic;

            return(
                <PublicDetails
                    uri={basic.img}
                    rating={basic.overallRating}
                    titleCn={basic.nameleCn}
                    titleEn={basic.nameEn}
                    runTime={basic.mins}
                    type={basic.type}
                    date={basic.showDay}
                    location={basic.releaseArea}
                    commonSpecial={basic.commentSpecial}
                    isIMAX3D={basic.isIMAX3D}
                    isIMAX={basic.isIMAX}
                    plot={basic.story}
                    director={basic.director}
                    actors={basic.actors}
                    navigation={this.props.navigation}
                    video={basic.video}
                />
            )

        }
    }
}

export {
    MovieDetails
}