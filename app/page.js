"use client";
import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { FiMenu, FiX } from "react-icons/fi";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <header className="bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">PromptWiki</h1>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <FiX className="h-6 w-6 text-white" />
              ) : (
                <FiMenu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            className={`flex-col md:flex md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 ${
              isMenuOpen ? "flex" : "hidden"
            } md:flex`}
          >
            <SignedOut>
              <SignInButton redirectTo="/platform">
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Log In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              {/* Navigation Links for Signed-In Users */}
              <Link href="/dashboard">
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Dashboard
                </button>
              </Link>
              <Link href="/new-analysis">
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                  New Analysis
                </button>
              </Link>
              <Link href="/generated-questions">
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Generated Questions
                </button>
              </Link>
              <Link href="/chat-interface">
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Chat Interface
                </button>
              </Link>
              {/* UserButton as the last item */}
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4 md:px-0">
        <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
        <p className="text-lg mb-4">Explore our features and services.</p>
        <Link href="/get-started">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Get Started
          </button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-4">
        <p className="text-sm text-gray-400">© 2024 My Company</p>
      </footer>
    </div>
  );
}
