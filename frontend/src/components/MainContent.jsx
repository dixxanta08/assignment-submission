import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ViewListings from "./ViewListings";
import UpdateListings from "./UpdateListings";
import AllListings from "./AllListings";

const MainContent = ({ filterParams }) => {
  const [activeTab, setActiveTab] = useState("View Listings");
  const [listingsKey, setListingsKey] = useState(0);
  const { loggedInUser } = useContext(AuthContext);

  const tabs = useMemo(
    () =>
      loggedInUser
        ? loggedInUser.isAdmin
          ? ["View Listings", "My Listings", "All Listings"]
          : ["View Listings", "My Listings"]
        : ["View Listings"],
    [loggedInUser],
  );

  const handleListingsChanged = () => {
    setListingsKey((k) => k + 1);
  };

  return (
    <main className="flex-1 min-h-screen pt-16 lg:ml-64">
      {/* Tab bar */}
      <div className="border-b border-stone-200 px-8">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-display text-[12px] tracking-[0.12em] uppercase py-4 border-b-[1.5px] transition-colors duration-200
                ${
                  activeTab === tab
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-800 hover:text-stone-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-10">
        <span className="font-display text-[13px] tracking-wide text-stone-800">
          {activeTab === "View Listings" && (
            <ViewListings
              key={"view-" + listingsKey}
              filterParams={filterParams}
              onListingsChanged={handleListingsChanged}
            />
          )}
          {activeTab === "My Listings" && (
            <UpdateListings
              key={"my-" + listingsKey}
              filterParams={filterParams}
              onListingsChanged={handleListingsChanged}
            />
          )}
          {activeTab === "All Listings" && (
            <AllListings
              key={"all-" + listingsKey}
              filterParams={filterParams}
              onListingsChanged={handleListingsChanged}
            />
          )}
        </span>
      </div>
    </main>
  );
};

export default MainContent;
