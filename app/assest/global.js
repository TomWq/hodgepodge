import {Dimensions,StyleSheet,Platform} from 'react-native';
global.IOS = (Platform.OS ==='ios');
global.ANDROID = (Platform.OS ==='android');
global.WIDTH = Dimensions.get('window').width;
global.HEIGHT = Dimensions.get('window').height;
global.POXEL = StyleSheet.hairlineWidth;