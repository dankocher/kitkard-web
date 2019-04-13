import ajax from "../utils/ajax";
import {api} from "../constants/api";
import {notifyUpdateUser} from "./notifyUpdateUser";

const syncUser = async (props)  => {
    if (props.user !== null) {
        const updated = props.user.updated || 0;
        let res = await ajax(api.sync_user, {updated: updated});
        if (res.ok) {
            if (res.status === 'new') {
                console.log("NEW:", res);
                props.saveUser(res.user);
            } else if (res.status === 'old') {
                let res = await ajax(api.save_user, props.user);
                if (res.ok) {
                    notifyUpdateUser(props.user._id, props.user.updated);
                }
            }
        }
    }
};

export default syncUser;