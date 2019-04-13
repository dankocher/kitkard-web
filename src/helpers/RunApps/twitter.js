import {Platform} from "react-native";

export const twitter = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://youtube.com/${value}`;
    }
    else
    {
        return `https://youtube.com/${value}`;
    }

    // twitter://user?screen_name=${value}
};