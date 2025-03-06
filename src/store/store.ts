// import { configureStore } from "@reduxjs/toolkit";
// import formReducer from "./formSlice";

// export const store = configureStore({
//   reducer: {
//     form: formReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice"; 
import counterReducer from "./counterSlice"; // ✅ Add this line

export const store = configureStore({
  reducer: {
    form: formReducer,
    counter: counterReducer, // ✅ Add counter slice to store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
