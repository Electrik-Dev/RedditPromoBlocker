/*
    The script is executed when the browser is loading a page. 
    rather than executing when when the page loading is completed, this will run 
    as soon as the browser is committed to loading it
*/

chrome.webNavigation.onCommitted.addListener(function (tab) {
    // prevent script from running when other frames are loaded
    if(tab.frameId == 0) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true}, tabs => {

            // find the URL of the current page
            let url = tabs[0].url;

            // remove extra protocol defs and www subdomain from url
            let parsed_url = url.replace("https://", "")
                .replace("http://", "")
                .replace("www.", "");

            // remove path and queries to get only the basedomain
            let domain = parsed_url.slice(0, parsed_url.indexOf('/') == -1 ? parsed_url.length : parsed_url.indexOf('/'))
                .slice(0, parsed_url.indexOf('?') == -1 ? parsed_url.length : parsed_url.indexOf('?'));

            try {
                if(domain.length < 1 || domain === null || domain === undefined) {
                    return;
                } else if (domain == "reddit.com"){
                    runPromoBlockerScript();
                    return;
                }
            } catch (error) {
                throw error;
            }
        });
    }
});

function runPromoBlockerScript() {
    // inject script to the page
    chrome.tabs.executeScript({
        file: 'promoblocker.js'
    });
    return true;
}