import {Platform} from "react-native";

export const tumblr = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://${value}.tumblr.com/`;
    }
    else
    {
        return `https://${value}.tumblr.com/`;
    }

    // tumblr://${value}
};