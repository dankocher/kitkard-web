import {Platform} from "react-native";

export const livejournal = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://${value}.livejournal.com`;
    }
    else
    {
        return `https://${value}.livejournal.com`;
    }

    // livejournal://${value}
};