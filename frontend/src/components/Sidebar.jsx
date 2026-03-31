import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    property_type: "",
    suburb: "",
    min_price: "",
    max_price: "",
    beds: "",
    baths: "",
    search: "",
    sort_by: "",
    sort_order: "ASC",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const cleaned = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "" && v !== null),
    );
    onApplyFilters(cleaned);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const initialFilters = {
      property_type: "",
      suburb: "",
      min_price: "",
      max_price: "",
      beds: "",
      baths: "",
      search: "",
      sort_by: "",
      sort_order: "ASC",
    };
    setFilters(initialFilters);
    onApplyFilters({});
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 bg-stone-50 border-r border-stone-200 w-64
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 lg:hidden">
          <span className="font-display text-[12px] tracking-[0.18em] uppercase text-stone-900">
            Filters
          </span>
          <button onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="px-6 py-6 space-y-4 text-sm">
          {/* Search */}
          <input
            placeholder="Search..."
            className="w-full border p-2"
            onChange={(e) => handleChange("search", e.target.value)}
            value={filters.search}
          />

          {/* Property Type */}
          <select
            className="w-full border p-2"
            onChange={(e) => handleChange("property_type", e.target.value)}
            value={filters.property_type}
          >
            <option value="">Property Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
          </select>

          {/* Suburb */}
          <input
            placeholder="Suburb"
            className="w-full border p-2"
            onChange={(e) => handleChange("suburb", e.target.value)}
            value={filters.suburb}
          />
          {/* Add controlled inputs for price, beds, baths, sort_by, sort_order */}
          {/* Price */}
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 border p-2"
              onChange={(e) => handleChange("min_price", e.target.value)}
              value={filters.min_price}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 border p-2"
              onChange={(e) => handleChange("max_price", e.target.value)}
              value={filters.max_price}
            />
          </div>

          {/* Beds & Baths */}
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Beds"
              className="w-1/2 border p-2"
              onChange={(e) => handleChange("beds", e.target.value)}
              value={filters.beds}
            />
            <input
              type="number"
              placeholder="Baths"
              className="w-1/2 border p-2"
              onChange={(e) => handleChange("baths", e.target.value)}
              value={filters.baths}
            />
          </div>

          {/* Sorting */}
          <select
            className="w-full border p-2"
            onChange={(e) => handleChange("sort_by", e.target.value)}
            value={filters.sort_by}
          >
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>

          <select
            className="w-full border p-2"
            onChange={(e) => handleChange("sort_order", e.target.value)}
            value={filters.sort_order}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="w-full bg-stone-900 text-white py-2 mb-2"
          >
            Apply Filters
          </button>
          {/* Clear Button */}
          <button
            onClick={clearFilters}
            className="w-full bg-stone-200 text-stone-900 py-2 border border-stone-300"
          >
            Clear Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
