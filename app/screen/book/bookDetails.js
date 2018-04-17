import React from 'react';
import {View,ScrollView,Animated} from 'react-native';
import {observer} from 'mobx-react';
import {BookDetailView} from './bookDetailView';
import {BookComments} from './bookComments';


@observer
class BookDetails extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        this.id = this.props.navigation.state.params.id;
        this.bookTitle = this.props.navigation.state.params.bookTitle;
        this.title_opacity = new Animated.Value(0)
      }

    render(){

        const {navigate} = this.props.navigation;

        const title_opacity = this.title_opacity.interpolate({
            inputRange:[0,WIDTH/2,WIDTH],
            outputRange:[0,0.5,1]
        });

        return(
           <View style={{flex:1,flexDirection:'row'}}>
               {/*<ScrollView*/}
                   {/*ref={viewPager => {this.scrollView = viewPager;}}*/}
                   {/*horizontal={true}*/}
                   {/*pagingEnabled={true}*/}
                   {/*onScroll={Animated.event([{*/}
                       {/*nativeEvent:{*/}
                           {/*contentOffset:{*/}
                               {/*x:this.title_opacity*/}
                           {/*}*/}
                       {/*}*/}
                   {/*}])}*/}
                   {/*scrollEventThrottle={200}*/}
                   {/*showsHorizontalScrollIndicator={false}>*/}
                   {/*<Animated.View style={{opacity:title_opacity,flex:1}}>*/}
                   {/**/}
                   {/*</Animated.View>*/}
               {/*</ScrollView>*/}
               <BookDetailView navigate={navigate} id={this.id} openEvaluationView={this.openEvaluationView}/>

               {/*<BookComments*/}
                   {/*scrollEventThrottle={200}*/}
                   {/*navigate={navigate} id={this.id}*/}
                   {/*onClose={this.onClose}/>*/}
           </View>
        )
    }

    openEvaluationView=()=>{
        this.scrollView.scrollToEnd({animated: true})
    };

    onClose=()=>{
        this.scrollView.scrollTo({x:0,y:0,animated:true})
    }

}


export {
    BookDetails
}