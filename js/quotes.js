// WD T42

// This page uses local storage to re-populate the previous comments when the page loads, 
// and adds new comments at the top as they are submitted. So we have the most recent first.

// Setting up our array that will be used to store data and save / retrieve to / from storage.

let commentsArray = [];

// Setting up local storage container variables if not already done:

if (localStorage.getItem("localComments")==null) {
    localStorage.setItem("localComments", "");
}
if (localStorage.getItem("localComments")=="") {
}
else {
    let c = localStorage.getItem("localComments");
    commentsArray = (JSON.parse(c));
}

// Setting up our comment object

class CommentDetails {
    constructor(commentName = "", commentDetail = "") {
        this.commentName = commentName;
        this.commentDetail = commentDetail;
    }
}

let commentBox0 = document.getElementById("commentBox0");
let commentBox1 = document.getElementById("commentBox1");

const commentsTable = document.getElementById("commentsTable");

// This is the onload function. Populates the comments table from local storage.

function existingComments() {

    for (i=0; i<commentsArray.length; i++) {
        let newRow = commentsTable.insertRow();

        let newCell = newRow.insertCell(0);
        let newText = document.createTextNode(commentsArray[i].commentName);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(1);
        newText = document.createTextNode(commentsArray[i].commentDetail);
        newCell.appendChild(newText);
    }
}

// This is the function that adds new comments at the top as they are submitted.

function submitComment() {

    if (commentBox0.value == "" || commentBox1.value == "") {
        alert("For us to add your comment,\nwe need you to add your username and your comment.\nThanks.")
    }
    else {
        // If user has entered something in both boxes, add it to beginning of array and clear boxes

        commentsArray.unshift(new CommentDetails(commentBox0.value, commentBox1.value));
        commentBox0.value = "";
        commentBox1.value = "";

        // Then insert the new comment at the start of the displayed html table

        let newRow = commentsTable.insertRow(0);

        let newCell = newRow.insertCell(0);
        let newText = document.createTextNode(commentsArray[0].commentName);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(1);
        newText = document.createTextNode(commentsArray[0].commentDetail);
        newCell.appendChild(newText);

        // Updates local storage with the new comments array

        localStorage.setItem("localComments", JSON.stringify(commentsArray));
    }
}