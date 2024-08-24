import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './features/accountSlice';
import dialogReducer from './features/dialogSlice';
import betReducer from './features/betSlice';
import gameReducer from './features/gameSlice';
import infoReducer from './features/configSlice';
import referralReducer from './features/referralSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,
    dialog: dialogReducer,
    bet: betReducer,
    game: gameReducer,
    config: infoReducer,
    referral: referralReducer,
  },
  // TODO: Check serializableCheck to ensure there are no problems (content type in modal)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
