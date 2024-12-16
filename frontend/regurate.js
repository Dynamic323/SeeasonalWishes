// Function to handle updating CSS properties dynamically
function HandelProperty(prop, value) {
  let valtoArry = value;
  for (let i = 0; i < prop.length; i++) {
    const property = prop[i];

    // Handle properties normally for non-gradient values
    if (typeof valtoArry[i] === "string") {
      // console.log(`${property} is =  ${valtoArry[i]}`);
      document.documentElement.style.setProperty(property, valtoArry[i]);
    }
  }

  // Handle gradient background separately
  if (valtoArry[6] && typeof valtoArry[6] === "object") {
    const gradient = valtoArry[6].bg; // Access the `bg` property
    document.documentElement.style.setProperty(
      "--gradient-background",
      `linear-gradient(${gradient})`
    );
    // console.log("Gradient Background Set: " + gradient);
  }
}

// Seasonal Color Scheme Properties
const cssProperties = {
  property: [
    "--primary-color",
    "--secondary-color",
    "--background-color",
    "--accent-color", 
    "--text-color",
    "--button-color",
    "--gradient-background",
  ],
  value: {
    winter: [
      "#60a5fa",
      "#4c51bf",
      "#e0f2fe",
      "#3b82f6",
      "#1e3a8a",
      "#2563eb",
      { bg: "to right,   #60a5faa9, #4c52bfde" },
    ],
    spring: [
      "#34d399",
      "#10b981ad",
      "#d1fae5",
      "#6ee7b7",
      "#065f46",
      "#059669",
      { bg: "to right, #34d399, #10b981a2" },
    ],
    summer: [
      "#fcd34d",
      "#fb923c",
      "#fef7e1",
      "#f59e0b",
      "#6b2a1a",
      "#ea580c",
      { bg: "to right, #fcd34d, #fb923c" },
    ],
    autumn: [
      "#f87171",
      "#fbbf24",
      "#fbcfe8",
      "#f59e0b",
      "#1f2937",
      "#dc2626",
      { bg: "to right, #f87171, #fbbf24" },
    ],
  },
};

// Function to determine the current season and apply corresponding styles
export function Getseason() {
  let currentMonth = new Date().getMonth() + 1; // Get current month (1-12)

  // Logic to determine the season based on the current month
  if (currentMonth > 3 && currentMonth <= 6) {
    HandelProperty(cssProperties.property, cssProperties.value.spring); // Apply Spring styles
    return "Spring";
  } else if (currentMonth > 6 && currentMonth <= 9) {
    HandelProperty(cssProperties.property, cssProperties.value.summer); // Apply Summer styles
    return "Summer";
  } else if (currentMonth >= 9 && currentMonth < 12) {
    HandelProperty(cssProperties.property, cssProperties.value.autumn); // Apply Autumn styles
    return "Autumn";
  } else {
    HandelProperty(cssProperties.property, cssProperties.value.winter); // Apply Winter styles
    return "Winter";
  }
}

Getseason();
