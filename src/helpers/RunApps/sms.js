import {Platform} from "react-native";

export const sms = (value) => {

    if (Platform.OS === 'ios')
    {
        return `sms://${value}`;
    }
    else
    {
        return `sms://${value}`;
    }

};