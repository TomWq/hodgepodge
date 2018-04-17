import React from 'react';
import {FlatList,View} from 'react-native';
import {DefaultScreen} from "./defaultScreen";

const PublicList=(props)=>{

    const {data,numColumns,onRefresh,ListHeaderComponent,ListFooterComponent,loading,renderItem,onEndReached} = props;


    return(

        loading?<DefaultScreen/>:

        <FlatList
            style={{paddingTop:10}}
            data={data.slice(0)}
            keyExtractor={(item,i)=>item+i}
            numColumns={numColumns}
            onRefresh={onRefresh}
            renderItem={renderItem}
            initialNumToRender={10}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={ListFooterComponent}
            ListHeaderComponent={ListHeaderComponent}
        />

    )
};


const ListEmptyComponent =(props)=>{
    return(
        <View/>
    )
};

export {
    PublicList
}
