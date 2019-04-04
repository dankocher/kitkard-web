import {selected_theme} from "../reducers/theme";
import {selected_screen} from "../reducers/screen";
import {selected_language} from "../reducers/language";
import {save_search, save_user, set_user} from "../reducers/user";
import {add_user_card} from "../reducers/user";
import {set_session} from "../reducers/session";
import {select_card} from "../reducers/selectedCard";
import {delete_card, save_card, delete_all_cards, save_card_params} from "../reducers/cards";
import {set_notifications, save_notification} from "../reducers/notifications";
import {delete_friend, save_friend, set_friends} from "../reducers/friends";
import {delete_all_pictures, delete_picture, save_picture} from "../reducers/pictures";
import {set_share} from "../reducers/share";

export const setTheme = (theme) => ({
    type: selected_theme,
    theme
});

export const setScreen = (screen) => ({
    type: selected_screen,
    screen
});

export const setLanguage = (language) => ({
    type: selected_language,
    language
});

export const setSession = (session) => ({
    type: set_session,
    session
});

export const setUser = (user) => ({
    type: set_user,
    user
});

export const saveUser = (user) => ({
    type: save_user,
    user
});

export const saveSearch = (search, updated) => ({
    type: save_search,
    search,
    updated
});

export const addUserCard = (cardname) => ({
    type: add_user_card,
    cardname
});

export const selectCard = (cardname) => ({
    type: select_card,
    cardname
});

export const saveCard = (card) => ({
    type: save_card,
    card
});

export const saveCardParams = (card) => ({
    type: save_card_params,
    card
});

export const deleteCard = (cardname) => ({
    type: delete_card,
    cardname
});

export const deleteAllCards = () => ({
    type: delete_all_cards
});


export const setNotifications = (notifications) => ({
    type: set_notifications,
    notifications
});

export const saveNotification = (notification) => ({
    type: save_notification,
    notification
});



export const setFriends = (friends) => ({
    type: set_friends,
    friends
});

export const saveFriend = (friend) => ({
    type: save_friend,
    friend
});

export const deleteFriend = (friend_cardname, cardname) => ({
    type: delete_friend,
    friend_cardname,
    cardname
});




export const savePicture = (picture) => ({
    type: save_picture,
    picture
});

export const deletePicture = (picture) => ({
    type: delete_picture,
    picture
});

export const deleteAllPictures = () => ({
    type: delete_all_pictures
});

export const setShare = (share) => ({
    type: set_share,
    share
});
