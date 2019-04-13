import {Platform} from "react-native";

export const linkedin = (value) => {

    if (Platform.OS === 'ios')
    {
        return `https://linkedin.com/in/${value}`;
    }
    else
    {
        return `https://linkedin.com/in/${value}`;
    }

    // linkedin://${value}
};