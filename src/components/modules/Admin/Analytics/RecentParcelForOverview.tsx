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
import { EyeIcon, ShieldMinus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useBlockParcelByAdminMutation, useGetAllParcelsQuery, useRemoveParcelMutation } from "@/redux/features/parcel/parcel.api";
import { IParcel } from "@/types/parcel.type";
import { Link } from "react-router";
import { formatDate } from "@/utils/getDateFormater";
import { Label } from "@/components/ui/label";
import { IApiError } from "@/types";
import { ParcelActionMenu } from "../Parcel/ParcelActionMenu";


export default function RecentParcelForOverview() {
      const [limit] = useState(10);
      const { data, isLoading } = useGetAllParcelsQuery({ page: 1, limit });
      const [removeParcel] = useRemoveParcelMutation();
      const [blockParcelByAdmin] = useBlockParcelByAdminMutation();
      const handleRemoveParcel = async (parcelId: string) => {
            const toastId = toast.loading("Removing...");
            try {
                  const res = await removeParcel(parcelId).unwrap();

                  if (res.success) {
                        toast.success("Parcel remove successfully!");
                        toast.dismiss(toastId);
                  }
            } catch (err) {
                  toast.dismiss(toastId);
                  console.error(err);
            }
      };

      const handleUpdateParcel = async (parcel: IParcel) => {
            const toastId = toast.loading("Updating...");
            const parcelId = parcel?._id || "";
            const parcelInfo = {
                  isBlocked: !parcel.isBlocked
            }
            try {
                  const res = await blockParcelByAdmin({ parcelId, parcelInfo }).unwrap();
                  if (res.success) {
                        toast.dismiss(toastId);
                        toast.success("Parcel updated successfully");
                  }
            } catch (err) {
                  console.error(err);
                  const error = err as IApiError;
                  toast.error(`${error.data.message}`);
            }
      };

      return (
            <div className="w-full my-5 py-3 border-t">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
                        <h1 className="text-2xl font-bold">Recent Parcels</h1>
                        <Link className="underline text-primary" to={"/admin/parcels"}>View all</Link>
                  </div>
                  <Table>
                        <TableHeader>
                              <TableRow>
                                    <TableHead className="">Type</TableHead>
                                    <TableHead>Weight</TableHead>
                                    <TableHead>Deu Amount</TableHead>
                                    <TableHead>Delivery Date</TableHead>
                                    <TableHead className="">Address</TableHead>
                                    <TableHead className="text-center">Action</TableHead>
                              </TableRow>
                        </TableHeader>
                        {
                              isLoading ?
                                    <div>Loading...</div>
                                    :
                                    <TableBody>
                                          {data?.data.map((parcel: IParcel) => (
                                                <TableRow key={parcel._id}>
                                                      <TableCell className="font-medium">{parcel.type}</TableCell>
                                                      <TableCell className="font-medium">{parcel.weight}</TableCell>
                                                      <TableCell>{parcel.fee || 0}</TableCell>
                                                      <TableCell className="">{formatDate(parcel.deliveryDate)}</TableCell>
                                                      <TableCell>
                                                            {parcel.address.length > 25
                                                                  ? parcel.address.slice(0, 25) + ".."
                                                                  : parcel.address}
                                                      </TableCell>

                                                      <TableCell className="flex items-center gap-2">
                                                            <div className="flex items-center space-x-2">
                                                                  {/* <Switch id="airplane-mode" />
       */}
                                                                  <Button onClick={() => handleUpdateParcel(parcel)} size="sm">
                                                                        <ShieldMinus size={72} strokeWidth={2.25} />
                                                                  </Button>
                                                                  <Label htmlFor="airplane-mode">{parcel.isBlocked ? "Blocked" : "Unblock"}</Label>
                                                            </div>
                                                            <Link className="w-full cursor-pointer" to={`/admin/parcel/${parcel._id}`}>
                                                                  <Button size="sm">
                                                                        <EyeIcon />
                                                                  </Button>
                                                            </Link>
                                                            <DeleteConfirmation
                                                                  onConfirm={() => handleRemoveParcel(parcel._id)}
                                                            >
                                                                  <Button size="sm">
                                                                        <Trash2 />
                                                                  </Button>
                                                            </DeleteConfirmation>
                                                            <ParcelActionMenu parcel={parcel}></ParcelActionMenu>
                                                      </TableCell>
                                                </TableRow>
                                          ))}
                                    </TableBody>
                        }
                  </Table>
            </div>
      );
}
