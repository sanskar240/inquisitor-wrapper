"use client";
import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { FiMenu, FiX } from "react-icons/fi";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans">
      {/* Header Section */}
      <header className="bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-blue-400">PromptWiki</h1>

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
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Log In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              {/* Navigation Links for Signed-In Users */}
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
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl md:text-6xl font-bold text-blue-400 mt-10">
          Empower Your AI Experience
        </h2>
        <p className="text-xl md:text-2xl mt-4 text-gray-300">
          Discover insights, generate questions, and chat with intelligent prompts—all in one place.
        </p>
        <Link href="/new-analysis">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold mt-8 hover:bg-blue-600 transition duration-200">
            Get Started for Free
          </button>
        </Link>
      </main>

      {/* Features Section */}
      <section className="container mx-auto py-12 px-6">
        <h3 className="text-3xl font-semibold mb-6 text-center">Why Choose PromptWiki?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold mb-3 text-blue-400">Real-Time Analysis</h4>
            <p className="text-gray-400">
              Instantly analyze and generate insights with advanced AI tools tailored to your needs.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold mb-3 text-blue-400">Collaborative Platform</h4>
            <p className="text-gray-400">
              Work together seamlessly, sharing and reviewing content across teams.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold mb-3 text-blue-400">Powerful Analytics</h4>
            <p className="text-gray-400">
              Gain valuable insights with data-driven analytics to make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold mb-6 text-center">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-400">
                "PromptWiki has transformed our workflow. We save so much time with its collaborative tools!"
              </p>
              <h5 className="text-blue-400 mt-4 font-semibold">— Alex, Product Manager</h5>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-400">
                "The analytics features help us make smarter decisions quickly. Highly recommend!"
              </p>
              <h5 className="text-blue-400 mt-4 font-semibold">— Mia, Data Analyst</h5>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-500 py-12 text-center">
        <h3 className="text-3xl font-bold text-white">Ready to elevate your AI experience?</h3>
        <p className="text-lg text-gray-100 mt-2">
          Join thousands of users who are already optimizing their workflow with PromptWiki.
        </p>
        <Link href="/get-started">
          <button className="bg-white text-blue-500 px-6 py-3 rounded-lg text-lg font-semibold mt-6 hover:bg-gray-100 transition duration-200">
            Start Free Trial
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-4">
        <p className="text-sm text-gray-400">© 2024 PromptWiki. All rights reserved.</p>
      </footer>
    </div>
  );
}
