import {Platform} from "react-native";

export const youtube = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://youtube.com/${value}`;
    }
    else
    {
        return `https://youtube.com/${value}`;
    }

    // youtube://${value}
};