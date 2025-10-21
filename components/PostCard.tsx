// components/PostCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";

export default function PostCard({ post }: { post: Post }) {
  console.log(post);

  return (
    <div className=" rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/blog/${post.id}`}>
        <Image
          src={post.coverImage || "/images/noimg1.jpg"}
          alt={post.title || "No image available"}
          width={400}
          height={250}
          className="w-full object-cover"
        />
      </Link>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">
          <Link
            href={`/blog/${post.id}`}
            className="hover:text-green-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {post?.name} {post.date}
        </p>
        <p className="text-gray-700 mb-4">{post.excerpt}</p>
        <Link
          href={`/blog/${post.id}`}
          className="font-semibold text-green-600 hover:text-green-700 transition-colors"
        >
          পুরোটা পড়ুন →
        </Link>
      </div>
    </div>
  );
}
