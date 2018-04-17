/**
 * @flow
 */
import React,{
    NetInfo,
} from 'react-native';

const NOT_NETWORK = "网络不可用，请稍后再试";
const TAG_NETWORK_CHANGE = "NetworkChange";

/***
 * 检查网络链接状态
 * @param callback
 */
const checkNetworkState = (callback:any) =>{
    NetInfo.isConnected.fetch().done(
        (isConnected) => {
            callback(isConnected);
        }
    );

    setInterval(() => {
        NetInfo.isConnected.fetch().then(isConnected => console.log('isConnected?', isConnected));
    }, 250);

}

/***
 * 移除网络状态变化监听
 * @param tag
 * @param handler
 */
const removeEventListener = (tag:any,handler:any) => {
    NetInfo.isConnected.removeEventListener(tag, handler);

}

/***
 * 添加网络状态变化监听
 * @param tag
 * @param handler
 */
const addEventListener = (tag:any,handler:any)=>{
    NetInfo.isConnected.addEventListener(tag, handler);
    //NetInfo.isConnected.addEventListener('change', Function.prototype);
};


export {
    checkNetworkState,
    addEventListener,
    removeEventListener,
    NOT_NETWORK,
    TAG_NETWORK_CHANGE,
}