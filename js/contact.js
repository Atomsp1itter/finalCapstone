// WD T42

// Our contact form stores the messages in local storage. This is just to mimic the storage
// of the messages in a database so that we can get on to replying to them in due course.

// Setting up our array that will be used to store data and save / retrieve to / from storage.

let messageArray = [];

// Setting up local storage container variables if not already done:

if (localStorage.getItem("localMessages")==null) {
    localStorage.setItem("localMessages", "");
}
else if (localStorage.getItem("localMessages")=="") {
}
else {
    let l = localStorage.getItem("localMessages");
    messageArray = (JSON.parse(l));
}

// Setting up the message object

class MessageDetails {
    constructor(messageName = "", messageEmail = "", messageSubject = "", messageDetail = "") {
        this.messageName = messageName;
        this.messageEmail = messageEmail;
        this.messageSubject = messageSubject;
        this.messageDetail = messageDetail;
    }
}

let Box0 = document.getElementById("Box0");
let Box1 = document.getElementById("Box1");
let Box2 = document.getElementById("Box2");
let Box3 = document.getElementById("Box3");

// This is the function that is called when the user clicks the submit button.

function submitMessage() {

    if (Box0.value == "" || Box1.value == "" || Box2.value == "" || Box3.value == "" ) {
        alert("For us to get back to you successfully,\nwe need you to fill in all details.\nThanks.")
    }
    else {
        messageArray[messageArray.length] = new MessageDetails(Box0.value, Box1.value, Box2.value, Box3.value);
        Box0.value = "";
        Box1.value = "";
        Box2.value = "";
        Box3.value = "";

        localStorage.setItem("localMessages", JSON.stringify(messageArray));

        document.getElementById("messageSent").innerHTML = "Thank you, your message has been received. " + 
            "We will get back to you within 2 working days."
    }
}