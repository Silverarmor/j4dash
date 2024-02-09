
// remove all the existing events if there are any (if you are reloading the calender, say every 5 mins by calling this code, you want to remove the previous events)
// for (const event of events) {
//     const hours = timestamp of event - timestamp of start of day (might break on DST!!)
//      const offset = height of one hour * hours

//    create the element and add offset

//    }

// Create the table in the RHSBox flex div.






// refresh the timetable
async function refreshTimetable() {
    // get the calcontent container.
    const eventElementContainer = document.getElementById("calcontent");

    // Add a loading indicator to the event element container
    const loadingIndicator = document.createElement("div");
    loadingIndicator.textContent = "Loading...";
    eventElementContainer.appendChild(loadingIndicator);


    // get the users from the API
    const users = await fetchTimetable();

    // Remove headers
    const headersElement = document.getElementById("headers");
    while (headersElement.firstChild) {
        headersElement.removeChild(headersElement.lastChild);
    }

    // Remove events that already exist on the page if any exist,
    while (eventElementContainer.firstChild) {
        eventElementContainer.removeChild(eventElementContainer.lastChild);
    }

    // create timecol div
    const timecolElement = document.createElement("div");
    timecolElement.classList.add("timecol");
    eventElementContainer.appendChild(timecolElement);


    // figure out how tall each hour is
    const height = getHeight();

    // loop through users to create events/rows.
    for (const user of users) {
        // create contentcol (column) for the user
        const contentcolElement = document.createElement("div");
        contentcolElement.classList.add("contentcol");

        // Everyone hardcoded to narrower col CONTENT COLUMN
        if (user.user == "Everyone") {
            contentcolElement.style.flex = "0.6";
        }

        // append to eventElementContainer
        eventElementContainer.appendChild(contentcolElement);

        // Add user's names to top.
        const userLabel = document.createElement("div");
        userLabel.classList.add("namecol");
        userLabel.textContent = user.user.replace("_", " ");

        // Everyone hardcoded to narrower col, USER LABEL
        if (user.user == "Everyone") {
            userLabel.style.flex = "0.6";
        }

        headersElement.appendChild(userLabel);

        // Create header2 chips, for all day events
        const header2Chip = document.createElement("div");
        header2Chip.classList.add("head2content");
        header2Chip.id = user.user;
        contentcolElement.appendChild(header2Chip);


        // loop through the events each user has.
        for (const event of user.events) {
            console.log(event.name, event.start, event.end, event.duration, event.description, event.location);

            // create an element (chip) for the event
            const eventChip = document.createElement("div");
            const eventbg = document.createElement("div");
            const eventContent = document.createElement("div");
            eventChip.classList.add("chip");
            eventbg.classList.add("bgchip");
            eventContent.classList.add("chipcontent");

            // Figure out what time the event starts and ends
            const start = new Date(event.start);
            const end = new Date(event.end);


            //! HARD CODED 8AM START
            // time-calStart reports the time in milliseconds since the start of the day.
            // convert to hours /1000/3600 then multiply by height.
            // Add 1 height for DAY offset.
            const calStart = new Date(event.start).setHours(8,0,0,0);
            const eventOffset = (start - calStart)/1000/3600*height + height;

            // Set the offset/start of the event
            eventChip.style.top = `${eventOffset}px`;

            // Set the height of the event
            const duration = (end - start)/1000/3600;

            // if duration less than 0.5, set to 0.5 hours.
            if (duration < 0.5) {
                duration = 0.5;
            }

            eventbg.style.height = `${duration*height}px`;

            // If the event is an all day event, add it to the header2 chip
            if (event.duration.includes("day")) {
                // console.log(event.duration);
                // Add a comma if there is already an event in the header2 chip
                if (header2Chip.textContent.length != 0) {
                    header2Chip.textContent += ", ";
                }
                // Add the event to the header2 chip
                header2Chip.textContent += event.name;

                //! SKIP TO NEXT EVENT
                continue;
            }

            //* Decide colour for the event.
            switch (user.user) {
                case "Jayden":
                    var colour_palette = JK_colours;
                    break;
                case "Jacob":
                    var colour_palette = JP_colours;
                    break;
                case "Joshua_AC":
                    var colour_palette = JAC_colours;
                    break;
                case "Joshua_T":
                    var colour_palette = JT_colours;
                    break;
                default:
                    var colour_palette = {"default": "rgb(73, 134, 231)"};
            }

            var colour = "blank";

            // console.log(colour_palette);
            for (const [key, value] of Object.entries(colour_palette)) {
                if (event.name.includes(key)) {
                    var colour = value;
                    break;
                }
            }

            if (colour == "blank") {
                colour = colour_palette["default"];
            }

            // console.log(colour);
            // console.log(colour_palette)

            // Set the background color of event
            eventbg.style.backgroundColor = colour;
            // and set border on Left
            eventChip.style.borderLeft = `3px solid ${colour}`;
            // eventChip.style.borderBottom = `1px solid black`;
            // eventChip.style.boxSizing = "border-box";

            // and set 'borders'
            // eventChip.style.outline = "1px solid black";

            // Append background to chip
            eventChip.appendChild(eventbg);

            // Set the content of the event
            eventContent.textContent = event.name;
            eventChip.appendChild(eventContent);

            // append to contentcolElement
            contentcolElement.appendChild(eventChip);
        }
    }
}


// Draw a line across the whole screen representing the current time
function drawTimeMarker(){
    // get the calendar body container.
    const calBodyContainer = document.getElementById("calbody");

    // Remove the existing time marker
    for (const childElement of calBodyContainer.children) {
        if (childElement.id == "timeMarker") {
        childElement.remove();
        }
    }

    // Create a new time marker
    const timeMarker = document.createElement("div");
    timeMarker.id = "timeMarker";

    // Get the current time
    const currentTime = new Date();

    height = getHeight();

    // If past 8pm, don't show the time marker
    if (currentTime.getHours() >= 20){
        return;
    }

    // Calculate the offset of the time marker
    //! HARD CODED 8AM START
    // currentTime-calStart reports the time in milliseconds since the start of the day.
    // convert to hours /1000/3600 then multiply by height.
    // add height for DAY offset
    const calStart = new Date().setHours(8,0,0,0);
    const eventOffset = (currentTime - calStart)/1000/3600*height + height;

    // Set the offset of the time marker
    timeMarker.style.top = `${eventOffset}px`;

    // If offset is less than height, don't show.
    if (eventOffset < height) {
        return;
    }

    // Add a span inside the div
    const timeMarkerEndCap = document.createElement("div");
    // timeMarkerEndCap.textContent = "Now";
    timeMarkerEndCap.classList.add("endCap");
    timeMarker.appendChild(timeMarkerEndCap);

    // Append the time marker to the timecol container
    calBodyContainer.appendChild(timeMarker);
}


// Return the height of an hour
function getHeight() {
    return document.getElementsByClassName("hourcol").item(0).clientHeight;
}

// download json data from the API
async function fetchTimetable() {
    console.log("Fetching events")
    const events = await fetch("/api/cal").then(res => res.json()); // (res)sponse
    // console.log(events);

    return events;
  }


// On startup
refreshTimetable();
drawTimeMarker();

// Refresh timetable every 10 minutes
setInterval(refreshTimetable, 600000);

// Refresh marker every 2 minutes
setInterval(drawTimeMarker, 120000);


