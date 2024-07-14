// The lists are scanned top to bottom, and breaks instantly when a match is found.
// Therefore, "ABC101 TUT" should be above "ABC101" in the list, as the former is a substring of the latter.

let JK_colours = {
    // "STRCTENG 200 TUT": "",
    // "CIVIL 202 WRK": "",
    // "STRCTENG 200 LAB": "",
    // "CIVIL 203 LAB": "",

    // "CIVIL 202": "rgb(255, 110, 50)", //ff6e32 orange
    // // "CIVIL 203": "rgb(252, 213, 129)", //ffd581 light yellow
    // "CIVIL 203": "rgb(151, 212, 80)", //c2fa78 light green
    // "STRCTENG 200": "rgb(243, 182, 31)", //yellow
    // "ENGSCI 211": "rgb(100, 100, 120)", // bluey grey

    "CIVIL 200": "rgb(255, 110, 50)", //ff6e32 orange
    "ENVENG 200": "rgb(151, 212, 80)", //c2fa78 light green
    "STRCTENG 201": "rgb(243, 182, 31)", //yellow
    "ENGGEN 204": "rgb(100, 100, 120)", // bluey grey


    "default": "rgb(248, 58, 34)", // dark red
}

let JP_colours = {
    // https://coolors.co/b8e28d-a97591-2e933c-f78e69-204e4a

    "POM: Lecture": "#B8E28D", // Light green
    "PCS1: Lecture": "#35827C", //lighter grey aka teal

    "MSS: Lecture": "#A97591", // pinky
    "DS: Lecture": "#A97591", // pinky
    "CVS: Lecture": "#A97591", // pinky

    "POM Tbl": "#2E933C", // forest/mid green
    "PCS SGA": "#204E4A", // dark slate grey

    "MSS Tbl": "#8A5671", // magenta haze
    "DS Tbl": "#8A5671", // magenta haze
    "CVS Tbl": "#8A5671", // magenta haze

    "default": "#93c47d"
}

let JAC_colours = {
    // https://coolors.co/065143-3badba-41b49b-674ea7

    "POM: Lecture": "#4BAA74",  // jade

    "PCS1: Lecture": "#83CFD8", // light blue
    "MSS: Lecture": "#87D4C3", // light blue/green
    "DS: Lecture": "#87D4C3", // light blue/green
    "CVS: Lecture": "#87D4C3", // light blue/green

    "POM Tbl": "#065143", // green
    "PCS SGA": "#3BADBA",  //bluey moonstone
    
    "MSS Tbl": "#41B49B",  // idk
    "DS Tbl": "#41B49B",  // idk
    "CVS Tbl": "#41B49B",  // idk

    "default": "#674ea7",
}

let JT_colours = {
    // https://coolors.co/e23c4a-00e0ac-7494ea-cfa5a0-044b7f
    "COMPSCI 110 TUT": "#C31D2B", // Darker red
    "COMPSCI 230 LAB": "#2A5ADF", // Darker blue
    "COMPSCI 110": "#E23C4A", //red
    "COMPSCI 230": "#7494EA", //blue
    "LAW 201": "#CFA5A0", //LAW 201A matches this Rosy brown
    "LAW 211": "#00E0AC", //LAW 211A matches this. Aquamarine
    "LAW 298": "#044B74", //LAW 298A matches this. Indigo

    "default": "#6d9eeb",
}