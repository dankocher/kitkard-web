import ajax from "../utils/ajax";
import {api} from "../constants/api";

const syncFriends = async (props, cardname)  => {
    if (cardname === undefined) {
        for (let cardname of props.user.cards) {
            await syncFriends(props, cardname);
        }
    } else {
        const updated = props.cards[cardname].friends_updated || 0;
        let res = await ajax(api.sync_friends, {
            cardname: cardname,
            updated: updated
        });


        if (res.ok && res.friends !== undefined) {
            for (const friend of res.friends) {
                props.saveFriend(friend);
            }
            props.saveCardParams({
                cardname: cardname,
                params: {
                    friends_updated: res.updated
                }
            });
        }
    }
};

export default syncFriends;