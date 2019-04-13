import {isMyCard} from "./isMyCard";

export const isCardholder = async (props, cardname) => {
    let friend = await props.friends.find(f => (f.friend_cardname === cardname
        && f.enabled && (f.deleted === undefined || f.deleted === false)));
    return (friend !== null && friend !== undefined);

};

export const isRequested = async (props, cardname) => {
    let friend = await props.friends.find(f => (f.friend_cardname === cardname
        && !f.enabled && (f.deleted === undefined || f.deleted === false)));
    return (friend !== null && friend !== undefined);
};



export const getOwnerCardname = async (props, friendCardname) => {

    const {friends} = props;

    let friend = await friends.find(f => f.friend_cardname === friendCardname);

    if (friend !== null && friend !== undefined) {
        return friend.cardname;
    } else {
        return "";
    }
};

export const isPrivate = async  (props, cardname) => {
    let card = props.cards[cardname];

    return !await isMyCard(props, cardname) && ! await isCardholder(props, cardname) &&
        card !== undefined && card.is_private;
};
