import React from "react";
import Title from "@/components/layout/Products/Title";
import { getLatestBlogs } from "@/lib/frontend-data";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";

const LatestBlog = () => {
  const blogs = getLatestBlogs();
  return (
    <section className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between border-b border-grey/60 pb-3">
        <Title className="text-accent">Latest Blogs</Title>

        <Link
          href="/blogs"
          className="text-sm font-semibold tracking-wide transition-colors hover:text-primary"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {blogs.map((blog) => {
          if (!blog.slug?.current) return null;

          return (
            <div key={blog._id} className="rounded-lg overflow-hidden">
              {blog.mainImage && (
                <Link href={`/blog/${blog.slug.current}`}>
                  <Image
                    src={blog.mainImage}
                    alt={blog.title ?? ""}
                    width={250}
                    height={250}
                    className="w-full max-h-40 object-cover"
                  />
                </Link>
              )}

              <div className="bg-surface p-5 text-text">
                <div className="flex justify-between text-xs">
                  <div className="text-primary font-semibold">
                    {blog.blogcategories?.[0]?.title}
                  </div>

                  <div className="flex items-center gap-1 text-text-muted">
                    <Calendar size={14} />
                    {blog.publishedAt
                      ? dayjs(blog.publishedAt).format("MMM D, YYYY")
                      : ""}
                  </div>
                </div>

                <Link
                  href={`/blog/${blog.slug.current}`}
                  className="block mt-3 font-semibold hover:text-primary"
                >
                  {blog.title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LatestBlog;
