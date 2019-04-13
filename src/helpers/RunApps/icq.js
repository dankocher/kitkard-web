import {Platform} from "react-native";

export const icq = (value) => {

    if (Platform.OS === 'ios')
    {
        return `icq://${value}`;
    }
    else
    {
        return `icq://${value}`;
    }

    // https://itunes.apple.com/ru/app/id302707408
};