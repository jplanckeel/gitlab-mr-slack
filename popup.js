console.log('<----- Extension script started running ----->');

document.querySelector('.review').addEventListener('click', function () {
   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var current = tabs[0];
        url = current.url;
        title = current.title;
        extractTitle = title.match(/(.*)\(!(\d+)\).*Merge requests \W(.*)\W Gitlab/i)
        console.log(extractTitle)
        mrTitle= extractTitle[1]
        mrId= extractTitle[2]
        mrProject= extractTitle[3].replace(/\s/g, '')

        reviewMessage = ":please_review: `" + mrProject + "` " + mrTitle + " [MR" + mrId +"](" + url + ")"    
        console.log(reviewMessage)
        navigator.clipboard.writeText(reviewMessage);
    });

});


document.querySelector('.merged').addEventListener('click', function () {
   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var current = tabs[0];
        url = current.url;
        title = current.title;
        extractTitle = title.match(/(.*)\(!(\d+)\).*Merge requests \W(.*)\W Gitlab/i)
        console.log(extractTitle)
        mrTitle= extractTitle[1]
        mrId= extractTitle[2]
        mrProject= extractTitle[3].replace(/\s/g, '')

        reviewMessage = ":merged: `" + mrProject + "` " + mrTitle + " [MR" + mrId +"](" + url + ")"    
        console.log(reviewMessage)
        navigator.clipboard.writeText(reviewMessage);
    });

});
