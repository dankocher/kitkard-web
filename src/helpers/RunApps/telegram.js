import {Platform} from "react-native";

export const telegram = (value) => {
    value = value.replace("@", "");

    if (Platform.OS === 'ios')
    {
        return `http://t.me/${value}`;
    }
    else
    {
        return `tg://resolve?domain=${value}`;
    }
};