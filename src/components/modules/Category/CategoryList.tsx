import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Edit, EyeIcon, Image as ImageIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router";
import { formatDate } from "@/utils/getDateFormater";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IApiError } from "@/types";
import TableSkeleton from "../loader/Receiver/TableSkeleton";
import {
  useGetAllCategoriesQuery,
  useRemoveCategoryMutation,
} from "@/redux/features/category/category.api";

// 1. Define the interface based on your JSON response
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  thumbnail?: string;
  description?: string;
  visibility?: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export default function CategoryList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { data, isLoading } = useGetAllCategoriesQuery({
    page: currentPage,
    limit,
    searchTerm,
    sort: sortOrder,
  });

  const [removeCategory] = useRemoveCategoryMutation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  // 2. Updated to handle categories instead of users
  const handleRemoveCategory = async (categoryId: string) => {
    const toastId = toast.loading("Removing category...");
    try {
      const res = await removeCategory(categoryId).unwrap();
      
      if (res.success) {
        toast.dismiss(toastId);
        toast.success("Category deleted successfully");
      }
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      const error = err as IApiError;
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  return (
    <div className="w-full bg-white dark:bg-zinc-950 min-h-screen p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800/50">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Categories
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <Input
            className="w-full sm:w-[250px] bg-gray-50 dark:bg-zinc-900"
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Select onValueChange={handleSortChange} value={sortOrder}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 dark:bg-zinc-900">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order By</SelectLabel>
                <SelectItem value="-createdAt">Newest First</SelectItem>
                <SelectItem value="createdAt">Oldest First</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          {/* Optional: Add Category Button */}
          <Link to="/category/create">
             <Button className="w-full sm:w-auto bg-primary hover:bg-secondary cursor-pointer transition text-white">
                Add Category
             </Button>
          </Link>
        </div>
      </div>

      {/* Table Data */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="rounded-md border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-zinc-900/50">
              <TableRow>
                {/* <TableHead className="font-semibold">Order</TableHead> */}
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Slug</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">Description</TableHead>
                <TableHead className="font-semibold">Created Date</TableHead>
                <TableHead className="text-right font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.length === 0 ? (
                 <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                       No categories found.
                    </TableCell>
                 </TableRow>
              ) : (
                data?.data.map((category: ICategory) => (
                  <TableRow key={category._id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                    {/* Order */}
                    {/* <TableCell className="font-semibold text-gray-900 dark:text-gray-100">
                      {category?.order}
                    </TableCell> */}
                    {/* Thumbnail */}
                    <TableCell>
                      {category.thumbnail ? (
                        <img 
                          src={category.thumbnail} 
                          alt={category.name} 
                          className="w-10 h-10 rounded-md object-cover border border-gray-200 dark:border-zinc-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </TableCell>

                    {/* Name */}
                    <TableCell className="font-semibold text-gray-900 dark:text-gray-100">
                      {category.name.slice(0, 30)}
                    </TableCell>

                    {/* Slug */}
                    <TableCell className="text-gray-500 dark:text-gray-400">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md text-xs font-mono">
                        /{category.slug.slice(0, 20)}
                      </span>
                    </TableCell>

                    {/* Description (Truncated) */}
                    <TableCell className="hidden md:table-cell text-gray-500 dark:text-gray-400 max-w-[200px] truncate">
                      {category?.description?.slice(0, 10) || "No description"}
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-gray-500 dark:text-gray-400">
                      {formatDate(category.createdAt)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="flex items-center justify-end gap-2 mt-1">
                      <Link to={`/category/view/${category.slug}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                          <EyeIcon size={16} />
                        </Button>
                      </Link>
                      
                      {/* Assuming you want an edit button eventually */}
                      <Link to={`/category/edit/${category.slug}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                          <Edit size={16} />
                        </Button>
                      </Link>

                      <DeleteConfirmation onConfirm={() => handleRemoveCategory(category._id)}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 size={16} />
                        </Button>
                      </DeleteConfirmation>
                    </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex justify-end mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}