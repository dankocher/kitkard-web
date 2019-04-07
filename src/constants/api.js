const host = {
    // uri: "http://192.168.100.10:3000",
    // uri: "https://kitkard.dankocher.net",
    uri: "https://kitkard.com",
};

const api = {
    registration: {method: "POST", uri: "/kit/reg/"},
    auth: {method: "POST", uri: "/kit/auth/"},
    login: {method: "POST", uri: "/kit/login/"},
    logout: {method: "GET", uri: "/kit/logout/:session"},

    check_session: { method: "GET",  uri: "/kit/user/cs/:session" },
    sync_user: { method: "GET", uri: "/kit/user/sync/:updated" },
    save_user: { method: "POST", uri: "/kit/user/save/" },

    create_card: {method: "POST", uri: "/kit/user/card/create/"},
    save_card: {method: "POST", uri: "/kit/user/card/save/:cardname/"},
    delete_card: {method: "DELETE", uri: "/kit/user/card/delete/:cardname/"},
    delete_picture: {method: "DELETE", uri: "/pic/:cardname/:picture"},
    get_card: {method: "GET", uri: "/kit/card/:cardname/"},
    sync_card: {method: "GET", uri: "/kit/card/sync/:cardname/"},

    add_card: {method: "PUT", uri: "/kit/cardholder/add/"},
    remove_card: {method: "DELETE", uri: "/kit/cardholder/remove/"},


    get_all_friends: { method: "GET",  uri: "/kit/friends/" },
    sync_friends: { method: "GET",  uri: "/kit/friends/sync/:cardname/:updated" },

    get_all_notifications: { method: "GET",  uri: "/kit/notifications/" },
    sync_notifications: { method: "GET",  uri: "/kit/notifications/sync/:cardname/:updated" },
    set_notifications_viewed: { method: "POST",  uri: "/kit/notifications/viewed/" },
    notification_action: { method: "POST",  uri: "/kit/notification/action/" },

    search: {method: "POST", uri: "/kit/search/"},
    save_search: {method: "POST", uri: "/kit/user/save_search/"},
    sync_search: {method: "GET", uri: "/kit/user/sync_search/:search_updated"},

    share: {method: "PUT", uri: "/kit/share/"},




    sync_cardholder: {method: "GET", uri: "/kit/cardholder/sync/:cardname"},


    sign: { method: "POST", uri: "/kit/user/" },
    get_user: { method: "POST", uri: "/kit/user/:session" },
    update_user: { method: "POST", uri: "/kit/user/update/" },










    socket_room_card: "/krc"
};


export { host, api };
