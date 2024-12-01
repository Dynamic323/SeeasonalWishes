import React from "react";
import FeatureDiv from "../G_Components/FeatureDiv";
import FeatureWorkBlock from "../G_Components/FeatureWorkBlock";
import ExploreTemplates from "./ExploreTemplates";

function Feature() {
  // FESTIVEWISHES FEATURES
  const FestiveWish = [
    {
      text: "Craft Personalized messages with our easy-to-use editor. Add your own touch to make each greeting special!",
      subtext: "Schedule Your Message",
      icon: "fas fa-calendar",
    },
    {
      text: "Set the perfect time for your greetings to be received. Never miss an important date again!",
      subtext: "Create a Greeting",
      icon: "fas fa-gift",
    },
    {
      text: "Choose from a variety of Beautiful pre-designed templates to save time and inspire creativity.",
      subtext: "Quick Templates",
      icon: "fas fa-thunderstorm",
    },
    {
      text: "Express Your Feelings with our curated collection of heartwarming messages and quotes",
      subtext: "Heartfelt Wishes",
      icon: "fas fa-heart",
    },
    {
      text: "Celebrate every occasion with our wide range of festive themes and designs for all holidays and events",
      subtext: "Festive Themes",
      icon: "fas fa-star-and-crescent",
    },
    {
      text: "Send your greetings via email, SMS, or social media platforms. Reach out to your loved ones wherever they are.",
      subtext: "Multi-Platform Delivery",
      icon: "fas fa-paper-plane",
    },
  ];

  const stepWorkBlock = [
    {
      text: "Browse our extensive collection of templates for every occasion.",
      subtext: "Choose a Template",
      icon: "fas fa-folder-open", // Replace "1" with a suitable icon class
      num: "1",
    },
    {
      text: "Add your Own message, photos, and customize colors to make it unique",
      subtext: "Personalize",
      icon: "fas fa-edit", // Replace "2" with a suitable icon class
      num: "2",
    },
    {
      text: "Set the date and time for your greeting to be sent automatically",
      subtext: "Schedule",
      icon: "fas fa-clock", // Replace "3" with a suitable icon class
      num: "3",
    },
    {
      text: "Your personalized greeting will be delivered right on time, bringing joy to your loved ones.",
      subtext: "Send & Delight",
      icon: "fas fa-smile", // Replace "4" with a suitable icon class
      num: "4",
    },
  ];

  //FEATURE EVENTS
  const event = [
    {
      text: "Birthday",
    },
    {
      text: "Holiday",
    },
    {
      text: "Congratulations",
    },
    {
      text: "Happy New Year",
    },
  ];
  //FEEDBACK
  const feedback = [
    {
      text: '"FestiveWishes made it so easy to send thoughtful birthday messages to all my friends and family. The scheduling is a game-changer!"',
      subtext: "Sarah L.",
      color: "#dc2626",
    },
  ];

  //FREQUENTLY ASKED QUESTIONS

  const question = [
    {
      text: "How far in advance can I schedule a greeting?",
      icon: "fas fa-chevron-down",
    },
    {
      text: "Can I use my own images in the greetings?",
      icon: "fas fa-image", // Default icon for image-related questions
    },
    {
      text: "Is there a limit to how many greetings can I send?",
      icon: "fas fa-envelope", // Default icon for message-related questions
    },
    {
      text: "Can I edit a greeting after I've scheduled it?",
      icon: "fas fa-edit", // Icon for editing
    },
    {
      text: "What happens if the recipient doesn't have email?",
      icon: "fas fa-question-circle", // Default question icon
    },
  ];

  return (
    <div>
      {/* FeatureWelcome banner */}

      <div className="h-fit pt-12  bg-gradient-autumn text-skin-text grid justify-center items-center sm:py-20 lg:py-20">
        <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-skin-text sm:text-left text-4xl sm:text-5xl lg:text-6xl font-bold">
            Discover Seasonal Whishes
          </h2>
          <p className="text-center sm:text-left text-lg sm:text-xl lg:text-2xl mt-4">
            Create, schedule, and send heartfelt greetings that surprise and
            delight your loved ones.
          </p>
        </div>
      </div>

      <div className=" py-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold  text-skin-text ">
          Our Features
        </h2>
      </div>

      <div className=" sm:justify-center sm:place-items-center  gap-6">
        <div className=" grid md:grid-cols-3 gap-8 justify-center place-items-center sm:place-items-center lg:place-items-center p-6">
          {FestiveWish.map((item) => (
            <FeatureDiv
              text={item.text}
              subtext={item.subtext}
              icon={item.icon}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center py-10 text-skin-text ">
        <p className="text-4xl sm:text-4xl lg:text-5xl  font-semibold">
          How It Works
        </p>
      </div>
      <div className=" sm:justify-center sm:place-items-center  gap-6">
        <div className=" grid md:grid-cols-2 gap-8 justify-center place-items-center sm:place-items-center lg:place-items-center p-6">
          {stepWorkBlock.map((item) => (
            <FeatureWorkBlock
              text={item.text}
              subtext={item.subtext}
              icon={item.icon}
              num={item.num}
            />
          ))}
        </div>
      </div>

      <ExploreTemplates />
    </div>
  );
}

export default Feature;
