
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

    // get the menucontent container.
    const menuElementContainer = document.getElementById("foodplan");

    // Remove events that already exist on the page if any exist,
    while (menuElementContainer.firstChild) {
        menuElementContainer.removeChild(menuElementContainer.lastChild);
    }

    // Create div for person cooking
    const personCooking = document.createElement("div");
    personCooking.classList.add("personcooking");
    personCooking.textContent = data.chef;

    menuElementContainer.appendChild(personCooking);

    // Create div for dinner
    const dinner = document.createElement("div");
    dinner.classList.add("dinner");
    dinner.textContent = data.dinner;

    menuElementContainer.appendChild(dinner);

    // Create div for people info
    const peopleInfo = document.createElement("div");
    peopleInfo.classList.add("peopleinfo");
    peopleInfo.textContent = data.people_info;

    menuElementContainer.appendChild(peopleInfo);

    // Create div for delivery info
    const deliveryInfo = document.createElement("div");
    deliveryInfo.classList.add("deliveryinfo");
    deliveryInfo.textContent = data.shopping;

    menuElementContainer.appendChild(deliveryInfo)
}

// On startup
refreshMenu();

// Refresh the menu every 15 minutes
setInterval(refreshMenu, 900000); // 15 minutes in milliseconds
