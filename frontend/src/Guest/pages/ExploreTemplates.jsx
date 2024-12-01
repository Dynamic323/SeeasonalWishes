import React, { useState } from "react";

const templates = [
  {
    id: 1,
    title: "Birthday Bash",
    category: "Birthday",
    image: "https://via.placeholder.com/200x200",
  },
  {
    id: 2,
    title: "New Year Fireworks",
    category: "New Year",
    image: "https://via.placeholder.com/200x200",
  },
  {
    id: 3,
    title: "Christmas Joy",
    category: "Christmas",
    image: "https://via.placeholder.com/200x200",
  },
  {
    id: 4,
    title: "Birthday Balloons",
    category: "Birthday",
    image: "https://via.placeholder.com/200x200",
  },
  {
    id: 5,
    title: "New Year Countdown",
    category: "New Year",
    image: "https://via.placeholder.com/200x200",
  },
  {
    id: 6,
    title: "Santa's Greetings",
    category: "Christmas",
    image: "https://via.placeholder.com/200x200",
  },
];

const categories = ["All", "Birthday", "New Year", "Christmas"];

const TemplateCard = ({ template, onSelect }) => (
  <div className="overflow-hidden transition-all h-[300px] duration-300 bg-skin-background hover:shadow-lg hover:scale-105 rounded-lg">
    <img
      src={template.image}
      alt={template.title}
      className="w-full h-52 object-cover"
    />
    <div className="p-4 flex justify-between items-center">
      <h3 className="font-semibold text-skin-text">{template.title}</h3>
      <button
        onClick={() => onSelect(template)}
        className="px-4 py-2 bg-skin-button text-skin-light-text rounded-md transition hover:bg-opacity-90"
      >
        Select
      </button>
    </div>
  </div>
);

export default function ExploreTemplates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = templates.filter(
    (template) =>
      (selectedCategory === "All" || template.category === selectedCategory) &&
      template.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 bg-gradient-autumn text-skin-text p-8">
      <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-skin-text text-center mb-6">
        Explore Festive Templates
      </h1>

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md transition-all ${
                selectedCategory === category
                  ? "bg-skin-button text-skin-light-text"
                  : "bg-skin-background text-skin-dark-text hover:bg-opacity-80"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md bg-skin-background text-skin-text focus:ring-2 focus:ring-skin-accent"
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-skin-dark-text"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => console.log(`Selected ${template.title}`)}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <p className="text-center text-skin-dark-text mt-8">
          No templates found. Try a different search or category.
        </p>
      )}
    </div>
  );
}
