import React from 'react';
import {View,Text,Modal} from 'react-native';
import {style} from './style';
import {ScrollImage} from "./scrollImage";

class Mine extends React.Component{

    state = {
        modalVisible: false,
    };

    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text onPress={this.onPress}>点击</Text>

                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <ScrollImage onClose={this.onClose}/>
                </Modal>
            </View>
        )
    }

    onClose=()=>{
        this.setModalVisible(false);
    }

    onPress=()=>{
        this.setModalVisible(true);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
}

export {
    Mine
}