try {
    
    // On page change
    chrome.tabs.onUpdated.addListener(
        function(tabId, changeInfo, tab){
            if(changeInfo.status == 'complete'){
                chrome.scripting.executeScript(
                    {
                        files:['content.js'],
                        target: {tabId: tab.id}
                    }
                );
            }
        }
    );

}
catch(e){
    console.log(e);
  }