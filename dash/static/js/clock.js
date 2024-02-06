// made by Copilot. Inspired by:
// https://stackoverflow.com/questions/28415178/how-do-you-show-the-current-time-on-a-web-page

// Get the clock element
const clockElement = document.getElementById("clock");
// console.log(clockElement);

// Function to update the clock
function updateClock() {
  // Get the current time
  const currentTime = new Date();

  // Format the time as HH:MM:SS
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Update the clock element with the current time
  clockElement.textContent = timeString;
}

// Update the clock immediately
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);
