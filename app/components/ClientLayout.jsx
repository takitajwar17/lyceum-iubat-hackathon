"use client";

import { usePathname } from "next/navigation";
import { useState } from "react"; 
import Header from "./Header"; 
import Sidebar from "./Sidebar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Normalize the pathname to handle trailing slashes
  const normalizedPath = pathname.replace(/\/+$/, "");
  const isHomePage = normalizedPath === "" || normalizedPath === "/";

  // Define paths where Sidebar should not be rendered
  const excludedPaths = ["/sign-in", "/sign-up"];
  const isExcludedPath =
    excludedPaths.includes(normalizedPath) || 
    pathname === "/not-found" || 
    pathname.startsWith("/admin");

  const shouldRenderSidebar = !isHomePage && !isExcludedPath;

  const [isOpen, setIsOpen] = useState(false); 

  // Don't render any layout components for admin paths
  if (pathname.startsWith("/admin")) {
    return children;
  }

  return (
    <>
      {/* Conditionally render Header */}
      {!isHomePage && <Header />}

      {/* Conditionally render Sidebar */}
      {shouldRenderSidebar && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}

      <main
        className={`w-full transition-all duration-300 ${
          !isHomePage ? "pt-20" : ""
        } ${
          shouldRenderSidebar && isOpen && window.innerWidth >= 768
            ? "pl-56"
            : shouldRenderSidebar ? "pl-8" : ""
        }`}
      >
        <div className="flex items-start justify-center min-h-screen w-full">
          <div className="w-full">{children}</div>
        </div>
      </main>
    </>
  );
}
