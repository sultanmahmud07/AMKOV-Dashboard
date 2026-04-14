import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USER", "BLOG", "PRODUCT", "CATEGORY", "INSTRUCTION", "PARCEL", "CONTACT"],
  endpoints: () => ({}),
});
