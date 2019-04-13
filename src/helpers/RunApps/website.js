import {Platform} from "react-native";

export const website = (value) => {

    if (Platform.OS === 'ios')
    {
        return `http://${value}`;
    }
    else
    {
        return `http://${value}`;
    }
};