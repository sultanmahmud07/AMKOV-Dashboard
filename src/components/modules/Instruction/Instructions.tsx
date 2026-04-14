import { useState, useEffect, ChangeEvent } from "react";
import { 
  FileText, 
  Trash2, 
  UploadCloud, 
  Plus, 
  Search, 
  Loader2, 
  ExternalLink,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/utils/getDateFormater";
import { cn } from "@/lib/utils";
import { IApiError } from "@/types";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

// Assume these are your RTK Query hooks in the API slice
import { 
  useAddInstructionMutation, 
  useGetAllInstructionsQuery, 
  useRemoveInstructionMutation 
} from "@/redux/features/instruction/instruction.api";

// Interface matches your DB schema
export interface IInstruction {
  _id: string;
  name: string;
  slug: string;
  pdfFile: string;
  createdAt: string;
}

export default function Instructions({ className }: React.HTMLAttributes<HTMLDivElement>) {
  // --- Form State ---
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // --- Table & Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // --- API Hooks ---
  const { data, isLoading: isFetching } = useGetAllInstructionsQuery({
    page: currentPage,
    limit,
    searchTerm,
  });
  const [addInstruction, { isLoading: isSubmitting }] = useAddInstructionMutation();
  const [removeInstruction] = useRemoveInstructionMutation();

  const totalPage = data?.meta?.totalPage || 1;

  // --- Auto-Slug Generator ---
  useEffect(() => {
    if (name) {
      setSlug(
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    } else {
      setSlug("");
    }
  }, [name]);

  // --- Handlers ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a valid PDF file.");
        return;
      }
      setSelectedFile(file);
    }
    e.target.value = ""; // Reset input so same file can be selected if removed
  };

  const handleAddInstruction = async () => {
    if (!name || !slug || !selectedFile) {
      toast.error("Please provide a name and upload a PDF.");
      return;
    }

    const toastId = toast.loading("Uploading document...");
    
    const formattedData = { name, slug };
    const formData = new FormData();
    formData.append("data", JSON.stringify(formattedData));
    formData.append("pdfFile", selectedFile); // Append the actual PDF file

    try {
      const res = await addInstruction(formData).unwrap();
      if (res.success) {
        toast.success("Document uploaded successfully!", { id: toastId });
        // Reset form
        setName("");
        setSlug("");
        setSelectedFile(null);
      }
    } catch (err) {
      console.error(err);
      const error = err as IApiError;
      toast.error(error?.data?.message || "Failed to upload document", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting document...");
    try {
      const res = await removeInstruction(id).unwrap();
      if (res.success) {
        toast.success("Document removed successfully", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      const error = err as IApiError;
      toast.error(error?.data?.message || "Failed to delete document", { id: toastId });
    }
  };

  return (
    <div className={cn("w-full p-4 space-y-8", className)}>
      
      {/* Header */}
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-primary" />
          Manage Instructions
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Upload PDF guides, manuals, and manage existing documents.
        </p>
      </div>

      {/* ================= TOP: UPLOAD FORM ================= */}
      <Card className="border-gray-100 dark:border-zinc-800 shadow-sm rounded-2xl bg-white dark:bg-zinc-950">
        <CardHeader className="bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800 pb-2">
          <CardTitle className="text-lg">Upload New Document</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label>Instruction Name <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. P04 User Manual"
                className="bg-gray-50 dark:bg-zinc-900 h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label>URL Slug</Label>
              <Input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="p04-user-manual"
                className="bg-gray-50 dark:bg-zinc-900 h-11 rounded-xl font-mono text-sm"
              />
              <p className="text-xs text-gray-500">Auto-generated, but can be manually edited.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                disabled={isSubmitting}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className={cn(
                  "flex items-center justify-center gap-2 w-full p-3 h-12 rounded-xl border-2 border-dashed transition-all cursor-pointer font-medium",
                  selectedFile 
                    ? "border-primary bg-primary/10 text-primary dark:bg-primary/20" 
                    : "border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              >
                {selectedFile ? (
                  <><FileText size={18} /> {selectedFile.name}</>
                ) : (
                  <><UploadCloud size={18} /> Click to Upload PDF</>
                )}
              </label>
            </div>

            <Button
              type="button"
              onClick={handleAddInstruction}
              disabled={!name || !slug || !selectedFile || isSubmitting}
              className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-[#16965f] text-white rounded-xl font-medium shrink-0"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Uploading...</>
              ) : (
                <><Plus className="w-5 h-5 mr-2" /> Add Document</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= BOTTOM: DOCUMENT LIST ================= */}
      <Card className="border-gray-100 dark:border-zinc-800 shadow-sm rounded-2xl bg-white dark:bg-zinc-950 overflow-hidden">
        <CardHeader className="bg-gray-50/50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg">Document Library</CardTitle>
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              className="w-full pl-9 bg-white dark:bg-zinc-900 h-10 rounded-lg border-gray-200 dark:border-zinc-800"
              type="text"
              placeholder="Search documents..."
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
                  <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Document Name</TableHead>
                  <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Slug</TableHead>
                  <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Upload Date</TableHead>
                  <TableHead className="text-right font-semibold text-gray-600 dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                      No documents found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.data.map((doc: IInstruction) => (
                    <TableRow key={doc._id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                      
                      {/* Name & Icon */}
                      <TableCell className="font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-lg shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <span className="truncate max-w-[200px] md:max-w-xs block" title={doc.name}>
                            {doc.name}
                          </span>
                        </div>
                      </TableCell>
                      
                      {/* Slug */}
                      <TableCell className="text-gray-500 dark:text-gray-400 font-mono text-xs">
                        /{doc.slug}
                      </TableCell>
                      
                      {/* Date */}
                      <TableCell className="text-gray-500 dark:text-gray-400 text-sm">
                        {formatDate(doc.createdAt)}
                      </TableCell>
                      
                      {/* Actions */}
                      <TableCell className="flex items-center justify-end gap-2 mt-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          onClick={() => window.open(doc.pdfFile, '_blank')}
                          title="View PDF"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        
                        <DeleteConfirmation onConfirm={() => handleDelete(doc._id)}>
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