import { baseApi } from "@/redux/baseApi";

export const contactApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            addContact: builder.mutation({
                  query: (contactData) => ({
                        url: "/contact/create",
                        method: "POST",
                        data: contactData,
                  }),
                  invalidatesTags: ["CONTACT"],
            }),
            updateContactByAdmin: builder.mutation({
                  query: ({ contactId, contactInfo }) => ({
                        url: `/contact/${contactId}`,
                        method: "PATCH",
                        data: contactInfo, 
                  }),
                  invalidatesTags: ["CONTACT"],
            }),
            removeContact: builder.mutation({
                  query: (contactId) => ({
                        url: `/contact/${contactId}`,
                        method: "DELETE",
                  }),
                  invalidatesTags: ["CONTACT"],
            }),
            getAllContact: builder.query({
                  query: (params) => ({
                        url: "/contact/all-contact",
                        method: "GET",
                        params: params,
                  }),
                  providesTags: ["CONTACT"],
                  transformResponse: (response) => response,
            }),
      }),
});

export const {
      useAddContactMutation,
      useUpdateContactByAdminMutation,
      useRemoveContactMutation,
      useGetAllContactQuery,
} = contactApi;
