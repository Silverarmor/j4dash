// made by Copilot. Inspired by:
// https://stackoverflow.com/questions/28415178/how-do-you-show-the-current-time-on-a-web-page


// Function to update the clock
function updateClock() {
  // Get the clock element
  const clockElement = document.getElementById("clock");

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

// Function to update date
async function updateDate() {
  // Get the date element
  const dateElement = document.getElementById("date");

  const dateObj = await fetch("/api/date").then(res => res.json());

  // Update the date element with the current date
  dateElement.textContent = dateObj.date;
}

// Function to update quote
async function updateQuote() {
  // Get the quote element
  const quoteElement = document.getElementById("quote");

  const quoteObj = await fetch("/api/quote").then(res => res.json());

  // Update the quote element with the current quote
  quoteElement.textContent = quoteObj.quote;

  // Get the author element
  const authorElement = document.getElementById("quoteauthor");

  // Update the author element with the current author
  authorElement.textContent = quoteObj.author;
}



// Refresh immediately
updateClock();
updateProgressBar();
updateDate();
updateQuote();


// Update the clock every second
setInterval(updateClock, 1000);

// Update date every minute
setInterval(updateDate, 60000);

// Update progress bar every hour
setInterval(updateProgressBar, 3600000);

// Update quote every hour
setInterval(updateQuote, 3600000);