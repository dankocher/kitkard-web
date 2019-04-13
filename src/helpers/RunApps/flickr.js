import {Platform} from "react-native";

export const flickr = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://flickr.com/people/${value}`;
    }
    else
    {
        return `https://flickr.com/people/${value}`;
    }

    // flickr://${value}
};