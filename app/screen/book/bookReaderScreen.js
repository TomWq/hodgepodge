import React from 'react';
import {View,ScrollView,Text,FlatList,TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {BookClassListStore} from "../../store/bookClassListStore";

@observer
class BookReaderScreen extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
      }

    componentDidMount() {

        const chapter_data =  BookClassListStore.chapter_data.slice(0);
        let link = chapter_data[1].link;
        BookClassListStore.chapterFetch(link);

    }


     dealArray=(context)=>{

         let array = [];

          if (context.length>0){
             let number =  Math.ceil(context.length/500);
              console.log(number);

              for (let i=0;i<number;i++){
                  let data = context.slice(i*500,500*(i+1));
                  array.push(data)
              }

              console.log(array)

          }
          //let data = context.slice(0,500);
          //let data1 = context.slice(500,1000);

         // console.log(data,data1)
         return array

     };

     contentFormat = (content) => {
        let fontCount = parseInt(WIDTH/ 18 - 1);
        let fontLines = parseInt((HEIGHT - 100) / 34)
        const length = content.length
        let array = []
        let x = 0, y, m = 0
        while (x < length) {
            let _array = []
            for (let i = 0; i <= fontLines; i++) {
                let str = content.substring(x, x + fontCount)
                if (str.indexOf('@') !== -1) {
                    y = x + str.indexOf('@') + 1;
                    _array[i] = content.substring(x, y).replace('@', '')
                    x = y
                    continue
                } else {
                    y = x + fontCount;
                    _array[i] = content.substring(x, y)
                    x = y
                    continue
                }
            }
            array[m] = _array
            m++
        }
        return array
    }

    render(){

        let _content = '\u3000\u3000' + BookClassListStore.chapter.replace(/\n/g, '@\u3000\u3000');
        let data = this.contentFormat(_content)

        //let data =  this.contentFormat(BookClassListStore.chapter);

       return(

           <View style={{flex:1}}>

               <ScrollView
                   ref='scrollView'
                   scrollEventThrottle={800}
                   horizontal={true}
                   showsHorizontalScrollIndicator={false}
                   showsVerticalScrollIndicator={false}
                   pagingEnabled={true} >
                   <FlatList
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
                          style={{height: HEIGHT, width: WIDTH}}
                          activeOpacity={1}>
                          <View
                              style={{flex: 1, justifyContent: 'space-between'}}>
                              <View style={{alignSelf: 'center', flex: 1}}>
                                  <Text style={{ color: '#604733',
                                      fontSize: 18,
                                      lineHeight:34,}}>
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