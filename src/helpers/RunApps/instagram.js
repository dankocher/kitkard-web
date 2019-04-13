import {Platform} from "react-native";

export const instagram = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://instagram.com/${value}`;
    }
    else
    {
        return `https://instagram.com/${value}`;
    }

    // instagram://user?username=${value}
};