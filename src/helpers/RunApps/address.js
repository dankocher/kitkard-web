import {Platform} from "react-native";

export const address = (value) => {

    if (Platform.OS === 'ios')
    {
        return `maps:0,0?q=${value}`;
    }
    else
    {
        return `geo:0,0?q=${value}`;
    }
};