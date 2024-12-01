import React, { useEffect } from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "FestiveWishes made it so easy to send thoughtful birthday messages to all my friends and family. The scheduling is a game-changer!",
      author: "Happy User",
    },
    {
      id: 2,
      rating: 5,
      text: "FestiveWishes made it so easy to send thoughtful birthday messages to all my friends and family. The scheduling is a game-changer!",
      author: "Happy User",
    },
    {
      id: 3,
      rating: 5,
      text: "FestiveWishes made it so easy to send thoughtful birthday messages to all my friends and family. The scheduling is a game-changer!",
      author: "Happy User",
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, index) => (
          <i key={index} className="fas fa-star text-skin-accent text-xl"></i>
        ))}
      </div>
    );
  };

  const TestimonialCard = ({ testimonial }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
        <StarRating rating={testimonial.rating} />
        <p className="text-skin-text text-lg mb-4 leading-relaxed">
          "{testimonial.text}"
        </p>
        <p className="text-skin-primary font-semibold">{testimonial.author}</p>
      </div>
    );
  };

  return (
    <section className="py-16 px-4 bg-skin-background">
      <div className="container mx-auto cursor-pointer">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-skin-primary mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
