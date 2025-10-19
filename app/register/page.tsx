'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const router = useRouter();

  const showToast = (message: string, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // ⛔ Don't make this function async directly
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    (async () => {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        });

        const data = await res.json();

        if (res.ok) {
          showToast("✅ Registration successful!");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          showToast(data.message || "Registration failed", "error");
        }
      } catch (err) {
        showToast("An unexpected error occurred", "error");
      }
    })();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {toast && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow w-96 space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
