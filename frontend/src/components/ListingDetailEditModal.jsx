import React, { useState } from "react";
import { listingService } from "../services/lisitng-service";
import FileUpload from "./FileUpload";
import { toast } from "react-toastify";

const ListingDetailEditModal = ({ listing, onClose, onSave, isCreateMode }) => {
  const [title, setTitle] = useState(listing?.title || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    listing?.thumbnail_url || "",
  );
  const [description, setDescription] = useState(listing?.description || "");
  const [price, setPrice] = useState(listing?.price || "");
  const [beds, setBeds] = useState(listing?.beds || "");
  const [baths, setBaths] = useState(listing?.baths || "");
  const [address, setAddress] = useState(listing?.address || "");
  const [suburb, setSuburb] = useState(listing?.suburb || "");
  const [propertyType, setPropertyType] = useState(
    listing?.property_type || "",
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = {
        title,
        description,
        price: Number(price),
        beds: Number(beds),
        baths: Number(baths),
        address,
        suburb,
        property_type: propertyType,
        thumbnail_url: thumbnailUrl,
      };
      if (!data.thumbnail_url) delete data.thumbnail_url;
      if (isCreateMode) {
        await onSave(data);
      } else {
        await listingService.updateListing(listing.id, data);
        if (onSave) onSave();
      }
    } catch (err) {
      toast.error(
        isCreateMode ? "Failed to create listing" : "Failed to update listing",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs bg-black/30 flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="absolute bg-white border border-stone-400 shadow-2xl overflow-hidden"
        style={{
          width: "400px",
          maxHeight: "90vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 overflow-y-auto" style={{ maxHeight: "80vh" }}>
          <h2 className="font-display text-[15px] text-stone-900 mb-4">
            {isCreateMode ? "Create Listing" : "Edit Listing"}
          </h2>
          <div className="mb-4">
            <label className="block text-sm mb-1">Title</label>
            <input
              className="w-full border px-2 py-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Image</label>
            {thumbnailUrl && (
              <img
                src={`http://localhost:3000${thumbnailUrl}`}
                alt="Listing"
                style={{ maxWidth: 200, maxHeight: 200, marginBottom: 8 }}
              />
            )}
            <FileUpload onUpload={setThumbnailUrl} />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full border px-2 py-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              className="w-full border px-2 py-1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="mb-4 flex gap-2">
            <div className="flex-1">
              <label className="block text-sm mb-1">Beds</label>
              <input
                type="number"
                className="w-full border px-2 py-1"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                disabled={saving}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Baths</label>
              <input
                type="number"
                className="w-full border px-2 py-1"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                disabled={saving}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Address</label>
            <input
              className="w-full border px-2 py-1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Suburb</label>
            <input
              className="w-full border px-2 py-1"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Property Type</label>
            <select
              className="w-full border px-2 py-1"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              disabled={saving}
            >
              <option value="">Select type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="bg-stone-200 text-stone-900 px-4 py-2 border border-stone-300"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              className="bg-stone-900 text-white px-4 py-2"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? isCreateMode
                  ? "Creating..."
                  : "Saving..."
                : isCreateMode
                  ? "Create"
                  : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailEditModal;
