import { baseApi } from "./api/baseApi";
//import usersReducer from "./features/auth/userSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
};
