"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Tiptap from "@/components/Tiptap";
import dynamic from "next/dynamic";
const Tiptap = dynamic(() => import("@/components/Tiptap"), { ssr: false });

export default function DashboardPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function uploadToCloudinary(file: File) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signatureRes = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ params: { timestamp } }),
    });
    const { signature, apiKey, cloudName } = await signatureRes.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await uploadRes.json();
    return data.secure_url;
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    let imageUrl = null;
    if (file) {
      imageUrl = await uploadToCloudinary(file);
    }

    try {
      let imageUrl = null;
      if (file) {
        imageUrl = await uploadToCloudinary(file);
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, coverImage: imageUrl }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      alert("Post created!");
      // Reset the form
      setTitle("");
      setContent("");
      setFile(null);
      setCoverImage(null);
    } catch (error: any) {
      console.error("Create Post Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!session) return <p>Please login</p>;

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h1>

      <form
        onSubmit={handleCreate}
        className="space-y-3 mb-6 bg-white p-4 rounded shadow"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full border p-2 rounded"
        />
        <Tiptap
          value={content}
          onChange={(content) => setContent(content)}
          placeholder="Write your detailed post content here..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFile(f);
                setCoverImage(URL.createObjectURL(f));
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {coverImage && (
          <img
            src={coverImage}
            alt="Preview"
            className="w-full max-h-64 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
