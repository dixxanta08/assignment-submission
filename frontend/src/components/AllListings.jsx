import React, { useEffect, useState } from "react";
import { listingService } from "../services/lisitng-service";
import ListingCard from "./ListingCard";
import ListingDetailModal from "./ListingDetailModal";

const AllListings = ({ filterParams }) => {
  const onListingsChanged = () => {
    fetchListings();
  };
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);

  const fetchListings = async () => {
    try {
      const data = await listingService.getListings({
        ...filterParams,
        include_deleted: true,
      });
      setListings(data.properties ?? []);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [filterParams]);

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <span className="font-display text-[12px] tracking-[0.15em] uppercase text-stone-800 animate-pulse">
          Loading…
        </span>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="py-20 flex items-center justify-center">
        <span className="font-display text-[12px] tracking-[0.15em] uppercase text-stone-800">
          No listings found
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onClick={() => setSelectedListing(listing)}
            isEditable={true}
            onListingsChanged={onListingsChanged}
          />
        ))}
      </div>

      <ListingDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </>
  );
};

export default AllListings;
