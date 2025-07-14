import React from "react";
import { Star, StarOff } from "lucide-react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Aarav Mehta",
      title: "Software Engineer, Bengaluru",
      message:
        "Humne apne internal tools mein is AI solution ko integrate kiya, aur productivity mein clearly 2x boost mila. Natural language prompts ne sab kuch simplify kar diya.",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 5,
    },
    {
      name: "Sneha Kapoor",
      title: "Product Manager, Pune",
      message:
        "Mujhe is AI platform ka dashboard aur workflow automation features bahut helpful lage. Hamare saare team members bina training ke use kar paaye!",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4,
    },
    {
      name: "Rajat Sharma",
      title: "Marketing Head, Delhi",
      message:
        "AI-driven insights ne humein customers ke behavior ko better samajhne mein madad ki. Reporting system fast aur highly customizable hai.",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      rating: 5,
    },
  ];

  const renderStars = (count) => (
    <div className="flex justify-center mb-2">
      {Array.from({ length: 5 }, (_, i) =>
        i < count ? (
          <Star key={i} className="text-blue-400 fill-blue-400 w-4 h-4" />
        ) : (
          <StarOff key={i} className="text-gray-300 dark:text-gray-600 w-4 h-4" />
        )
      )}
    </div>
  );

  return (
    <div className="px-4 sm:px-8 lg:px-24 py-16 bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
      <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Loved by Engineers
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
        Hear what real Indian professionals have to say about our AI-powered platform.
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md max-w-sm w-full p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {renderStars(testimonial.rating)}

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-4">
              {testimonial.message}
            </p>

            <div className="flex items-center">
              <img
                src={testimonial.image}
                alt={`${testimonial.name} profile`}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3 text-left">
                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
