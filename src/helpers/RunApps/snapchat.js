import {Platform} from "react-native";

export const snapchat = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://snapchat.com/add/${value}`;
    }
    else
    {
        return `https://snapchat.com/add/${value}`;
    }

    // snapchat://${value}
};