export const set_friends = "set_friends";
export const save_friend = "save_friend";
export const delete_friend = "delete_friend";

export default (friends = [], action) => {
    switch(action.type)
    {
        case set_friends:
            return action.friends;
        case save_friend:
            const i = friends.findIndex(n => n._id === action.friend._id);
            if(i >= 0) {

                return [
                    ...friends.slice(0, i),
                    action.friend,
                    ...friends.slice(i + 1)
                ]
            } else {
                return [
                    ...friends,
                    action.friend
                ]
            }
        case delete_friend:
            return friends.filter(f => (
                f.cardname !== action.cardname &&
                f.friend_cardname !== action.friend_cardname
            ));
        default:
            return friends;
    }
}
