import React from "react";

export default function ProductDescription({ data }: { data: string }) {
  if (!data) return <p className="text-gray-500">No description available.</p>;

  return (
    <div className="prose prose-lg max-w-none text-gray-700">
      <p className="my-5 text-base/8 first:mt-0 last:mb-0">{data}</p>
    </div>
  );
}
