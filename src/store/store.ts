import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices";  // Import the counter reducer

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// These help TypeScript understand Redux types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
