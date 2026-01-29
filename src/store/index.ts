import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/createUserSlice';

// Configure store
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // Ignore these action types for serializable check
  //       ignoredActions: [
  //         'user/saveToStorage/pending',
  //         'user/loadFromStorage/pending',
  //       ],
  //     },
  //   }),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
