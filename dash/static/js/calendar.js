
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


async function refreshTimetable() {
    const eventElementContainer = document.getElementById("RHSCalBox");

    // Remove events that already exist on the page if any exist
    for (const previousEventElement of eventElementContainer.children) {
        previousEventElement.remove(); // i think this works? forgot
    }


    const users = await fetchTimetable();
  
    //* Create table
    const tbl = document.createElement("table");
    tbl.style.width = '100%';
    tbl.setAttribute('border', '2');

    // create header row
    const tr = tbl.insertRow();
    writeHeaderCell(tr, "Time");
  
    // loop through users to create header row
    for (const user of users) {
        console.log(user.user); // prints name to console
        writeHeaderCell(tr, user.user);
    }

    // loop through users to create events/rows.
    for (const user of users) {
        // loop through the events each user has.
        for (const event of user.events) {
            console.log(event.name, event.start, event.end, event.duration, event.description, event.location);
        
    }
        eventElementContainer.appendChild(tbl);
  
    
















        
        // // create an element for the event
        // const eventElement = document.createElement("div");
        // const eventTitle = document.createElement("p"); // idk
    
        // // so you can style it using css
        // eventElement.classList.add("eventElement"); // might be className idk
        // eventTitle.classList.add("eventTitle");
    
        // const start = new Date(event.start);
        // const end = new Date(event.end);
    
        // const eventOffset = 10 * ((end - start) / 1000 / 60 / 60); // assuming one hour is 10em
    
        // eventTitle.textContent = event.title;
        // event.style.top = `${eventOffset}em`; // assuming one hour is 10em
        // // note more css is required probably (e.g. position: absolute https://developer.mozilla.org/en-US/docs/Web/CSS/position), but you should just add it inside `<style>` instead of using js to add it
    
        // eventElement.appendChild(eventTitle);
        // eventElementContainer.appendChild(eventElement);
      }
    }

  
  refreshTimetable();