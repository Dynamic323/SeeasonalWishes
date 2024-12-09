function HandelProperty(prop, value) {
  let valtoArry = value; // `value` is already an array, no need to split
  for (let i = 0; i < prop.length; i++) {
    const property = prop[i];

    // Handle properties normally for non-gradient values
    if (typeof valtoArry[i] === "string") {
      console.log(`${property} is =  ${valtoArry[i]}`);
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
    console.log("Gradient Background Set: " + gradient);
  }
}

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
  },
};

export function Getseason() {
  let currentMonth = new Date().getMonth() + 1;
  if (currentMonth > 3 && currentMonth <= 6) {
    return "Spring";
  } else if (currentMonth > 6 && currentMonth <= 9) {
    return "Summer";
  } else if (currentMonth >= 9 && currentMonth < 12) {
    return "Autumn";
  } else if (currentMonth === 12 || currentMonth <= 3) {
    HandelProperty(cssProperties.property, cssProperties.value.winter);
    return "Winter";
  } else {
    return "Invalid";
  }
}

// Call the function to apply the styles
Getseason();
