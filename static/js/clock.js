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

// Function to update the progress bar
function updateProgressBar() {
  // Get the current time and year in milliseconds
  const currentTime = new Date();
  const thisYear = currentTime.getFullYear();

  const ms = currentTime.getTime() - new Date(thisYear, 0, 1).getTime();



  // Calculate percent of days gone
  const percentage = (ms / (1000 * 60 * 60 * 24* 365)) * 100;
  // console.log(percentage);

  // Update the progress bar with the percentage
  document.getElementById("progress-box").style.width = `${percentage}%`;

  // Write percentage rounded to 1dp
  document.getElementById("progress-box").textContent = `${percentage.toFixed(1)}%`;

}

// Refresh immediately
updateClock();
updateProgressBar();


// Update the clock every second
setInterval(updateClock, 1000);

// Update progress bar every hour
setInterval(updateProgressBar, 3600000);