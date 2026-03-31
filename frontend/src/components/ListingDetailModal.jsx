import React, { useEffect } from "react";

const ListingDetailModal = ({ listing, onClose }) => {
  if (!listing) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs bg-black/30 flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="absolute bg-white border border-stone-400 shadow-2xl overflow-hidden"
        style={{
          width: "380px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow:
            "0 25px 60px -10px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full bg-stone-100"
          style={{ height: "180px", position: "relative" }}
        >
          {listing.image ? (
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 opacity-20">
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
                <span className="font-display text-[9px] tracking-widest uppercase text-stone-800">
                  No image
                </span>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors text-lg leading-none shadow-sm"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto" style={{ maxHeight: "260px" }}>
          <div className="flex items-start justify-between gap-4 mb-1">
            <h2 className="font-display text-[15px] text-stone-900 leading-snug">
              {listing.title}
            </h2>
            <span className="font-display text-[14px] text-stone-900 whitespace-nowrap shrink-0">
              {formatPrice(listing.price)}
            </span>
          </div>

          <p className="font-display text-[11px] text-stone-800 tracking-wide mb-4">
            {listing.address}
          </p>

          <div className="flex gap-4 py-3 border-y border-stone-100 mb-4">
            <div>
              <p className="font-display text-[9px] tracking-[0.15em] uppercase text-stone-800 mb-0.5">
                Beds
              </p>
              <p className="font-display text-[15px] text-stone-900">
                {listing.beds}
              </p>
            </div>
            <div className="w-px bg-stone-100" />
            <div>
              <p className="font-display text-[9px] tracking-[0.15em] uppercase text-stone-800 mb-0.5">
                Baths
              </p>
              <p className="font-display text-[15px] text-stone-900">
                {listing.baths}
              </p>
            </div>
            <div className="w-px bg-stone-100" />
            <div>
              <p className="font-display text-[9px] tracking-[0.15em] uppercase text-stone-800 mb-0.5">
                Suburb
              </p>
              <p className="font-display text-[15px] text-stone-900">
                {listing.suburb}
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-[9px] tracking-[0.15em] uppercase text-stone-700 mb-0.5">
              {listing.property_type}
            </p>
          </div>
          <p className="font-display text-[12px] text-stone-500 leading-relaxed mb-4">
            {listing.description}
          </p>

          <div className="pt-3 border-t border-stone-100">
            <p className="font-display text-[9px] tracking-[0.15em] uppercase text-stone-800 mb-0.5">
              Listed by
            </p>
            <p className="font-display text-[12px] text-stone-900">
              {listing.agent.name}
            </p>
            <p className="font-display text-[10px] text-stone-800">
              {listing.agent.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailModal;
