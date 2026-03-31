import React, { useContext, useState } from "react";
import ListingDetailEditModal from "./ListingDetailEditModal";
import { AuthContext } from "../context/AuthContext";
import { listingService } from "../services/lisitng-service";

const ListingCard = ({ listing, onClick, isEditable, onListingsChanged }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useContext(AuthContext);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  const typeLabel = {
    apartment: "Apartment",
    house: "House",
    studio: "Studio",
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      await listingService.deleteListing(listing.id);
      if (onListingsChanged) onListingsChanged();
    } catch (err) {
      console.log("Failed to delete listing:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (e) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      await listingService.restoreListing(listing.id);
      if (onListingsChanged) onListingsChanged();
    } catch (err) {
      console.log("Failed to restore listing:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        className="bg-white border border-stone-200 cursor-pointer group hover:border-stone-400 transition-colors duration-200 relative"
      >
        {/* Image placeholder */}
        <div className="w-full h-52 bg-stone-100 overflow-hidden relative">
          {listing.thumbnail_url ? (
            <img
              src={`http://localhost:3000${listing.thumbnail_url}`}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {listing.is_deleted && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1">
                  Deleted
                </span>
              )}
              <div className="flex flex-col items-center gap-2 opacity-30">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect
                    x="2"
                    y="10"
                    width="28"
                    height="20"
                    stroke="#1a1a1a"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2 10L16 2L30 10"
                    stroke="#1a1a1a"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="12"
                    y="20"
                    width="8"
                    height="10"
                    stroke="#1a1a1a"
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="font-display text-[10px] tracking-widest uppercase text-stone-800">
                  No image
                </span>
              </div>
            </div>
          )}

          {/* Property type badge */}
          <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-1">
            <span className="font-display text-[10px] tracking-[0.15em] uppercase text-stone-600">
              {typeLabel[listing.property_type] ?? listing.property_type}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-display text-[14px] text-stone-900 leading-snug">
              {listing.title}
            </h3>
            <span className="font-display text-[14px] text-stone-900 whitespace-nowrap shrink-0">
              {formatPrice(listing.price)}
            </span>
          </div>

          <p className="font-display text-[12px] text-stone-800 mb-4 tracking-wide">
            {listing.suburb} · {listing.address}
          </p>

          {/* Beds / baths */}
          <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
            <span className="font-display text-[11px] tracking-[0.1em] uppercase text-stone-500">
              {listing.beds} {listing.beds === 1 ? "Bed" : "Beds"}
            </span>
            <div className="w-px h-3 bg-stone-200" />
            <span className="font-display text-[11px] tracking-[0.1em] uppercase text-stone-500">
              {listing.baths} {listing.baths === 1 ? "Bath" : "Baths"}
            </span>
            <div className="ml-auto">
              <span className="font-display text-[10px] tracking-wide text-stone-800">
                {listing.agent.name}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          {isEditable && !listing.is_deleted && (
            <div className="flex gap-2 mt-4">
              <button
                className="bg-stone-200 text-stone-900 px-3 py-1 border border-stone-300 text-xs rounded"
                onClick={handleEdit}
                disabled={loading}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 border border-red-600 text-xs rounded"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
          {/* Restore button for admin if deleted */}
          {listing.is_deleted && loggedInUser?.isAdmin && (
            <div className="flex gap-2 mt-4">
              <button
                className="bg-green-500 text-white px-3 py-1 border border-green-600 text-xs rounded"
                onClick={handleRestore}
                disabled={loading}
              >
                {loading ? "Restoring..." : "Restore"}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Edit Modal */}
      {showEditModal && (
        <ListingDetailEditModal
          listing={listing}
          onClose={() => setShowEditModal(false)}
          onSave={() => {
            setShowEditModal(false);
            if (onListingsChanged) onListingsChanged();
          }}
        />
      )}
    </>
  );
};

export default ListingCard;
