import { rtkQueryApi } from './rtkQueryApi';
import type { Post, CreatePost } from 'entities/post/model/types';

export const postApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),

    getPost: builder.query<Post, string>({
      query: (id: string) => `/posts/${id}`,
      providesTags: ['Post'],
    }),

    createPost: builder.mutation<Post, CreatePost>({
      query: (body: CreatePost) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),

    updatePost: builder.mutation<Post, { id: string; body: CreatePost }>({
      query: ({ id, body }: { id: string; body: CreatePost }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Posts', 'Post'],
    }),

    deletePost: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
