import {Platform} from "react-native";

export const pinterest = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://pinterest.com/${value}`;
    }
    else
    {
        return `https://pinterest.com/${value}`;
    }

    // pinterest://${value}
};