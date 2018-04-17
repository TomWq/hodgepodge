import React from 'react';
import {View,ScrollView,Text,FlatList,TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {BookClassListStore} from "../../store/bookClassListStore";
import {style} from "./style";

@observer
class BookReaderScreen extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
      }

    componentDidMount() {

        const chapter_data =  BookClassListStore.chapter_data.slice(0);
        let link = chapter_data[2].link;

        BookClassListStore.chapterFetch(link);


    }


     dealArray=(context)=>{


         let array = [];
          if (context.length>0){
             let number =  Math.ceil(context.length/300);
              console.log(number);
              for (let i=0;i<number;i++){
                  let data = context.slice(i*300,300*(i+1));
                  array.push(data)
              }
              console.log(array)

          }
          //let data = context.slice(0,500);
          //let data1 = context.slice(500,1000);

         // console.log(data,data1)
         return array

     };

    render(){

        let _content = '\u3000\u3000' + BookClassListStore.chapter;
        let data = this.dealArray(_content);


        //let data =  this.contentFormat(BookClassListStore.chapter);

       return(

           <View style={{flex:1}}>

               <ScrollView
                   style={style.bookReaderView}
                   ref='scrollView'
                   scrollEventThrottle={800}
                   horizontal={true}
                   contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
                   showsHorizontalScrollIndicator={false}
                   showsVerticalScrollIndicator={false}
                   pagingEnabled={true} >
                   <FlatList
                       style={style.bookReaderView}
                       contentContainerStyle={style.bookReaderViewItem}
                       data ={data}
                       renderItem={this.renderItem}
                       pagingEnabled={true}
                       keyExtractor={(item, index)=>'index'+index+item}
                       horizontal={true}
                       showsHorizontalScrollIndicator={false}
                       showsVerticalScrollIndicator={false}
                   />
               </ScrollView>


           </View>


       )
    }

    renderItem=({item})=>{

              return(
                  <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                          style={{height: HEIGHT, width: WIDTH,padding:20}}
                          activeOpacity={1}>
                          <View
                              style={{flex: 1}}>
                              <View style={{alignSelf: 'center', flex: 1}}>
                                  <Text style={{ color: '#604733',
                                      fontSize: 18,lineHeight:30}}>
                                      {item}
                                  </Text>
                              </View>
                          </View>
                      </TouchableOpacity>
                  </View>
        )
    }
}



export {
    BookReaderScreen
}

// cAtzydNgRVrw
// //cAtzydNgRVrw   //teddysun.com
//
// {
//     "server":"0.0.0.0",
//     "port_password":{
//     "3333":"qiang123456",
//         "6666":"qiang123456"
// },
//     "timeout":600,
//     "method":"aes-256-cfb"
// }