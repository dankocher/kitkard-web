import ajax from "../utils/ajax";
import {api} from "../constants/api";

const syncNotifications = async (props, cardname)  => {
    if (cardname === undefined) {
        for (let cardname of props.user.cards) {
            await syncNotifications(props, cardname);
        }
    } else {
        const updated = props.cards[cardname].notifications_updated || 0;
        let res = await ajax(api.sync_notifications, {
            cardname: cardname,
            updated: updated
        });
        if (res.ok && res.notifications !== undefined) {
            for (const notification of res.notifications) {
                await props.saveNotification(notification);
            }
            props.saveCardParams({
                cardname: cardname,
                params: {
                    notifications_updated: res.updated
                }
            });
        }
    }
};

export default syncNotifications;