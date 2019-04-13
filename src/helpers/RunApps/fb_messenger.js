import {Platform} from "react-native";

export const fb_messenger = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://m.me/${value}`;
    }
    else
    {
        return `https://m.me/${value}`;
    }

    //fb-messenger://user-thread/${value}
};