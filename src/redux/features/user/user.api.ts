import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            updateUser: builder.mutation({
                  query: ({ userId, userInfo }) => ({
                        url: `/user/${userId}`,
                        method: "PATCH",
                        data: userInfo, 
                  }),
                  invalidatesTags: ["USER"],
            }),
            removeUser: builder.mutation({
                  query: (userId) => ({
                        url: `/user/${userId}`,
                        method: "DELETE",
                  }),
                  invalidatesTags: ["USER"],
            }),
            getUserDetails: builder.query({
                  query: (params) => ({
                        url: `/user/${params}`,
                        method: "GET",
                  }),
                  transformResponse: (response) => response.data,
            }),
            getAllUser: builder.query({
                  query: (params) => ({
                        url: "/user/all-users",
                        method: "GET",
                        params: params,
                  }),
                  providesTags: ["USER"],
                  transformResponse: (response) => response,
            }),
            getAllAdmin: builder.query({
                  query: (params) => ({
                        url: "/user/all-admin",
                        method: "GET",
                        params: params,
                  }),
                  providesTags: ["USER"],
                  transformResponse: (response) => response,
            }),
            getDeletedUser: builder.query({
                  query: (params) => ({
                        url: "/user/deleted-users",
                        method: "GET",
                        params: params,
                  }),
                  providesTags: ["USER"],
                  transformResponse: (response) => response,
            }),
            getUnauthorUser: builder.query({
                  query: (params) => ({
                        url: "/user/unauthor-users",
                        method: "GET",
                        params: params,
                  }),
                  providesTags: ["USER"],
                  transformResponse: (response) => response,
            }),
      }),
});

export const {
      useUpdateUserMutation,
      useRemoveUserMutation,
      useGetUserDetailsQuery,
      useGetAllUserQuery,
      useGetAllAdminQuery,
      useGetDeletedUserQuery,
      useGetUnauthorUserQuery,
} = userApi;
