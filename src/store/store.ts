import { configureStore } from '@reduxjs/toolkit';

import { userApi } from './user/useApi';
import { weatherApi } from './weather';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
