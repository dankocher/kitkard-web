export const save_card = "save_card";
export const delete_card = "delete_card";
export const delete_all_cards = "delete_all_cards";
export const save_card_params = "save_card_params";

export default (cards = {}, action) => {
    switch(action.type)
    {
        case save_card:
            return {
                ...cards,
                [action.card.cardname]: action.card
            };
        case save_card_params:
            let card = cards[action.card.cardname];
            if (card !== undefined) {
                card = {
                    ...card,
                    ...action.card.params
                };
                return {
                    ...cards,
                    [action.card.cardname]: card
                }
            } else {
                return cards;
            }
            // return {
            //     ...cards,
            //     [action.card.cardname]: {
            //         ...cards[action.card.cardname],
            //         ...action.card.params
            //     }
            // };
        case delete_card:
            delete cards[action.cardname];
            return cards;
        case delete_all_cards:
            return {};
        default:
            return cards;
    }
}
