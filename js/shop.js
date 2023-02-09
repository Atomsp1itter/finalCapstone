// WD T42

// Setting up our array that will be used to store data and save / retrieve to / from storage.

let basketArray = [];

// Setting up the initial basket objects

class basketItem {
    constructor(itemName = "", itemValue = 0) {
        this.itemName = itemName;
        this.itemValue = itemValue;
    }
}
basketArray[0] = new basketItem ("green", 0);
basketArray[1] = new basketItem ("red", 0);
basketArray[2] = new basketItem ("yellow", 0);
basketArray[3] = new basketItem ("white", 0);
basketArray[4] = new basketItem ("blue", 0);
basketArray[5] = new basketItem ("orange", 0);

// Setting up local and session storage container variables if not already done:
// The basket is only in session storage because the user should either purchase or save before exiting
// If sessionStorage already contains basket data we bring it back into our array

if (sessionStorage.getItem("sessionBasket")==null) {
    sessionStorage.setItem("sessionBasket", "");
}
else if (sessionStorage.getItem("sessionBasket")=="") {
    // Do nothing
}
else {
    basketArray = JSON.parse(sessionStorage.getItem("sessionBasket"));
}

function addToBasket(e) {

    // Strange looking for loop with +=5 is because there are so many text elements in between the radio buttons
    // Also childNodes[5] happens to be the form because there are other elements in front like <p> and #text.

    let noOfButtonsChecked = 0;
    let shopForm = e.target.parentElement.parentElement.childNodes[5];
    for (i=1; i<17; i+=5) {

    if ((shopForm.childNodes[i].checked)==true) {
        alert("You have added " +
        shopForm.childNodes[i].value +
        " rolls of " +
        shopForm.childNodes[i].name +
        " chips to the basket.");
        noOfButtonsChecked = 1;

        // This uses the findIndex method to return the index of the object containing the radio button name

        let objIndex = basketArray.findIndex((obj => obj.itemName == shopForm.childNodes[i].name));

        // Then we update the object in the array corresponding to the radio button selected

        basketArray[objIndex].itemValue += parseInt(shopForm.childNodes[i].value);
        break;
        }
    }
    if (noOfButtonsChecked == 0) {
        alert("You have not selected any chips, please try again.")
    }
    else {
    sessionStorage.setItem("sessionBasket", JSON.stringify(basketArray));
    }
}