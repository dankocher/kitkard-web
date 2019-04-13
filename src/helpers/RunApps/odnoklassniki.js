import {Platform} from "react-native";

export const odnoklassniki = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://ok.ru/${value}`;
    }
    else
    {
        return `https://ok.ru/${value}`;
    }

    // ok://${value}
};