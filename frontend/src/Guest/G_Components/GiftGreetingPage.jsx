import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

// Mock data for templates
const templates = [
  {
    id: 1,
    title: "Birthday Bash",
    category: "Birthday",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    title: "New Year Fireworks",
    category: "New Year",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    title: "Christmas Joy",
    category: "Christmas",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    title: "Birthday Balloons",
    category: "Birthday",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    title: "New Year Countdown",
    category: "New Year",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    title: "Santa's Greetings",
    category: "Christmas",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const categories = ["All", "Birthday", "New Year", "Christmas"];

const TemplateCard = ({ template, onSelect }) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
    <CardContent className="p-0">
      <img
        src={template.image}
        alt={template.title}
        className="w-full h-40 object-cover"
      />
    </CardContent>
    <CardFooter className="flex justify-between items-center p-4">
      <h3 className="font-semibold">{template.title}</h3>
      <Button onClick={() => onSelect(template)}>Select</Button>
    </CardFooter>
  </Card>
);

const TemplateDetailModal = ({ template, isOpen, onClose, onUse }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{template?.title}</DialogTitle>
        <DialogDescription>Preview your selected template</DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <img
          src={template?.image}
          alt={template?.title}
          className="w-full h-60 object-cover rounded-md"
        />
        <p className="mt-4">
          This is a preview of the {template?.title} template. It includes
          animations and festive music to create the perfect greeting.
        </p>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Back
        </Button>
        <Button onClick={() => onUse(template)}>Use This Template</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default function ExploreTemplates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const filteredTemplates = templates.filter(
    (template) =>
      (selectedCategory === "All" || template.category === selectedCategory) &&
      template.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  const handleUseTemplate = (template) => {
    console.log("Using template:", template.title);
    // Implement navigation to customization interface here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
        Explore Festive Templates
      </h1>

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300 hover:scale-105"
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchTerm("")}
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleSelectTemplate}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No templates found. Try a different search or category.
        </p>
      )}

      <TemplateDetailModal
        template={selectedTemplate}
        isOpen={!!selectedTemplate}
        onClose={handleCloseModal}
        onUse={handleUseTemplate}
      />
    </div>
  );
}
