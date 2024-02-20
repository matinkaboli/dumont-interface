import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './features/accountSlice';
import dialogReducer from './features/dialogSlice';
import CreateRoundReducer from './features/createRoundSlice';
import betReducer from './features/betSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,
    dialog: dialogReducer,
    createRound: CreateRoundReducer,
    bet: betReducer,
  },
  // TODO: Check serializableCheck to ensure there are no problems (content type in modal)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
