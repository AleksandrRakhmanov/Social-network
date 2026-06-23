import { rtkQueryApi } from './rtkQueryApi';

export const uploadApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{ url: string }, FormData>({
      query: (body: FormData) => ({
        url: '/upload',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadApi;
