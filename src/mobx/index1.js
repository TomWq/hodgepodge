import React from 'react';
import {View,Image,Text} from 'react-native';

class Login extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state={
              isLogin:false , //定义是否登录的状态,默认没登录 false
              touxiang:require('.....'), //默认头像地址,
              title:'登录' //因为默认没有登录,所以显示登录按钮,
          }
      }

    componentDidMount() {
        //执行你的网络请求后拿到的数据
        //.....替换头像昵称等部位,并且替换登录按钮为退出登录
        this.setState({
            //.....
        })

    }

    render(){
        return(


            <View style={{flex:1}}>
                <Image source={this.state.touxiang}/>
                <Text onPress=>{this.state.title}</Text>
            </View>
        )
    }

}




