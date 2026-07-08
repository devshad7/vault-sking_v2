import React from "react";
import { StarIcon } from "lucide-react";

export default function ProductReviews() {
  // Dummy data for reviews as requested
  const dummyReviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "October 12, 2025",
      title: "Absolutely love this!",
      content: "This product has completely transformed my skincare routine. It's gentle, effective, and feels incredibly luxurious. Highly recommend!",
    },
    {
      id: 2,
      author: "Jessica T.",
      rating: 4,
      date: "September 28, 2025",
      title: "Great results, but took a while",
      content: "I started seeing a noticeable difference after about 3 weeks of consistent use. The texture is nice, though the scent is a bit strong for my liking.",
    },
    {
      id: 3,
      author: "Emily R.",
      rating: 5,
      date: "September 15, 2025",
      title: "My new holy grail",
      content: "I've tried so many similar products but this one takes the cake. It absorbs beautifully and doesn't leave a sticky residue.",
    },
  ];

  return (
    <div className="py-6">
      {/* Summary Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12 p-8 bg-gray-50 rounded-2xl">
        <div className="text-center md:text-left">
          <p className="text-5xl font-bold text-gray-900 mb-2">4.7</p>
          <div className="flex items-center gap-1 text-yellow-500 mb-2 justify-center md:justify-start">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : 'fill-current text-gray-300'}`} />
            ))}
          </div>
          <p className="text-sm text-gray-500">Based on 12 reviews</p>
        </div>
        
        <div className="flex-1 w-full space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3 text-sm">
              <span className="w-4">{rating}</span>
              <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full" 
                  style={{ width: rating === 5 ? '75%' : rating === 4 ? '20%' : '5%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-8">
        {dummyReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-900">{review.author}</h4>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300 fill-current'}`} />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <h5 className="font-semibold text-gray-800 mb-2">{review.title}</h5>
            <p className="text-gray-600 leading-relaxed">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
