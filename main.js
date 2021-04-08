async function downloadAllPicturesOfBoard() {  
  if (window.location.href.indexOf('www.pinterest.') > 0) {    
    console.log("You are on Pinterest !");
    console.log("Gettin' all Pins !");
    var arr = [], l = document.querySelectorAll("a");
    console.log(l);
    // Check if the a Local DB already exists otherwise create a new one
    await chrome.storage.local.get(['links'], function(arrgu) {
      console.log("value of returned DB key: " + arrgu.links);
      if (arrgu.links != null) {
        console.log('DB already exists, start using it');
        arr = arrgu.links;
      }
    });
    for(var i=0; i<l.length; i++) {
      if (l[i].innerHTML.includes("/originals/")) {
        potentialLink = l[i].innerHTML.split(' ');
        for(var x=0; x<potentialLink.length; x++) {
          if (potentialLink[x].includes("/originals/")) {            
            // Check if it is already in the "database" otherwise insert it as a new entry
            if(!arr.includes(potentialLink[x])){
              console.log("Inserting new value");
              arr.push(potentialLink[x]);      
            } else {
              console.log("Already In Array");
            }
          };
        };
      };
    };
    console.log(arr);
    await chrome.storage.local.set({links: arr}, function() {
      console.log('Value is set to ' + arr);
    });
  };  
};


chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: downloadAllPicturesOfBoard
  });  
});