import React from 'react';
import {View,StatusBar} from 'react-native';
import {observer} from 'mobx-react';
import {BookClassStore} from "../../store";
import {ClassBookView} from "./classBookView";
import {toJS} from 'mobx';
import {style} from "./style";
import {HeaderBar} from "../../component/headerBar";
import {Loading} from "../../component/laoding";

@observer
class ClassBook extends React.Component{

    componentDidMount() {
        BookClassStore.fetchData()
    }

    render(){

        let sections = toJS(BookClassStore.data);

        sections.forEach((item,i)=>{
            console.log(item)
        })

        const {navigate} = this.props.navigation;

        if (sections){
            return(
                <View style={style.container}>
                 <StatusBar translucent={true} backgroundColor='rgba(0,0,0,0)' barStyle='dark-content'/>
                 <HeaderBar title='图书分类' back={false} showBottom/>
                    {BookClassStore.loading? <Loading/>:
                        <ClassBookView
                            sections={sections}
                            navigate={navigate}/>}
                </View>
            )
        }

    }

};

export {
    ClassBook
}