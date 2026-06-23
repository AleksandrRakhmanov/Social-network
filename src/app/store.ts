import { configureStore } from '@reduxjs/toolkit';
import { rtkQueryApi } from './api/rtkQueryApi';

const store = configureStore({
  reducer: {
    [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryApi.middleware),
});

export default store;
