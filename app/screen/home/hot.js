/**
 * @flow
 */
import React from 'react';
import {View,Image,Text,Modal,StatusBar} from 'react-native';
import {style} from './style';
import {observer} from 'mobx-react';
import {MovieStore} from "../../store";
import {PublicList} from "./publicList";
import {RenderItemView} from "./defaultView";
@observer
class Hot extends React.Component<any,{}>{

    componentDidMount() {
        MovieStore.fetchHotMovieData(290);
    }

    renderItem = ({item})=><RenderItemView
        uri={item.img} title={item.tCn}
        ratingFinal={item.r} isIMAX3D={item.isIMAX3D}
        isNew={item.isNew} isIMAX={item.isIMAX}
        onPress={()=>this.props.screenProps.navigate('MovieDetails',{movieId:item.id})}/>

    render(){

        return(
            <View style={style.container}>
                <PublicList
                    numColumns={3}
                    data={MovieStore.hotMovieData}
                    loading={MovieStore.hotLoading}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

export {
    Hot
}