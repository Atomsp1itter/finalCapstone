// WD T42

// Setting up our arrays that will be used to store data and save / retrieve to / from storage.

let basketArray = [];
let savedArray = [];

// The following array is the cost for a given number of chip rolls eg 1 roll is $4 and 16 rolls is $35.

let costArray = [4, 7, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 35];

// NB for the test site please do not add more than 16 rolls of any one colour to the basket.
// Have not set up error handling for this.

// Setting up local and session storage container variables if not already done:
// The basket is in session storage not local, because the user should either purchase or save before exiting

if (sessionStorage.getItem("sessionBasket")==null) {
    sessionStorage.setItem("sessionBasket", "");
}
if (localStorage.getItem("localSaved")==null) {
    localStorage.setItem("localSaved", "");
}

const basketTable = document.getElementById("basketTable");

// Need a global total variable for the checkout:

let basketTotal = 0;

function populateBasket() {

    // This is the onload function which looks at local / session storage and decides which to use to populate basket.
    // If there is data in local storage, we use that, otherwise if there is data in session storage we use that.

    if (localStorage.getItem("localSaved")==null || localStorage.getItem("localSaved")=="") {
        if (sessionStorage.getItem("sessionBasket")==null) {
            sessionStorage.setItem("sessionBasket", "");
        }
        else if (sessionStorage.getItem("sessionBasket")=="") {
            // Do nothing
        }
        else {
            basketArray = JSON.parse(sessionStorage.getItem("sessionBasket"));
            populateTable();
        }
    }
    else {
        basketArray = JSON.parse(localStorage.getItem("localSaved"));
        populateTable();
    }

}

function populateTable() {

    // We populate the html table based on basketArray[] which we populated from storage using populateBasket()

    let costCounter = 0;

    for (i=0; i<6; i++) {

        if (basketArray[i].itemValue > 0) {
            let newRow = basketTable.insertRow();

            let newCell = newRow.insertCell(0);
            let newText = document.createTextNode("You have ");
            newCell.appendChild(newText);

            newCell = newRow.insertCell(1);
            newText = document.createTextNode(basketArray[i].itemValue);
            newCell.appendChild(newText);

            newCell = newRow.insertCell(2);
            newText = document.createTextNode("rolls of ");
            newCell.appendChild(newText);

            newCell = newRow.insertCell(3);
            newText = document.createTextNode(basketArray[i].itemName);
            newCell.appendChild(newText);

            newCell = newRow.insertCell(4);
            newText = document.createTextNode(" chips in the basket. Price is $");
            newCell.appendChild(newText);

            newCell = newRow.insertCell(5);
            newText = document.createTextNode(costArray[(basketArray[i].itemValue)-1]);
            newCell.appendChild(newText);

            costCounter += (costArray[(basketArray[i].itemValue)-1]);
        }
    }
    
    // We then populate the final row of the table with the total cost:

    let newRow = basketTable.insertRow();

    // Inserting 4 blank cells in the table to keep everything nicely in line:

    let newCell = newRow.insertCell(0);
    let newText = document.createTextNode("");
    newCell.appendChild(newText);

    for (i=1; i<4; i++) {
        newCell = newRow.insertCell(i);
        newText = document.createTextNode("");
        newCell.appendChild(newText);
    }

    // Then we display the total cost:

    newCell = newRow.insertCell(4);
    newText = document.createTextNode("Total cost is $");
    newCell.appendChild(newText);

    newCell = newRow.insertCell(5);
    newText = document.createTextNode(costCounter);
    newCell.appendChild(newText);

    basketTotal = costCounter;
}

// This is the function for the Clear basket button:

function clearBasket() {

    // Clearing the array, and session and local storage:

    basketArray = [];
    sessionStorage.setItem("sessionBasket", "");
    localStorage.setItem("localSaved", "");

    // Deleting all rows in the html table:

    let bTable = document.getElementById("basketTable");
    while (bTable.rows.length > 0) {
        bTable.rows[0].remove();
    }
}

// This is the function for the Buy now button:

function purchase() {
    if (basketArray == [] || basketArray =="") {
        alert("There are no chips in the basket.");
    }
    else {
        alert("You have purchased the chips for $" + basketTotal);
        clearBasket();
    }   
}

// This is the function for the Save for later button:

function saveForLater() {
    if (basketArray == [] || basketArray =="") {
        alert("There are no chips in the basket.");
    }
    else {
        savedArray = basketArray;
        localStorage.setItem("localSaved", JSON.stringify(savedArray));
        sessionStorage.setItem("sessionBasket", "");
        alert("Your basket has been saved." +
        " If you close the browser and return to your basket you will still be able to purchase.")
    }
}