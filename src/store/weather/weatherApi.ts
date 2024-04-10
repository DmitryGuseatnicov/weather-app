import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { CreateWeatherNodeData, WeatherNote, WeatherType } from './weather.types';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['WeatherHone'],
  endpoints: (builder) => ({
    getWeatherNoteList: builder.query<WeatherNote[], { from?: string; to?: string } | undefined>({
      query: (queryParams) => ({ params: queryParams, url: '/weather-note' }),
      providesTags: (result) => (
        result ? [...result.map(({ id }) => ({ type: 'WeatherHone' as const, id })), 'WeatherHone'] : ['WeatherHone']
      ),
    }),

    getWeatherTypeList: builder.query<WeatherType[], unknown>({
      query: () => ({ url: '/weather-type' }),
    }),

    createWeatherNote: builder.mutation<WeatherNote, CreateWeatherNodeData>({
      query: (body) => ({
        url: '/weather-note',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WeatherHone'],
    }),

    updateWeatherNote: builder.mutation<WeatherNote, CreateWeatherNodeData>({
      query: ({ id, ...body }) => ({
        url: `/weather-note/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['WeatherHone'],
    }),

    deleteWeatherNoteList: builder.mutation<WeatherNote, { ids: number[] }>({
      query: (body) => ({
        url: '/weather-note/delete',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WeatherHone'],
    }),
  }),
});

export const {
  useGetWeatherNoteListQuery,
  useGetWeatherTypeListQuery,
  useCreateWeatherNoteMutation,
  useUpdateWeatherNoteMutation,
  useDeleteWeatherNoteListMutation,
} = weatherApi;
