import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useState } from "react";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const handleFilters = (filters) => {
    setFilterParams(filters);
  };
  return (
    <>
      <Header onSidebarToggle={() => setSidebarOpen(true)} />
      <div className="lg:flex">
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          onApplyFilters={handleFilters}
        />
        <MainContent filterParams={filterParams} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
