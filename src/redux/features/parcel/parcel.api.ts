import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            addParcel: builder.mutation({
                  query: (parcelData) => ({
                        url: "/parcel/create",
                        method: "POST",
                        data: parcelData,
                  }),
                  invalidatesTags: ["PARCEL"],
            }),
            updateParcelByAdmin: builder.mutation({
                  query: ({ parcelId, parcelInfo }) => ({
                        url: `/parcel/status/${parcelId}`,
                        method: "PATCH",
                        data: parcelInfo, 
                  }),
                  invalidatesTags: ["PARCEL"],
            }),
            blockParcelByAdmin: builder.mutation({
                  query: ({ parcelId, parcelInfo }) => ({
                        url: `/parcel/block/${parcelId}`,
                        method: "PATCH",
                        data: parcelInfo, 
                  }),
                  invalidatesTags: ["PARCEL"],
            }),
            removeParcel: builder.mutation({
                  query: (parcelId) => ({
                        url: `/parcel/${parcelId}`,
                        method: "DELETE",
                  }),
                  invalidatesTags: ["PARCEL"],
            }),
            cancelParcelBySender: builder.mutation({
                  query: (parcelId) => ({
                        url: `/parcel/cancel/${parcelId}`,
                        method: "PATCH",
                  }),
                  invalidatesTags: ["PARCEL"],
            }),
            deliveryParcelByReceiver: builder.mutation({
                  query: (parcelId) => ({
                        url: `/parcel/delivery/${parcelId}`,
                        method: "PATCH",
                  }),
                  invalidatesTags: ["PARCEL"],
            }),
            getParcelBySender: builder.query({
                  query: (params) => ({
                        url: "/parcel/sender",
                        method: "GET",
                        params,
                  }),
                  providesTags: ["PARCEL"],
                  transformResponse: (response) => response.data,
            }),
            getParcelByReceiver: builder.query({
                  query: (params) => ({
                        url: "/parcel/receiver",
                        method: "GET",
                        params,
                  }),
                  providesTags: ["PARCEL"],
                  transformResponse: (response) => response.data,
            }),
            getParcelDetails: builder.query({
                  query: (params) => ({
                        url: `/parcel/${params}`,
                        method: "GET",
                  }),
                  transformResponse: (response) => response.data,
            }),
            getParcelDetailsByTrackingId: builder.query({
                  query: (params) => ({
                        url: `/parcel/tracking-id/${params}`,
                        method: "GET",
                  }),
                  transformResponse: (response) => response.data.data,
            }),
            getAllParcels: builder.query({
                  query: (params) => ({
                        url: "/parcel/all-parcel",
                        method: "GET",
                        params: params,
                  }),
                  providesTags: ["PARCEL"],
                  transformResponse: (response) => response,
            }),
      }),
});

export const {
      useAddParcelMutation,
      useUpdateParcelByAdminMutation,
      useBlockParcelByAdminMutation,
      useCancelParcelBySenderMutation,
      useDeliveryParcelByReceiverMutation,
      useRemoveParcelMutation,
      useGetParcelBySenderQuery,
      useGetParcelByReceiverQuery,
      useGetParcelDetailsByTrackingIdQuery,
      useGetParcelDetailsQuery,
      useGetAllParcelsQuery,
} = parcelApi;
