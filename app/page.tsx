import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/index";

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
    cache: "no-store",
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default async function HomePage() {
  const posts: Post[] = await getPosts();

  return (
    <main>
      <Hero />
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">সর্বশেষ ব্লগ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-green-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-700 transition-colors">
            আরও ব্লগ পড়ুন
          </button>
        </div>
      </section>
    </main>
  );
}
