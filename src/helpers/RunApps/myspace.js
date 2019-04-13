import {Platform} from "react-native";

export const myspace = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://myspace.com/${value}`;
    }
    else
    {
        return `https://myspace.com/${value}`;
    }

    // myspace://${value}
};