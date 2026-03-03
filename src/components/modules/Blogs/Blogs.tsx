import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "@/utils/Constants";
import Loader from "@/pages/Spinner";
import SearchBar from "@/components/shared/SearchBar/SearchBar";
import { Link } from "react-router";
import BlogCard from "./BlogCard";
import Pagination from "@/components/shared/Pagination/Pagination";

/* ================= TYPES ================= */
type BlogCategory = {
  _id: string;
  title: string;
};

export type Blog = {
  _id: string;
  category: BlogCategory;
  title: string;
  thambnail?: string;
  content: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};

type BlogMeta = {
  totalPage: number;
  totalData?: number;
  page?: number;
  limit?: number;
};

type BlogsApiResponse = {
  data: {
    data: Blog[];
    meta: BlogMeta;
  };
};

/* ================= COMPONENT ================= */

const Blogs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;

  const {
    data: blogsData,
    refetch,
    isLoading,
  } = useQuery<BlogsApiResponse>({
    queryKey: ["get-blogs", currentPage],
    queryFn: async () => {
      const response = await axios.get<BlogsApiResponse>(
        `${BASEURL}/news/retrieve/all?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      return response.data;
    },
  });

  const meta = blogsData?.data?.meta;
  const totalPages = meta?.totalPage ?? 1;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex py-1 justify-between items-center gap-2">
        <h1 className="text-xl font-bold">News</h1>

        <div className="flex justify-end gap-5 items-center">
          <SearchBar searchTerm="" setSearchTerm={() => {}} />

          <Link
            to="/news/create"
            className="text-white py-3 px-6 font-bold rounded-lg"
            style={{
              background: "linear-gradient(to bottom, #1BAE70, #1BAE70)",
            }}
          >
            + Add News
          </Link>
        </div>
      </div>

      <div>
        <div className="my-5 grid grid-cols-3 gap-5 bg-white p-5 py-6 rounded-lg shadow">
          {blogsData?.data?.data?.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              refetch={refetch}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Blogs;