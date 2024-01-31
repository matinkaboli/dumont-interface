import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './features/accountSlice';
import dialogReducer from './features/dialogSlice';
import CreateRoundReducer from './features/createRoundSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,
    dialog: dialogReducer,
    createRound: CreateRoundReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
