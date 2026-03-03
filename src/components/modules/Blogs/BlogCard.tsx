import axios, { AxiosError } from "axios";
import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { LuCalendarDays } from "react-icons/lu";
import BASEURL from "@/utils/Constants";
import { Link } from "react-router";

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

type BlogCardProps = {
  blog: Blog;
  refetch: () => void;
};

/* ================= COMPONENT ================= */

const BlogCard: React.FC<BlogCardProps> = ({ blog, refetch }) => {
  const handleDeleteBlog = async (blog: Blog): Promise<void> => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${BASEURL}/news/delete/${blog._id}`,
            {
              headers: {
                Authorization: localStorage.getItem("token") || "",
              },
            }
          );

          refetch();

          Swal.fire({
            title: "Deleted!",
            text: response.data?.message,
            icon: "success",
          });
        } catch (error) {
          const err = error as AxiosError<{ message?: string }>;

          toast.error(
            err.response?.data?.message || "Something went wrong"
          );

          console.error(err.response?.data || err.message);
        }
      }
    });
  };

  return (
    <div className="group relative transition overflow-hidden flex flex-col gap-1">
      {/* Image */}
      <div className="overflow-hidden aspect-square rounded-xl">
        <img
          src={blog.thambnail || "/default-img.png"}
          alt={blog.title}
          className="w-full aspect-square object-cover rounded-md transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <h2 className="text-lg my-3 font-semibold">{blog.title}</h2>

      <p className="text-[#9F9C96] text-sm line-clamp-2">
        {blog.metaDescription}
      </p>

      <div className="flex justify-between items-center py-2">
        <p className="flex items-center gap-1">
          <LuCalendarDays />
          <span className="text-sm">
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to={`/news/view/${blog.slug}`}
            className="text-[#1BAE70] text-2xl hover:text-green-500"
          >
            <IoEyeOutline />
          </Link>

          <Link
            to={`/news/edit/${blog.slug}`}
            className="text-[#1BAE70] text-xl"
          >
            <FiEdit />
          </Link>

          <button
            onClick={() => handleDeleteBlog(blog)}
            className="text-[#FF3B30] text-2xl"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;