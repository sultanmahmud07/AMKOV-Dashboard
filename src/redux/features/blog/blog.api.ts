import { baseApi } from "@/redux/baseApi";

export const blogApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            addBlog: builder.mutation({
                  query: (blogData) => ({
                        url: "/news/create",
                        method: "POST",
                        data: blogData,
                  }),
                  invalidatesTags: ["BLOG"],
            }),
            updateBlogByAdmin: builder.mutation({
                  query: ({ blogId, blogInfo }) => ({
                        url: `/news/update/${blogId}`,
                        method: "PATCH",
                        data: blogInfo, 
                  }),
                  invalidatesTags: ["BLOG"],
            }),
            removeBlog: builder.mutation({
                  query: (blogId) => ({
                        url: `/news/${blogId}`,
                        method: "DELETE",
                  }),
                  invalidatesTags: ["BLOG"],
            }),
            getBlogDetails: builder.query({
                  query: (params) => ({
                        url: `/news/${params}`,
                        method: "GET",
                  }),
                  transformResponse: (response) => response.data,
            }),
            getAllBlogs: builder.query({
                  query: (params) => ({
                        url: "/news/retrieve/all",
                        method: "GET",
                        params: params,
                  }),
                  providesTags: ["BLOG"],
                  transformResponse: (response) => response,
            }),
      }),
});

export const {
      useAddBlogMutation,
      useUpdateBlogByAdminMutation,
      useRemoveBlogMutation,
      useGetBlogDetailsQuery,
      useGetAllBlogsQuery,
} = blogApi;
