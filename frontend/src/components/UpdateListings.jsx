import React, { useEffect, useState } from "react";
import { listingService } from "../services/lisitng-service";
import ListingCard from "./ListingCard";
import ListingDetailModal from "./ListingDetailModal";
import ListingDetailEditModal from "./ListingDetailEditModal";
import { toast } from "react-toastify";

const UpdateListings = ({ filterParams }) => {
  const onListingsChanged = () => {
    fetchListings();
  };
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCreateListing = async (data) => {
    try {
      await listingService.createListing(data);
      setShowCreateModal(false);
      fetchListings();
      toast.success("Listing created successfully");
    } catch (err) {
      toast.error("Failed to create listing");
    }
  };

  const fetchListings = async () => {
    try {
      const data = await listingService.getMyListings(filterParams);
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

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          className="bg-amber-800 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowCreateModal(true)}
        >
          + Add Listing
        </button>
      </div>
      {showCreateModal && (
        <ListingDetailEditModal
          listing={null}
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateListing}
          isCreateMode={true}
        />
      )}
      {loading && (
        <div className="py-20 flex items-center justify-center">
          <span className="font-display text-[12px] tracking-[0.15em] uppercase text-stone-800 animate-pulse">
            Loading…
          </span>
        </div>
      )}

      {listings.length === 0 && (
        <div className="py-20 flex items-center justify-center">
          <span className="font-display text-[12px] tracking-[0.15em] uppercase text-stone-800">
            No listings found
          </span>
        </div>
      )}
      {!loading && listings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onClick={() => setSelectedListing(listing)}
              onListingsChanged={onListingsChanged}
            />
          ))}
        </div>
      )}
      <ListingDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </>
  );
};

export default UpdateListings;
