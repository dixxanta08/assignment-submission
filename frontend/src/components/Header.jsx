import { useContext, useState } from "react";
import AuthModal from "./AuthModal";
import { AuthContext } from "../context/AuthContext";

const Header = ({ onSidebarToggle }) => {
  const loggedInUser = useContext(AuthContext).loggedInUser;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden w-8 h-8 flex flex-col justify-center gap-1.5 px-1 mr-2"
            aria-label="Open sidebar"
          >
            <span className="block h-px bg-stone-900 w-full" />
            <span className="block h-px bg-stone-900 w-2/3" />
            <span className="block h-px bg-stone-900 w-full" />
          </button>
          <div className="w-7 h-7 border border-stone-900 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-stone-900" />
          </div>
          <span className="font-display text-[13px] tracking-[0.18em] uppercase text-stone-900 font-normal select-none">
            Properties
          </span>
        </div>

        {!!loggedInUser && (
          <span className="text-sm text-stone-700">
            Welcome, {loggedInUser.name}!
          </span>
        )}
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className={`font-display text-[11px] tracking-[0.12em] uppercase transition-all duration-200 px-4 py-2 rounded-sm
            ${
              loggedInUser
                ? "bg-stone-900 text-stone-50 hover:bg-stone-700"
                : "bg-amber-700 text-stone-50 hover:bg-amber-800"
            }`}
        >
          {loggedInUser ? "Log out" : "Log in"}
        </button>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;
