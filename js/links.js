// WD T42

// Toggles the heart icon on each photo from grey to red and back again.

function likeHeart(e) {

    if (e.target.classList.contains("liked")) {
        e.target.classList.remove("liked");
        e.target.classList.add("unliked");
    }
    else if (e.target.classList.contains("unliked")) {
        e.target.classList.remove("unliked");
        e.target.classList.add("liked");
    }
    else {
        e.target.classList.add("liked");
    }
}

// CREDITS ------

// Thanks to Jason for introducing me to linking to font-awesome and the syntax to get the heart icon
// Thanks to Leon for the class toggle functionality
