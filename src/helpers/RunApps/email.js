import {Platform} from "react-native";

export const email = (value) => {

    if (Platform.OS === 'ios')
    {
        return `mailto:${value}`;
    }
    else
    {
        return `mailto:${value}`;
    }
};