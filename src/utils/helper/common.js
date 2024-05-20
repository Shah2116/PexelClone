import { Dimensions } from "react-native";

 const {height: deviceHeight, width:deviceWidth} = Dimensions.get('window')


export const getColoum =() => {
    if(deviceWidth>= 1024){
        return 4;
    } else if (deviceWidth >= 768){
        return 3;
    } else {
        return 2;
    }
}

export const getImageSize =(height, width) => {
    if(width > height) {
        return 250;
    }else if (width < height) {
        return 300;
    }else {
        return 200;
    }
}