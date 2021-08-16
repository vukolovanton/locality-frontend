import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import registrationReducer from "./auth/registration/registrationSlice";
import loginReducer from "./auth/login/loginSlice";
import localityCreationReducer from "./locality/localityCreationSlice";
import localityReducer from "./locality/localitySlice";
import IssuesReducer from "./issues/issuesSlice";

const reducers = combineReducers({
  registration: registrationReducer,
  localityCreation: localityCreationReducer,
  user: loginReducer,
  locality: localityReducer,
  issues: IssuesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["localityCreation", "registration"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export const purge = () => persistor.purge();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
