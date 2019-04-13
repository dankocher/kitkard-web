import {Platform} from "react-native";

export const viber = (value) => {
    value = value.replace("+", "");
    if (Platform.OS === 'ios')
    {
        return `viber://add?number=${value}`;
    }
    else
    {
        return `viber://add?number=${value}`;
    }
};