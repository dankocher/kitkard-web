import {Platform} from "react-native";

export const skype = (value) => {
    value = value.replace("@", "");

    if (Platform.OS === 'ios')
    {
        return `skype:${value}?chat`;
    }
    else
    {
        return `skype:${value}?chat`;
    }
};