/**
 * @flow
 */
import React from 'react';
import {View,Text,Image} from 'react-native';
import {style} from './style';
import {observer} from 'mobx-react';
import {MovieStore} from "../../store";
import {PublicList} from "./publicList";
import {RenderItemView} from "./defaultView";
@observer
class Immediately extends React.Component<any,{}>{

    componentDidMount() {
        MovieStore.fetchImmediatelyMovieData(290)
    }

    renderItem = ({item})=><RenderItemView
        uri={item.image} title={item.title} will={true}
        onPress={()=>this.props.screenProps.navigate('MovieDetails',{movieId:item.id})}/>

    render(){

        return(
            <View style={style.container}>
                <PublicList
                    numColumns={3}
                    data={MovieStore.immediatelyMovieData}
                    loading={MovieStore.immediatelyLoading}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }

}

export {
    Immediately
}