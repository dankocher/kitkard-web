import {Platform} from "react-native";

export const vk = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://vk.com/${value}`;
    }
    else
    {
        return `https://vk.com/${value}`;
    }

    // vk://${value}
};