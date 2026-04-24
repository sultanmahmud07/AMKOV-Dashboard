import { useState } from "react";
import {
  Trash2,
  Plus,
  Search,
  Loader2,
  HelpCircle,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/utils/getDateFormater";
import { cn } from "@/lib/utils";
import { IApiError } from "@/types";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import TableSkeleton from "../loader/Receiver/TableSkeleton"; // Adjust path if needed

// RTK Query Hooks
import {
  useAddSupportMutation,
  useGetAllSupportQuery,
  useRemoveSupportMutation
} from "@/redux/features/support/support.api";

// Interface matches your DB schema
export interface ISupport {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function Support({ className }: React.HTMLAttributes<HTMLDivElement>) {
  // --- Form State ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // --- Table & Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // --- API Hooks ---
  const { data, isLoading: isFetching } = useGetAllSupportQuery({
    page: currentPage,
    limit,
    searchTerm,
  });
  const [addSupport, { isLoading: isSubmitting }] = useAddSupportMutation();
  const [removeSupport] = useRemoveSupportMutation();

  const totalPage = data?.meta?.totalPage || 1;

  // --- Handlers ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handleAddSupport = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Please provide both a title and a description.");
      return;
    }

    const toastId = toast.loading("Saving FAQ...");

    const payload = {
      title: title.trim(),
      description: description.trim()
    };

    try {
      // Send raw JSON payload (No FormData needed)
      const res = await addSupport(payload).unwrap();

      if (res.success) {
        toast.success("FAQ created successfully!", { id: toastId });
        // Reset form
        setTitle("");
        setDescription("");
      }
    } catch (err) {
      console.error(err);
      const error = err as IApiError;
      toast.error(error?.data?.message || "Failed to save FAQ", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting FAQ...");
    try {
      const res = await removeSupport(id).unwrap();
      if (res.success) {
        toast.success("FAQ removed successfully", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      const error = err as IApiError;
      toast.error(error?.data?.message || "Failed to delete FAQ", { id: toastId });
    }
  };

  return (
    <div className={cn("w-full md:p-5 space-y-8", className)}>

      {/* Header */}
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-7 h-7 text-primary" />
          Manage Support FAQs
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Create and manage frequently asked questions and support content.
        </p>
      </div>

      {/* ================= TOP: CREATE FORM ================= */}
      <Card className="border-gray-100 dark:border-zinc-800 shadow-sm rounded-2xl bg-white dark:bg-zinc-950">
        <CardHeader className="bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800 pb-2">
          <CardTitle className="text-lg">Add New FAQ</CardTitle>
        </CardHeader>
        <CardContent className=" space-y-4">

          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300 font-medium">
              Title / Question <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How long does a roof inspection take?"
              className="bg-gray-50 dark:bg-zinc-900 h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300 font-medium">
              Description / Answer <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write the detailed answer or support text here..."
              className="bg-gray-50 dark:bg-zinc-900 h-32 resize-none rounded-xl"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="button"
              onClick={handleAddSupport}
              disabled={!title.trim() || !description.trim() || isSubmitting}
              className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-[#16965f] text-white rounded-xl font-medium"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...</>
              ) : (
                <><Plus className="w-5 h-5 mr-2" /> Publish FAQ</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= BOTTOM: FAQ LIST ================= */}
      <Card className="border-gray-100 dark:border-zinc-800 shadow-sm rounded-2xl bg-white dark:bg-zinc-950 overflow-hidden">
        <CardHeader className="bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg">Support Content Library</CardTitle>
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              className="w-full pl-9 bg-white dark:bg-zinc-900 h-10 rounded-xl border-gray-200 dark:border-zinc-800"
              type="text"
              placeholder="Search titles..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </CardHeader>

        {isFetching ? (
          <TableSkeleton />
        ) : (
          <div>
            <Table>
              <TableHeader className="bg-gray-50/50 dark:bg-zinc-900/50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-600 dark:text-gray-300 w-1/3">Question / Title</TableHead>
                  <TableHead className="font-semibold text-gray-600 dark:text-gray-300 w-1/2">Answer Preview</TableHead>
                  <TableHead className="font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">Added On</TableHead>
                  <TableHead className="text-right font-semibold text-gray-600 dark:text-gray-300 w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                      No support content found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.data.map((item: ISupport) => (
                    <TableRow key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">

                      {/* Title */}
                      <TableCell className="align-top pt-4">
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <span className="font-bold text-gray-900 dark:text-white line-clamp-2">
                            {item.title.length > 80
                              ? item.title.slice(0, 80) + "..."
                              : item.title}
                          </span>
                        </div>
                      </TableCell>

                      {/* Description Preview */}
                      <TableCell className="align-top pt-4">
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2" title={item.description}>
                          {item.description.length > 30
                            ? item.description.slice(0, 30) + "..."
                            : item.description}
                        </p>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="text-gray-500 dark:text-gray-400 text-sm align-top pt-4 whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="align-top text-right pt-2 mt-0.5">
                        <DeleteConfirmation onConfirm={() => handleDelete(item._id)}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete">
                            <Trash2 className="w-4 h-4" />
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
          <div className="flex justify-end p-4 border-t border-gray-100 dark:border-zinc-800">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                      <PaginationLink
                        className={cn(
                          "cursor-pointer rounded-xl transition-colors",
                          currentPage === page
                            ? "bg-primary text-white hover:bg-[#16965f] hover:text-white border-transparent"
                            : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                        )}
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
                        : "cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    </div>
  );
}