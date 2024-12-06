"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function AdminHeader() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    Cookies.remove("adminAuth", { path: "/" });
    sessionStorage.removeItem("adminAuth");
    window.location.href = "/admin/login";
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand and Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <nav className="hidden md:ml-6 md:flex space-x-4">
              <button 
                onClick={() => router.push("/admin")}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Quests
              </button>
              {/* Add more navigation items as needed */}
            </nav>
          </div>

          {/* Right side - User Info and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-end">
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm font-medium text-gray-900">
                Admin User
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
