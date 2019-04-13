export const isMyCard = async (props, cardname) => {
    return props.user !== null && props.user.cards.includes(cardname);
};
