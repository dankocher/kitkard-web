import React from 'react';
import {Image} from 'react-native';
import {host} from "../constants/api";
import ImageOffline from "../components/ImageOffline";
export const picSize = {
    small: 's',
    medium: 'm',
    long: 'l',
};

export const getCardPicture = (card, size, round) => {
    if (card === undefined || card.pictures === undefined || card.pictures.length === 0 || card.pictures[0] === "default") {
        if (round) return require("../assets/images/logo_round_gray.png");
        else return require("../assets/images/logo_gray.png")
    } else {
        return {uri: host.uri + "/pic/" + size + "/" + card.pictures[0]};
    }
};
export const getCardImage = (card, size, round) => {
    // const source = getCardPicture(card, size <= 100 ? picSize.small : picSize.medium, round);
    const radius = round ? size / 2 : 0;
    // return <Image source={source} style={{width: size, height: size, borderRadius: radius}}/>
    return <ImageOffline style={{width: size, height: size, borderRadius: radius}}
                         size={size}
                         card={card}
                         rounded={round}/>
};
