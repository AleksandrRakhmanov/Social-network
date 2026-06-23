import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const rtkQueryApi = createApi({
  reducerPath: 'api',
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Posts', 'Post', 'Tags', 'User'],
  endpoints: () => ({}),
});
