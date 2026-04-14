import { baseApi } from "@/redux/baseApi";

export const categoryApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            addInstruction: builder.mutation({
                  query: (categoryData) => ({
                        url: "/instruction/create",
                        method: "POST",
                        data: categoryData,
                  }),
                  invalidatesTags: ["INSTRUCTION"],
            }),
            updateInstruction: builder.mutation({
                  query: ({ categoryId, categoryInfo }) => ({
                        url: `/instruction/${categoryId}`,
                        method: "PATCH",
                        data: categoryInfo, 
                  }),
                  invalidatesTags: ["INSTRUCTION"],
            }),
            removeInstruction: builder.mutation({
                  query: (categoryId) => ({
                        url: `/instruction/${categoryId}`,
                        method: "DELETE",
                  }),
                  invalidatesTags: ["INSTRUCTION"],
            }),
            
            getInstructionDetails: builder.query({
                  query: (params) => ({
                        url: `/instruction/${params}`,
                        method: "GET",
                  }),
                  transformResponse: (response) => response.data,
            }),
            
            getAllInstructions: builder.query({
                  query: (params) => ({
                        url: "/instruction",
                        method: "GET",
                        params: params,
                  }),
                  providesTags: ["INSTRUCTION"],
                  transformResponse: (response) => response,
            }),
      }),
});

export const {
      useAddInstructionMutation,
      useUpdateInstructionMutation,
      useRemoveInstructionMutation,
      useGetInstructionDetailsQuery,
      useGetAllInstructionsQuery,
} = categoryApi;
