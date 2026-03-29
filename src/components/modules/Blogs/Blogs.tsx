/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import SearchBar from "@/components/shared/SearchBar/SearchBar";
import { Link } from "react-router";
import BlogCard from "./BlogCard";
import Pagination from "@/components/shared/Pagination/Pagination";
import { IBlog } from "@/types/blog.type";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blog.api";
import Loader from "@/pages/Spinner";

/* =========== TYPES =========== */




/* ================= COMPONENT ================= */

const Blogs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const { data, isLoading } = useGetAllBlogsQuery({ page: currentPage, limit, searchTerm, sort: sortOrder });


  const meta = data?.data?.meta;
  const totalPages = meta?.totalPage ?? 1;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex py-1 px-3 justify-between items-center gap-2">
        <h1 className="text-xl font-bold">News</h1>
        <Link
          to="/new/create"
          className="text-white py-3 px-6 bg-primary font-bold rounded-lg"
        >
          + Add News
        </Link>
      </div>

      <div>
        <div className="my-5 grid grid-cols-3 gap-5 p-5 py-6 rounded-lg shadow">
          {data?.data?.map((blog: IBlog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
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