import {Platform} from "react-native";

export const facebook = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://facebook.com/${value}`;
    }
    else
    {
        return `https://facebook.com/${value}`;
    }

    // fb://profile/${value}
};