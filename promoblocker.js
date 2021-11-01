function blockPromo(){

    // get all of the span elements from the page
    let spans = document.getElementsByTagName("span");

    // process the entire list of span elements
    for (let i = 0; i < spans.length; ++i) {
        // check if the text is contained
        // reddit uses the word 'promoted'
        if(spans[i].innerHTML === 'promoted' || spans[i].innerHTML === 'Promoted') {
            // get the div that wraps the ad
            
            // get the parent element for the entire promoted post
            let j = 0;
            post = spans[i];
            while(j<7) {
                post = post.parentNode;
                ++j;
            }

            // hide the ad
            post.setAttribute("style", "display: none !important;");
        }
    }
}

blockPromo();

// remove the promos as the user is scrolling
setInterval(function() {
    blockPromo();
}, 100)