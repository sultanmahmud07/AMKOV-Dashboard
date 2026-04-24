import { baseApi } from "@/redux/baseApi";

export const supportApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            addSupport: builder.mutation({
                  query: (categoryData) => ({
                        url: "/faq/create",
                        method: "POST",
                        data: categoryData,
                  }),
                  invalidatesTags: ["FAQ"],
            }),
            updateSupport: builder.mutation({
                  query: ({ supportId, supportInfo }) => ({
                        url: `/faq/${supportId}`,
                        method: "PATCH",
                        data: supportInfo, 
                  }),
                  invalidatesTags: ["FAQ"],
            }),
            removeSupport: builder.mutation({
                  query: (supportId) => ({
                        url: `/faq/${supportId}`,
                        method: "DELETE",
                  }),
                  invalidatesTags: ["FAQ"],
            }),
            
            getSupportDetails: builder.query({
                  query: (params) => ({
                        url: `/faq/${params}`,
                        method: "GET",
                  }),
                  transformResponse: (response) => response.data,
            }),
            
            getAllSupport: builder.query({
                  query: (params) => ({
                        url: "/faq",
                        method: "GET",
                        params: params,
                  }),
                  providesTags: ["FAQ"],
                  transformResponse: (response) => response,
            }),
      }),
});

export const {
      useAddSupportMutation,
      useUpdateSupportMutation,
      useRemoveSupportMutation,
      useGetSupportDetailsQuery,
      useGetAllSupportQuery,
} = supportApi;
