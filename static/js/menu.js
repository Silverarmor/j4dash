
/**
 * Fetches the menu data from the API.
 * @returns {Promise<Object>} The menu data.
 */
async function fetchMenu() {
    console.log("Fetching menu");
    const menu = await fetch("/api/menu").then(res => res.json());

    return menu;
}

/**
 * Refreshes the menu by fetching the latest data and updating the DOM.
 */
async function refreshMenu() {
    // Get menu data
    const data = await fetchMenu();

    console.log("Rendering Menu")

    // get the menucontent container.
    const menuElementContainer = document.getElementById("foodplan");

    // Remove events that already exist on the page if any exist,
    while (menuElementContainer.firstChild) {
        menuElementContainer.removeChild(menuElementContainer.lastChild);
    }

    // Create table element
    const tbl = document.createElement("table");
    tbl.classList.add("menutable");

    // Create header row
    const hr = tbl.insertRow();
    hr.classList.add("trcolhead");
    // Loop through cols
    for (let j=0; j<4; j++){
        th = document.createElement("th");
        if (j==0) {
            th.textContent = "Menu"
            th.style.width = "10%";
        }
        
        else {
            // Write the date
            th.textContent = data[j-1].date;
        }
        hr.appendChild(th);
    }

    // i=5 rows, j=4 columns
    for (let i = 1; i < 5; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < 4; j++) {
            
            const td = tr.insertCell();

            // If header (first) column
            if (j==0){
                td.classList.add("trowhead");
                td.style.width = "10%";
                // Write the row header
                switch (i) {
                    case 1:
                        td.textContent = "Chef";
                        break;
                    case 2:
                        td.textContent = "Meal";
                        break;
                    case 3:
                        td.textContent = "Notes";
                        break;
                    case 4:
                        td.textContent = "People";
                        break;
                    case 5:
                        td.textContent = "Shopping";
                        break;
                    
                    default:
                        break;
                }

            }
            
            // must be not header column or row (i=0,j=0, so data cell)
            else {
                switch (i) {
                    case 1:
                        td.textContent = data[j-1].chef.replace("_", " ");
                        td.style.fontSize = "20px";
                        td.style.fontWeight = "500";
                        break;
                    
                    case 2:
                        td.textContent = data[j-1].dinner;
                        break;

                    case 3:
                        td.textContent = data[j-1].notes;
                        break;

                    case 4:
                        td.textContent = data[j-1].people_info;
                        break;

                    case 5:
                        td.textContent = data[j-1].shopping;
                        break;
                
                    default:
                        break;
                }
            }
        }



        menuElementContainer.appendChild(tbl);
        
    }

    console.log("Menu fully rendered")

}


// On startup
refreshMenu();

// Refresh the menu every 15 minutes
setInterval(refreshMenu, 900000); // 15 minutes in milliseconds
