
// remove all the existing events if there are any (if you are reloading the calender, say every 5 mins by calling this code, you want to remove the previous events)
// for (const event of events) {
//     const hours = timestamp of event - timestamp of start of day (might break on DST!!)
//      const offset = height of one hour * hours
   
//    create the element and add offset 
   
//    }

// Create the table in the RHSBox flex div.

// writes a header cell for the table
function writeHeaderCell(tr, name){
    const td = tr.insertCell();
    td.appendChild(document.createTextNode(name));
    td.style.backgroundColor = "lightgrey";
    td.style.textAlign = "center";
    td.style.fontWeight = "bold";
    td.style.border = "1px solid black";
    td.style.padding = "8px";
}


// download json data from the API
async function fetchTimetable() {
    const events = await fetch("/api/cal").then(res => res.json()); // (res)sponse
    console.log(events);
  
    return events;
  }

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

    
    // Remove events that already exist on the page if any exist,
    // EXCLUDING the timecol, which acts as an offset
    for (const previousEventElement of eventElementContainer.children) {
        if (!previousEventElement.classList.contains("timecol")) {
            previousEventElement.remove();
        }
    }

    // figure out how tall each hour is
    const height = document.getElementsByClassName("hourcol").item(0).clientHeight;

    
    /* 
    //* Create table
    const tbl = document.createElement("table");
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');

    // create header row
    const tr = tbl.insertRow();
    writeHeaderCell(tr, "Time");
  
    // loop through users to create header row
    for (const user of users) {
        console.log(user.user); // prints name to console
        writeHeaderCell(tr, user.user);
    }

    eventElementContainer.appendChild(tbl);

    */


    // loop through users to create events/rows.
    for (const user of users) {
        // create contentcol (column) for the user
        const contentcolElement = document.createElement("div");
        contentcolElement.classList.add("contentcol");

        // append to eventElementContainer
        eventElementContainer.appendChild(contentcolElement);

        // Add user's names to top.
        // Get headers item
        const headersElement = document.getElementById("headers");
        const userLabel = document.createElement("div");
        userLabel.classList.add("namecol");
        userLabel.textContent = user.user;

        headersElement.appendChild(userLabel);

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
            const calStart = new Date(event.start).setHours(8,0,0,0);
            const eventOffset = (start - calStart)/1000/3600*height;

            // Set the offset/start of the event
            eventChip.style.top = `${eventOffset}px`;

            // Set the height of the event
            const duration = (end - start)/1000/3600;
            eventbg.style.height = `${duration*height}px`;

            //* Decide colour for the event.
            //TODO
            const colour = "rgb(73, 134, 231)"


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

  
  refreshTimetable();