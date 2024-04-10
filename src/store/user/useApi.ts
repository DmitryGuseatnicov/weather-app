import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { User } from './user.types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/weather-app' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], any>({
      query: () => ({ url: '/user' }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
