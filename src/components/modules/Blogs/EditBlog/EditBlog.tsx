/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import BASEURL from "@/utils/Constants";
import WaitingLoader from "../../loader/WaitingLoder";

type FormDataType = {
  title: string;
  slug: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  readTime: string;
  commentCount: string;
  tags: string[];
  content: string;
  image: File | null;
};

const EditBlog: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    slug: "",
    category: "",
    metaTitle: "",
    metaDescription: "",
    description: "",
    readTime: "",
    commentCount: "",
    tags: [],
    content: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [tagInput, setTagInput] = useState<string>("");

  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  /* ================= SLUG AUTO GENERATION ================= */
  useEffect(() => {
    const generateSlug = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    };

    setFormData((prev) => ({
      ...prev,
      slug: generateSlug(prev.title),
    }));
  }, [formData.title]);

  /* ================= HANDLERS ================= */

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "slug") {
      const cleaned = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      setFormData({ ...formData, slug: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleTagAdd = (): void => {
  //   if (tagInput.trim()) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       tags: [...prev.tags, tagInput.trim()],
  //     }));
  //     setTagInput("");
  //   }
  // };

  // const handleTagDelete = (index: number): void => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     tags: prev.tags.filter((_, i) => i !== index),
  //   }));
  // };

  /* ================= UPDATE BLOG ================= */

  const handleBlogUpdate = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const bodyFormData = new FormData();
      bodyFormData.append("title", formData.title);
      bodyFormData.append("slug", formData.slug);
      bodyFormData.append("category", formData.category);
      bodyFormData.append("metaTitle", formData.metaTitle);
      bodyFormData.append("metaDescription", formData.metaDescription);
      bodyFormData.append("content", formData.content);

      if (formData.image) {
        bodyFormData.append("thambnail", formData.image);
      }

      bodyFormData.append("tags", JSON.stringify(formData.tags));

      const response = await axios.patch(
        `${BASEURL}/news/update/${(preBlogData as any)?.data?._id}`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.statusCode === 200) {
        toast.success("Blog is updated successfully!");
        navigate("/news");
      } else {
        toast.error("Failed to update blog.");
      }
    } catch (error: any) {
      console.error("Error updating blog:", error);
      toast.error(
        error.response?.data?.error || "Something went wrong!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= FETCH EXISTING BLOG ================= */

  const {
    data: preBlogData = {},
    isLoading: blogLoading,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const response = await axios.get(
        `${BASEURL}/news/retrieve/slug/${slug}`,
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

  useEffect(() => {
    if ((preBlogData as any)?.data) {
      const blog = (preBlogData as any).data;

      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        category: blog.category?.title || "",
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        description: blog.description || "",
        readTime: blog.readTime || "",
        commentCount: blog.commentCount || "",
        tags: Array.isArray(blog.tags) ? blog.tags : [],
        content: blog.content || "",
        image: null,
      });
    }
  }, [preBlogData]);

  if (blogLoading) return <WaitingLoader />;

  /* ================= JSX ================= */

  return (
    <div className="py-5">
      {isLoading && <WaitingLoader />}

      <h2 className="text-xl font-bold text-[#131523] capitalize mb-4">
        Blog Post / Edit Post
      </h2>

      <div className="input_wrapper flex gap-5">
        <div className="left_section w-full md:w-2/3 p-4 bg-white shadow rounded">
          <div className="flex flex-col gap-4">

            {/* Image */}
            <div>
              <label className="block font-medium mb-2">Images</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block mb-1">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Description */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />

          </div>
        </div>
      </div>

      {/* <UpdateTextEditor
        formData={formData}
        setFormData={setFormData}
        previousContent={(preBlogData as any)?.data?.content}
      /> */}

      <div className="flex items-center gap-4 mt-6">
        <Link
          to="/news"
          className="border border-[#1BAE70] text-[#1BAE70] px-6 py-2 rounded"
        >
          Cancel
        </Link>

        <button
          onClick={handleBlogUpdate}
          className="bg-[#1BAE70] text-white px-6 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBlog;