"use client";

import { useUser } from "@clerk/nextjs";
import { Terminal } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const LandingPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="relative overflow-hidden">
        <nav className="fixed top-0 w-full z-20 bg-white shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Terminal className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600" />
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                Lyceum
              </span>
            </div>

            {/* Hamburger Menu Button (Visible on Mobile) */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Desktop Navigation Links (Hidden on Mobile) */}
            <div className="hidden md:flex space-x-6 items-center">
              <Link
                href="#features"
                className="text-lg text-gray-600 hover:text-gray-900"
              >
                Features
              </Link>
              <Link
                href="#mission"
                className="text-lg text-gray-600 hover:text-gray-900"
              >
                Mission
              </Link>
              <Link
                href="#sdgs"
                className="text-lg text-gray-600 hover:text-gray-900"
              >
                SDGs
              </Link>
              <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                <button className="bg-[#000033] text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Links (Visible on Mobile Only) */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-md">
              <div className="flex flex-col space-y-4 px-4 py-6">
                <Link
                  href="#features"
                  className="text-lg text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#mission"
                  className="text-lg text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mission
                </Link>
                <Link
                  href="#sdgs"
                  className="text-lg text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SDGs
                </Link>
                <Link
                  href={isSignedIn ? "/dashboard" : "/sign-in"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <button className="bg-[#000033] text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors w-full">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default LandingPage;
