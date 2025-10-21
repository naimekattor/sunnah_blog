"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();
  type Post = {
    id: string;
    title: string;
    content: string;
    status: "PENDING" | "APPROVED" | "REJECTED" | string;
    authorId?: string;
    createdAt?: string;
  };

  const [pendingPosts, setPendingPosts] = useState<Post[]>([]);

  async function fetchPending() {
    const res = await fetch("/api/posts");
    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to fetch posts:", data);
      setPendingPosts([]);
      return;
    }

    setPendingPosts(
      Array.isArray(data)
        ? (data as Post[]).filter((p: Post) => p.status === "PENDING")
        : []
    );
  }

  async function approvePost(id: string) {
    await fetch(`/api/posts/aprove/${id}`, { method: "PATCH" });
    fetchPending();
  }

  useEffect(() => {
    fetchPending();
  }, []);

  if (!session || session.user.role !== "ADMIN") return <p>Unauthorized</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pending Posts</h1>
      {pendingPosts.length === 0 && <p>No pending posts.</p>}
      <div className="space-y-3">
        {pendingPosts.map((post: Post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <button
              onClick={() => approvePost(post.id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
