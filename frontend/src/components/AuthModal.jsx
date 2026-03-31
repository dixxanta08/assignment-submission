import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthModal = ({ isOpen, onClose }) => {
  const { loggedInUser, login, logout } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="relative w-80 bg-white rounded-md shadow-lg z-10">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <span className="text-sm font-medium">
            {loggedInUser ? "Account" : "Login"}
          </span>
          <button onClick={onClose} className="font-bold">
            ✕
          </button>
        </div>

        <div className="p-4">
          {loggedInUser ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm">Logged in as {loggedInUser.name}</p>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
                disabled={loading}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded"
                required
              />

              <button
                type="submit"
                className="bg-black text-white py-2 rounded"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
