/**
 * @flow
 */
import React from 'react';
import {View,Image,Text} from 'react-native';
import {style} from './style';
import {observer} from 'mobx-react';
import {MovieStore} from '../../store';
import {PublicList} from "./publicList";
import {RenderItemView} from "./defaultView";


@observer
class Ticket extends React.Component<any,{}>{

    componentDidMount() {
        MovieStore.fetchTicketMovieData(290);

    }

    renderItem = ({item})=> <RenderItemView
        onPress={()=>this.props.screenProps.navigate('MovieDetails',{movieId:item.movieId})}
        uri={item.img} title={item.titleCn} ratingFinal={item.ratingFinal} isIMAX3D={item.isIMAX3D}
        isNew={item.isNew} isIMAX={item.isIMAX}/>


    render(){

        return(
            <View style={style.container}>
                <PublicList
                    numColumns={3}
                    data={MovieStore.ticketMovieData}
                    loading={MovieStore.ticketLoading}
                    renderItem={this.renderItem}/>
            </View>
        )
    }



}

export {
    Ticket
}