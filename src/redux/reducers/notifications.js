export const set_notifications = "set_notifications";
export const save_notification = "save_notification";

export default (notifications = [], action) => {
    switch(action.type)
    {
        case set_notifications:
            return action.notifications;
        case save_notification:
            const i = notifications.findIndex(n => n._id === action.notification._id);
            console.log("index", i)
            if(i >= 0) {
                let notification = notifications[i];
                notification = {
                    ...notification,
                    ...action.notification
                };
                return [
                    ...notifications.slice(0, i),
                    notification,
                    ...notifications.slice(i + 1)
                ]
            } else {
                return [
                    ...notifications,
                    action.notification
                ]
            }
        default:
            return notifications;
    }
}
