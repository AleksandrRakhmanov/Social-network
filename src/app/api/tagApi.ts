import { rtkQueryApi } from './rtkQueryApi';

export const tagApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<string[], void>({
      query: () => '/tags',
      providesTags: ['Tags'],
    }),
  }),
});

export const { useGetTagsQuery } = tagApi;
