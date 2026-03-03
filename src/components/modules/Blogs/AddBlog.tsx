
import  { useState, useEffect, ChangeEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import BASEURL from "@/utils/Constants";
import WaitingLoader from "../loader/WaitingLoder";
import TextEditor from "./TextEditor";

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

const AddBlog = () => {
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
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState<string>("");

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

  const handleTagAdd = (): void => {
    if (tagInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleTagDelete = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleCreateBlog = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const bodyFormData = new FormData();
      bodyFormData.append("title", formData.title);
      bodyFormData.append("slug", formData.slug);
      bodyFormData.append("category", formData.category);
      if (formData.image) {
        bodyFormData.append("thambnail", formData.image);
      }
      bodyFormData.append("content", formData.content);
      bodyFormData.append("metaTitle", formData.metaTitle);
      bodyFormData.append("metaDescription", formData.metaDescription);
      bodyFormData.append("tags", JSON.stringify(formData.tags));

      if (formData.description) {
        bodyFormData.append("description", formData.description);
      }

      const response = await axios.post(
        `${BASEURL}/news/create`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Blog is published successfully!");
        setIsLoading(false);
        navigate("/news");
      } else {
        toast.error("Failed to publish blog.");
        setIsLoading(false);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error creating blog:", error);
      toast.error(
        error.response?.data?.error || "Something went wrong!"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="py-5">
      {isLoading && <WaitingLoader></WaitingLoader>}
      <h2 className="text-xl font-bold text-[#131523] capitalize mb-4">Blog Post/Create New Post</h2>
      <div className="input_wrapper flex gap-5">
        <div className="left_section w-full md:w-2/3 p-4 bg-white shadow rounded">
          <div className="left_input flex flex-col gap-4">

            {/* Image Upload Design */}
            <div>
              <label className="block font-medium mb-2">Images</label>
              <div className="border border-dashed border-gray-300 p-6 rounded-lg text-center">
                <label htmlFor="fileUpload" className="cursor-pointer inline-block bg-green-100 text-green-600 px-4 py-2 rounded border border-green-300">
                  Add File
                </label>
                <p className="text-gray-500 mt-2">Or drag and drop files</p>
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {formData.image && (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="w-full h-40 object-cover mt-3 rounded"
                  />
                )}
              </div>
            </div>

            {/* Basic Fields */}
            <div>
              <label className="block mb-1">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1">Short Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1">Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>


            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Read Time (mins)</label>
                <input
                  name="readTime"
                  type="number"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1">Comment Count</label>
                <input
                  name="commentCount"
                  type="number"
                  value={formData.commentCount}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right_section w-full md:w-1/3">
          {/* SEO Section */}
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold mb-2">SEO</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1">Slug</label>
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1">Meta Title</label>
                <input
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1">Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-5">
            <label className="block font-medium mb-2">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 border rounded px-3 py-2"
                placeholder="Enter tag"
              />
              <button
                onClick={handleTagAdd}
                type="button"
                className="bg-[#1BAE70] text-white px-4 py-1 text-sm rounded"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button onClick={() => handleTagDelete(index)} className="ml-1 text-red-500">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Text Editor */}
      <TextEditor
        formData={formData}
        setFormData={setFormData}
      />

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <Link
          to={"/news"}
          className="hover:bg-[#1BAE70] transition hover:text-white bg-transparent border border-[#1BAE70] text-[#1BAE70] px-6 py-2 rounded"
        >
          Cancel
        </Link>
        <button
          onClick={() => handleCreateBlog()}
          className="bg-[#1BAE70] hover:bg-opacity-90 text-white px-6 py-2 rounded"
        >
          Publish New
        </button>
      </div>
    </div>
  );
};

export default AddBlog;