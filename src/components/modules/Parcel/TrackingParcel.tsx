import { useState, useEffect } from "react";
import { useSearchParams } from "react-router"; // Import this
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/pages/Spinner";
import { useGetParcelDetailsByTrackingIdQuery } from "@/redux/features/parcel/parcel.api";
import { IStatusLog } from "@/types/parcel.type";

const ParcelTracking = () => {
  const [searchParams] = useSearchParams();
  const urlTrackId = searchParams.get("trackId") || "";

  const [trackingId, setTrackingId] = useState("");
  const [submittedId, setSubmittedId] = useState(""); 

  // 1. Auto-fill and auto-submit if URL has trackId
  useEffect(() => {
    if (urlTrackId) {
      setTrackingId(urlTrackId);
      setSubmittedId(urlTrackId);
    }
  }, [urlTrackId]);

  const { data: parcelInfo, isFetching } =
    useGetParcelDetailsByTrackingIdQuery(submittedId, {
      skip: !submittedId,
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId) {
      toast.error("Please enter a tracking ID");
      return;
    }

    setSubmittedId(trackingId);
  };

  return (
    <div className="py-8 md:py-14">
      <div className="main-container">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold">PARCEL TRACKING</h2>
          <p className="text-gray-500 mt-1">
            Track your parcel & see the current condition
          </p>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto p-6 md:p-10 rounded-xl shadow-sm border">
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            TRACK YOUR PARCEL
          </h3>
          <p className="text-muted-foreground mb-6">
            Now you can track your parcel easily
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4"
          >
            <input
              type="text"
              placeholder="Enter your parcel TRK"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 px-4 py-3 border bg-secondary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={isFetching}
              className="flex items-center justify-center bg-primary text-white font-bold px-6 py-3 rounded-lg shadow cursor-pointer transition disabled:opacity-70"
            >
              {isFetching ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" /> Tracking...
                </>
              ) : (
                "TRACK YOUR PARCEL"
              )}
            </button>
          </form>
        </div>

        {isFetching && <Loader />}
        
        {/* Only show details if we are NOT fetching and have data */}
        {!isFetching && parcelInfo ? (
          <div className="parcel-details w-full md:w-2/3 mx-auto mt-10 border rounded-xl shadow-md p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <h2 className="text-xl md:text-2xl font-bold">
                Parcel #{parcelInfo.trackingId}
              </h2>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    parcelInfo.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : parcelInfo.status === "REQUESTED"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {parcelInfo.status}
                </span>
                {parcelInfo.isBlocked && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                    Blocked
                  </span>
                )}
              </div>
            </div>

            {/* Parcel Info */}
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{parcelInfo.type}</p>
              </div>
              <div className="flex justify-between border-b pb-2">
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium">{parcelInfo.weight} kg</p>
              </div>
              {parcelInfo.fee && (
                <div className="flex justify-between border-b pb-2">
                  <p className="text-sm text-gray-500">Fee</p>
                  <p className="font-medium">{parcelInfo.fee || 0} BDT</p>
                </div>
              )}
              <div className="flex justify-between border-b pb-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-right">{parcelInfo.address}</p>
              </div>
              <div className="flex justify-between border-b pb-2">
                <p className="text-sm text-gray-500">Delivery Date</p>
                <p className="font-medium">
                  {new Date(parcelInfo.deliveryDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-between border-b pb-2">
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium">
                  {new Date(parcelInfo.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Updated At</p>
                <p className="font-medium">
                  {new Date(parcelInfo.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Sender & Receiver */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Sender & Receiver</h3>
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                <div>
                  <p className="text-sm text-gray-500">Sender</p>
                  <p className="font-medium">{parcelInfo.sender?.name}</p>
                  <p className="text-sm text-gray-500">{parcelInfo.sender?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Receiver</p>
                  <p className="font-medium">{parcelInfo.receiver?.name}</p>
                  <p className="text-sm text-gray-500">{parcelInfo.receiver?.email}</p>
                </div>
              </div>
            </div>

            {/* Status Logs */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Status Timeline</h3>
              <div className="space-y-3">
                {parcelInfo.statusLogs?.map((log: IStatusLog, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <p className="font-medium">{log.status}</p>
                    <p className="text-sm text-gray-500 text-right">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
        : <p className="text-center py-5 text-xl text-gray-400">No Parcel Found with this {searchParams.get("trackingNumber")}</p>}

      </div>
    </div>
  );
};

export default ParcelTracking;