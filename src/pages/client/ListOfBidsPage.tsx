import { useEffect, useState } from "react";
import { User, ClipboardList } from "lucide-react";
import Navbar from "../../components/Navbar";

const ListOfBidsPage = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const storedBids = JSON.parse(localStorage.getItem("bids") || "[]");
    console.log("Loaded Bids:", storedBids);
    setBids(storedBids);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 mt-14">
            <ClipboardList size={24} className="text-[#AA8F66]" /> List
        </h1>

        {bids.length === 0 ? (
          <p className="text-gray-500 text-center">No bids placed yet.</p>
        ) : (
          <div className="space-y-4">
            {bids.map((bid, index) => (
              <div
                key={index}
                className="border-2 border-[#AA8F66] rounded-lg bg-white p-4 flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={bid.image}
                  alt={bid.title}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {bid.title}
                  </h2>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <User size={14} className="text-gray-500" /> {bid.bidder}
                  </p>
                  <p className="text-sm text-gray-500">Artist: {bid.artists || "Unknown"}</p>
                  <p className="text-sm text-gray-500">
                    Price: {bid.bidAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-800">
                    Status: {bid.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListOfBidsPage; 