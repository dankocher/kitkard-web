import { combineReducers } from 'redux';

import themesReducer from './theme';
import tabBarReducer from './screen';
import languageReducer from './language';
import userReducer from './user';
import sessionReducer from './session';
import selectedCardReducer from './selectedCard';
import cardsReducer from './cards';
import notificationsReducer from './notifications';
import friendsReducer from './friends';
import shareReducer from './share';
// import picturesReducer from './pictures';

export default combineReducers({
    theme: themesReducer,
    screen: tabBarReducer,
    language: languageReducer,
    user: userReducer,
    cards: cardsReducer,
    notifications: notificationsReducer,
    friends: friendsReducer,
    session: sessionReducer,
    selectedCard: selectedCardReducer,
    share: shareReducer,
    // pictures: picturesReducer,
});