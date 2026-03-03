
import { FaArrowLeftLong } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BASEURL from "@/utils/Constants";
import { Link, useParams } from "react-router";
import Loader from "@/pages/Spinner";

const BlogDetails = () => {
  const { slug } = useParams();

  // Fetch blog data
  const {
    data: preBlogData = {},
    isLoading: blogLoading,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const response = await axios.get(`${BASEURL}/news/retrieve/slug/${slug}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });

  if (blogLoading) return <Loader />;

  const blog = preBlogData?.data || {};

  return (
    <div className="p-4 shadow-md rounded-md bg-white">
      {/* Header */}
      <div className="top flex items-center justify-between mb-6">
        <Link to="/news">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaArrowLeftLong /> {blog?.category?.title || "Blog"}
          </h2>
        </Link>

        <Link
          to={`/news/edit/${blog?._id}`}
          className="text-white py-3 px-10 font-bold rounded-lg"
          style={{
            background: "linear-gradient(to bottom, #1BAE70, #1BAE70)",
          }}
        >
          Edit News
        </Link>
      </div>

      {/* Thumbnail */}
      <img
        src={blog?.thambnail || "/default-img.png"}
        alt={blog?.title || "Blog"}
        className="w-full rounded-md"
      />

      {/* Blog Title */}
      <h2 className="text-2xl font-bold my-5">{blog?.title}</h2>

      {/* Meta Description */}
      {blog?.metaDescription && (
        <p className="text-gray-600 mb-4">{blog.metaDescription}</p>
      )}

      {/* Blog Content */}
      <div
        className="content text-gray-800"
        dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
      ></div>

      {/* Tags & Date */}
      <div className="mt-6 flex flex-wrap justify-between items-center text-sm text-gray-500 border-t pt-3">
        <div>
          <strong>Tags:</strong>{" "}
          {blog?.tags?.length ? (
            blog.tags.map((tag: string, i:number) => (
              <span key={i} className="mr-2 text-[#1BAE70]">
                #{tag}
              </span>
            ))
          ) : (
            <span>No tags</span>
          )}
        </div>

        <div>
          <strong>Published:</strong>{" "}
          {new Date(blog?.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
