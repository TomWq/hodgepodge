import React from 'react';
import {View,Text,ScrollView} from 'react-native';
import {observer} from 'mobx-react'
import {BookClassListStore} from "../../store";
import {HeaderBar} from "../../component/headerBar";
import {ClassListViewTopView} from "./classListViewTopView";
import {ClassBookListView} from "./classBookListView";

@observer
class ClassListView extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.gender = this.props.navigation.state.params.gender;
        this.major =  this.props.navigation.state.params.major;
        this.type = 'hot';
        this.minor = '';
        this.start = 0;

        this.state={
            show:true
        }

      }

    componentDidMount() {
        //BookClassListStore.fetchClassData();
        this.fetchData(this.gender,this.type, this.major,this.minor,);
        BookClassListStore.fetchClassSmall(this.gender,this.major);

        if (this.gender ==='picture' || this.gender==='press'){
           setTimeout(()=>{
               this.setState({
                   show:false
               })
           },0)
        }
    }


    fetchData=(gender,type,major,minor,start)=>{
        BookClassListStore.fetchData(gender,type,major,minor,start);
    };

    render(){

        return(
            <View style={{flex:1}}>
                <HeaderBar title={this.major} back styles={{borderBottomWidth:this.state.show?0:POXEL}}/>
                {this.state.show?
                <ClassListViewTopView
                    classType={BookClassListStore.classSmallData.slice(0)}
                    isClassType={BookClassListStore.isClassType}
                    onChoose={(item)=>this.onChoose(item)}
                    onChooseClass={(item)=>this.onChooseClass(item)}/>
                    :null}
                 <ClassBookListView
                        jump={(id,bookTitle)=>this.jump(id,bookTitle)}
                        data={BookClassListStore.data.slice(0)}
                        onEndReached={this.onEndReached}/>
            </View>
        )
    }
    onChoose(item){
        this.type = item.label;
        this.fetchData(this.gender,this.type,this.major,this.minor)
    }

    onChooseClass(item){
        this.minor = item;
        this.fetchData(this.gender,this.type,this.major,this.minor)
    }

    onEndReached=()=>{
        this.start += 20;
        console.log(this.start);
        BookClassListStore.fetchMoreData(this.gender,this.type,this.major,this.minor,this.start)

    };
    jump(id,bookTitle){
        this.props.navigation.navigate('BookDetails',{id:id,bookTitle:bookTitle})
    }
}

export {
    ClassListView
}

