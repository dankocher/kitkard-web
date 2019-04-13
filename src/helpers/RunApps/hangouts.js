import {Platform} from "react-native";

export const hangouts = (value) => {

    if (Platform.OS === 'ios')
    {
        return `hangouts://${value}`;
    }
    else
    {
        return `hangouts://${value}`;
    }
};