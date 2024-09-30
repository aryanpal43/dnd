// src/features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_BASEURL, // Replace with your API base URL
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // Assuming auth slice stores token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (newUser) => ({
        url: "api/auth/signup",
        method: "POST",
        body: newUser, // Send the user registration data
      }),
    }),
    verifyEmail: builder.mutation({
      query: (code) => ({
        url: "api/auth/verify-email",
        method: "POST",
        body: { code },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "api/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
} = authApi;
