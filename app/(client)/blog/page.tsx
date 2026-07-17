import Container from "@/components/Container";
import Title from "@/components/layout/Products/Title";
import { getAllBlogs } from "@/lib/frontend-data";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Vault Skin",
  description:
    "Skincare tips, product guides, and beauty insights from Vault Skin — your trusted skincare destination in Nepal.",
};

const BlogPage = () => {
  const blogs = getAllBlogs();

  return (
    <div>
      <Container>
        <Title className="py-4">Latest Blogs</Title>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2 py:md-5 justify-items-center">
          {blogs?.map((blog) => (
            <div
              key={blog?._id}
              className="group w-full max-w-xs rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {blog?.mainImage && (
                <div className="overflow-hidden">
                  <Image
                    src={blog?.mainImage}
                    alt="blogImage"
                    width={500}
                    height={500}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="bg-gray-50 p-2.5">
                <div className="text-[11px] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 relative group cursor-pointer">
                    {blog?.blogcategories?.map((item, index) => (
                      <p
                        key={index}
                        className="font-semibold text-shop_dark_green tracking-wide text-[11px]"
                      >
                        {item?.title}
                      </p>
                    ))}
                    <span className="absolute left-0 -bottom-1 bg-lightColor/30 w-full h-[2px] group-hover:bg-shop_dark_green transition-all" />
                  </div>

                  <p className="flex items-center gap-1 text-lightColor text-[11px] hover:text-shop_dark_green transition-colors cursor-pointer">
                    <Calendar size={13} />
                    {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                  </p>
                </div>

                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="block text-sm font-semibold mt-2 line-clamp-2 hover:text-shop_dark_green transition-colors"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
