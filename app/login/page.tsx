"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) router.push("/dashboard");
    else alert("Login failed");
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
