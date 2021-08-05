import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registration/registrationSlice";

const store: any = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
