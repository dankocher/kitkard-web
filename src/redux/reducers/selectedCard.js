export const select_card = "select_card";

export default (cardname = null, action) => {
    switch(action.type)
    {
        case select_card:
            return action.cardname;
        default:
            return cardname;
    }
}
