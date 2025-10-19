// components/Footer.tsx
"use client";
import { useState } from "react";
import {
  Facebook,
  Youtube,
  Send,
  Instagram,
  Twitter,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // API endpoint for newsletter subscription would go here
    alert(`Thank you for subscribing, ${name}!`);
    setName("");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white  pt-16">
      <div className="container mx-auto px-4">
        {/* About & Social */}
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">আরিফ আজাদ</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8">
            আরিফ আজাদ একজন লেখক এবং সোশ্যাল মিডিয়া অ্যাক্টিভিস্ট। ২০১৯ সালে
            ‘প্যারাডক্সিক্যাল সাজিদ’ বইয়ের মাধ্যমে লেখালেখির জগতে প্রবেশ করেন।
          </p>
          <h3 className="text-2xl font-bold mb-4">সোশ্যাল মিডিয়ায় ফলো করুন</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Youtube size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400">
              <Send size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-sky-500">
              <Twitter size={24} />
            </a>
          </div>
        </div> */}

        {/* Newsletter */}
        {/* <div className="max-w-2xl mx-auto bg-green-50 p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-bold text-center mb-4">
            ই-মেইলে লেখা পেতে সাবস্ক্রাইব করুন
          </h3>
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name*
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div> */}
      </div>

      {/* Copyright */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm relative">
          <p>Copyright © 2025 - by Naim</p>
          <button
            onClick={scrollToTop}
            className="absolute right-4 bottom-1/2 translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
