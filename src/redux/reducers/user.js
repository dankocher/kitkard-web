export const set_user = "set_user";
export const add_user_card = "add_user_card";
export const save_search = "save_search";
export const save_user = "save_user";

export default (user = null, action) => {
    switch(action.type)
    {
        case set_user:
            return action.user;
        case add_user_card:
            return {
                ...user,
                cards: [...user.cards, action.cardname]
            };
        case save_search:
            return {
                ...user,
                search: action.search,
                search_updated: action.updated,
            };
        case save_user:
            console.log("save_user")
            return {
                ...user,
                ...action.user
            };
        default:
            return user;
    }
}
