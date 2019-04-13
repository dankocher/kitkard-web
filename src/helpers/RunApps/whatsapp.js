import {Platform} from "react-native";

export const whatsapp = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://api.whatsapp.com/send?phone=${value}&text=`;
    }
    else
    {
        return `https://api.whatsapp.com/send?phone=${value}&text=`;
    }
};