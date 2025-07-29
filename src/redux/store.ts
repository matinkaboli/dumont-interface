import { combineReducers, configureStore } from '@reduxjs/toolkit';

import accountReducer from './features/accountSlice';
import dialogReducer from './features/dialogSlice';
import infoReducer from './features/configSlice';
import confettiReducer from './features/confettiSlice';

import betReducer from './features/faro/betSlice';
import mainFaroReducer from './features/faro/faroSlice';
import referralReducer from './features/faro/referralSlice';
import discardedReducer from './features/faro/discardedSlice';
import activityReducer from './features/faro/activitySlice';

import mainMatchReducer from './features/match/matchSlice';
import oddsMatchReducer from './features/match/oddsSlice';

const faroReducer = combineReducers({
  main: mainFaroReducer,
  bet: betReducer,
  referral: referralReducer,
  discarded: discardedReducer,
  activity: activityReducer,
});

const matchReducer = combineReducers({
  main: mainMatchReducer,
  odds: oddsMatchReducer,
});

const store = configureStore({
  reducer: {
    account: accountReducer,
    dialog: dialogReducer,
    config: infoReducer,
    confetti: confettiReducer,
    faro: faroReducer,
    match: matchReducer,
  },
  // TODO: Check serializableCheck to ensure there are no problems (content type in modal)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
