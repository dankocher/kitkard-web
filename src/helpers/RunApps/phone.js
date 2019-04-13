import {Platform} from "react-native";

export const phone = (value) => {

    if (Platform.OS === 'ios')
    {
        return `tel:+${value}`;
    }
    else
    {
        return `tel:+${value}`;
    }
};