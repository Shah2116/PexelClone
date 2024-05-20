import { Dimensions } from "react-native";

 const {height: deviceHeight, width:deviceWidth} = Dimensions.get('window')

const getImageSize =({height, width})=> {
    if(height>width){
        return 300;
    }else if (width> height){
        return 250;
    }else{
        return 200;
    }
}

export const getColoum =() => {
    if(deviceWidth>= 1024){
        return 4;
    } else if (deviceWidth >= 768){
        return 3;
    } else {
        return 2;
    }
}