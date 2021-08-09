import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./auth/registration/registrationSlice";
import loginReducer from "./auth/login/loginSlice";
import localityCreationReducer from "./locality/localityCreation/localityCreationSlice";

const store: any = configureStore({
  reducer: {
    registration: registrationReducer,
    user: loginReducer,
    locality: localityCreationReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;