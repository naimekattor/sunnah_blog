import DOMPurify from "isomorphic-dompurify";
export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`/api/posts/approve/${id}`, {
    cache: "no-store",
  });
  const post = await res.json();

  const sanitizedContent = DOMPurify.sanitize(post.content || "");

  return (
    <div className="max-w-7xl mx-auto  p-6 ">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="mb-4 w-full max-h-96 object-cover rounded"
        />
      )}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4  mt-16">{post.title}</h1>
        <p className="mb-2 text-sm text-gray-500">
          Approved by: {post.approvedBy?.name ?? "—"}
        </p>
        <div
          className=" prose max-w-none break-words whitespace-pre-wrap overflow-x-auto
             [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre_code]:whitespace-pre-wrap [&_pre_code]:break-words"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>

      {/* <div className="max-w-5xl mx-auto">{sanitizedContent}</div> */}
    </div>
  );
}
