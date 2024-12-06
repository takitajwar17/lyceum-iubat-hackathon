"use client";

import { useUser } from "@clerk/nextjs"; // Import useUser from Clerk
import {
  Bot,
  ChevronRight,
  Code2,
  Globe2,
  GraduationCap,
  Map,
  MessageSquare,
  Scale,
  Terminal,
  Trophy,
  Users,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

function SDGCard({ icon, number, title, description }) {
  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center mb-6">
        <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4 sm:mb-0 sm:mr-6">
          {icon}
        </div>
        <div>
          <div className="text-sm text-indigo-600 font-semibold">
            SDG {number}
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

const LandingPage = () => {
  const { isSignedIn, isLoaded } = useUser(); // Access user authentication state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // While the user state is loading, you might want to show a loader or nothing
  if (!isLoaded) {
    return null; // Or a loader component
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header and Navigation */}
      <header className="relative overflow-hidden">
        <nav className="fixed top-0 w-full z-20 bg-white shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Terminal className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600" />
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                Inherit
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

        {/* Hero Section */}
        <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <div className="md:w-1/2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Empowering Future
                  <span className="text-indigo-600"> Tech Leaders</span> in
                  Bangladesh
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-3xl mx-auto md:mx-0 px-4">
                  Bridge the digital divide with our unified learning platform.
                  Making coding education accessible, collaborative, and
                  empowering for everyone.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                    <button className="bg-indigo-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center w-full sm:w-auto">
                      Start Learning <ChevronRight className="ml-3 h-6 w-6" />
                    </button>
                  </Link>
                  <Link href="/watch-demo">
                    <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-full text-lg font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-colors w-full sm:w-auto">
                      Watch Demo
                    </button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <img
                  src="/hero.png"
                  alt="hero"
                  width={1000}
                  height={1000}
                  className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600">7.5K+</div>
                <div className="text-lg text-gray-700">Yearly IT Demand</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600">70%</div>
                <div className="text-lg text-gray-700">Rural Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600">24/7</div>
                <div className="text-lg text-gray-700">AI Support</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600">100%</div>
                <div className="text-lg text-gray-700">Free Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-20">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              <FeatureCard
                icon={<Youtube />}
                title="Learn Page"
                description="Curated video tutorials and interactive coding exercises to help you master programming concepts."
              />
              <FeatureCard
                icon={<Map />}
                title="Learning Roadmaps"
                description="Structured learning paths to guide your journey from beginner to professional developer."
              />
              <FeatureCard
                icon={<Bot />}
                title="AI Assistant"
                description="Get instant code reviews and suggestions to improve your coding skills."
              />
              <FeatureCard
                icon={<Users />}
                title="Guided Learning"
                description="Learn with expert guidance and mentorship in a supportive environment."
              />
              <FeatureCard
                icon={<Globe2 />}
                title="Accessible Education"
                description="Breaking barriers to provide quality education for all, anywhere."
              />
              <FeatureCard
                icon={<Trophy />}
                title="Quests"
                description="Engage in interactive coding challenges and earn rewards while building real-world projects."
              />
            </div>
          </div>
        </div>

        {/* SDGs Section */}
        <div id="sdgs" className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-20">
              Supporting UN Sustainable Development Goals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
              <SDGCard
                icon={<GraduationCap />}
                number="4"
                title="Quality Education"
                description="Providing accessible, high-quality coding education to bridge the digital skills gap."
              />
              <SDGCard
                icon={<Scale />}
                number="10"
                title="Reduced Inequalities"
                description="Breaking down barriers between urban and rural educational opportunities."
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-600 py-20">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto">
              Join thousands of learners who are transforming their lives
              through code.
            </p>
            <Link href="/join">
              <button className="bg-white text-indigo-600 px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Now - It's Free
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
              <div>
                <h3 className="text-white font-semibold text-xl mb-6">
                  Platform
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/features" className="hover:text-white text-lg">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tutorials"
                      className="hover:text-white text-lg"
                    >
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-white text-lg">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold text-xl mb-6">
                  Community
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/blog" className="hover:text-white text-lg">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/forums" className="hover:text-white text-lg">
                      Forums
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold text-xl mb-6">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/about" className="hover:text-white text-lg">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="hover:text-white text-lg">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white text-lg">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold text-xl mb-6">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/privacy" className="hover:text-white text-lg">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white text-lg">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookie-policy"
                      className="hover:text-white text-lg"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-16 pt-8 text-center">
              <p className="text-lg">
                &copy; {new Date().getFullYear()} Inherit. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </header>
    </div>
  );
};

export default LandingPage;
