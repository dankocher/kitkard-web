
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import reducer from './reducers';

import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults/index';

// import storage from 'redux-persist/lib/storage'
// import { FSStorage } from '../fsstorage'
import FilesystemStorage from 'redux-persist-filesystem-storage';

const persistConfig = {
    timeout: 10000,
    key: 'root',
    // storage,
    storage: FilesystemStorage,
    // storage: FSStorage(),
};

const {
    middleware: offlineMiddleware,
    enhanceReducer: offlineEnhanceReducer,
    enhanceStore: offlineEnhanceStore
} = createOffline({
    ...offlineConfig,
    persist: false
});

const persistedReducer = persistReducer(
    persistConfig,
    offlineEnhanceReducer(reducer)
);


const store = createStore(
    persistedReducer,
    composeWithDevTools(
        offlineEnhanceStore,
        applyMiddleware(thunk, offlineMiddleware),
    )
);
const persistor = persistStore(store);

export { store, persistor };
