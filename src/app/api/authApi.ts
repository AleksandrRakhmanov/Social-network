import { rtkQueryApi } from './rtkQueryApi';
import type {
  UserData,
  LoginDto,
  RegisterDto,
} from 'entities/user/model/types';

export const authApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserData, LoginDto>({
      query: (body: LoginDto) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        } catch {
          // ignore
        }
      },
    }),

    register: builder.mutation<UserData, RegisterDto>({
      query: (body: RegisterDto) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        } catch {
          // ignore
        }
      },
    }),

    getMe: builder.query<UserData, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;
