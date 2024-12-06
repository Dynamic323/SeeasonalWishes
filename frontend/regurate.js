export function Getseason() {
  let currentMonth = new Date().getMonth() + 1;
  if (currentMonth > 3 && currentMonth <= 6) {
    return "Spring";
  } else if (currentMonth > 6 && currentMonth <= 9) {
    return "Summer";
  } else if (currentMonth >= 9 && currentMonth < 12) {
    return "Autumn  ";
  } else if (currentMonth == 12 || currentMonth <= 3) {
    return "Winter  ";
  } else {
    return "invalid";
  }
}

Getseason();

// document.documentElement.style.cssText
// document.documentElement.style.cssText
// document.documentElement.style.cssText

getComputedStyle(document.documentElement).getPropertyValue('--bg')
document.documentElement.style.setProperty('--bg', 0)
