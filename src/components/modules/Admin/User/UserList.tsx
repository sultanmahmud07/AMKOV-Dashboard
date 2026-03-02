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
import { EyeIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router";
import { formatDate } from "@/utils/getDateFormater";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserActionMenu } from "./UserActionMenu";
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/features/user/user.api";
import { IApiError, IUser } from "@/types";
import TableSkeleton from "../../loader/Receiver/TableSkeleton";


export default function AllUserList() {
      const [currentPage, setCurrentPage] = useState(1);
      const [limit] = useState(10);
      const [searchTerm, setSearchTerm] = useState("")
      const [sortOrder, setSortOrder] = useState("")
      const { data, isLoading } = useGetAllUserQuery({ page: currentPage, limit, searchTerm, sort: sortOrder });
      const [updateUserByAdmin] = useUpdateUserMutation();
      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value)
      }

      const handleSortChange = (value: string) => {
            setSortOrder(value)
      }
      const handleRemoveUser = async (userId: string) => {
            const toastId = toast.loading("Removing...");
            const userInfo = {
                  isDeleted: true
            }
            try {
                  const res = await updateUserByAdmin({ userId, userInfo }).unwrap();
                  if (res.success) {
                        toast.dismiss(toastId);
                        toast.success("User delete successfully");
                  }
            } catch (err) {
                  console.error(err);
                  const error = err as IApiError;
                  toast.error(`${error.data.message}`);
            }
      };

      const totalPage = data?.meta?.totalPage || 1;
      // console.log(data)


      return (
            <div className="w-full ">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
                        <h1 className="text-2xl font-bold">Manage User</h1>
                        <Input
                              className="w-full md:w-sm"
                              type="text"
                              placeholder="Search here.."
                              value={searchTerm}
                              onChange={handleSearchChange}
                        />
                        <Select onValueChange={handleSortChange} value={sortOrder}>
                              <SelectTrigger className="md:w-[180px]">
                                    <SelectValue placeholder="Select a list order" />
                              </SelectTrigger>
                              <SelectContent>
                                    <SelectGroup>
                                          <SelectLabel>Order By</SelectLabel>
                                          <SelectItem value="createdAt">Ascending</SelectItem>
                                          <SelectItem value="-createdAt">Descending</SelectItem>
                                    </SelectGroup>
                              </SelectContent>
                        </Select>
                  </div>
                  {
                        isLoading ?
                              <TableSkeleton></TableSkeleton>
                              :
                              <Table>
                                    <TableHeader>
                                          <TableRow>
                                                <TableHead className="">Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className="">Status</TableHead>
                                                <TableHead className="text-center">Action</TableHead>
                                          </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                          {data?.data.map((user: IUser) => (
                                                <TableRow key={user._id}>
                                                      <TableCell className="font-bold uppercase">{user.name}</TableCell>
                                                      <TableCell className="font-medium">{user.email}</TableCell>
                                                      <TableCell>{user.role}</TableCell>
                                                      <TableCell className="">{formatDate(user.createdAt)}</TableCell>
                                                      <TableCell>{user.isActive}</TableCell>
                                                      <TableCell className="flex items-center justify-end gap-2">
                                                            <Link className="cursor-pointer" to={`/admin/user/${user._id}`}>
                                                                  <Button size="sm">
                                                                        <EyeIcon />
                                                                  </Button>
                                                            </Link>
                                                            <DeleteConfirmation
                                                                  onConfirm={() => handleRemoveUser(user._id)}
                                                            >
                                                                  <Button size="sm">
                                                                        <Trash2 />
                                                                  </Button>
                                                            </DeleteConfirmation>
                                                            <UserActionMenu user={user}></UserActionMenu>
                                                      </TableCell>
                                                </TableRow>
                                          ))}
                                    </TableBody>
                              </Table>
                  }
                  {totalPage > 1 && (
                        <div className="flex justify-end mt-4">
                              <div>
                                    <Pagination>
                                          <PaginationContent>
                                                <PaginationItem>
                                                      <PaginationPrevious
                                                            onClick={() => setCurrentPage((prev) => prev - 1)}
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
                                                                  <PaginationLink className="cursor-pointer" isActive={currentPage === page}>
                                                                        {page}
                                                                  </PaginationLink>
                                                            </PaginationItem>
                                                      )
                                                )}
                                                <PaginationItem>
                                                      <PaginationNext
                                                            onClick={() => setCurrentPage((prev) => prev + 1)}
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
                        </div>
                  )}
            </div>
      );
}
