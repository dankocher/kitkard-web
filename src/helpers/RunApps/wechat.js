import {Platform} from "react-native";

export const wechat = (value) => {

    if (Platform.OS === 'ios')
    {
        return `wechat://openid=${value}`;
    }
    else
    {
        return `wechat://openid=${value}`;
    }
    // wechat://openid=
};