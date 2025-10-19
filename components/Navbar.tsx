"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const Dropdown = ({ items }: { items: { name: string; href: string }[] }) => (
  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
    {items.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
      >
        {item.name}
      </Link>
    ))}
  </div>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const navItems = [
    { name: "আমাদের সম্পর্কে", href: "/about" },
    {
      name: "ইসলাম",
      href: "/category/islam",
      hasDropdown: true,
      dropdownItems: [
        { name: "নামাজ", href: "/category/islam/namaz" },
        { name: "রোযা", href: "/category/islam/roja" },
        { name: "হজ", href: "/category/islam/hajj" },
        { name: "যাকাত", href: "/category/islam/zakat" },
      ],
    },
    { name: "রিভিউ", href: "/category/review" },
  ];

  return (
    <header className="bg-white  sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Arif Azad Logo"
              width={60}
              height={60}
              className="rounded-full h-[40px] w-[40px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 font-medium relative">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                </Link>

                {/* Dropdown menu */}
                {item.hasDropdown && item.dropdownItems && (
                  <Dropdown items={item.dropdownItems} />
                )}
              </div>
            ))}
          </nav>

          {/* Search + Mobile menu toggle */}
          <div className="flex items-center space-x-4">
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex items-center border rounded-md p-1"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none px-2 text-sm"
              />
              <button
                type="submit"
                className="text-gray-500 hover:text-green-600"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                </Link>
                {item.hasDropdown && item.dropdownItems && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.dropdownItems.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block text-gray-600 hover:text-green-600 text-sm"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="flex sm:hidden items-center border rounded-md p-1 mt-4"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none px-2 text-sm w-full"
              />
              <button
                type="submit"
                className="text-gray-500 hover:text-green-600 p-1"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}
