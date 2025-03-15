chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'PIXABAY_SEARCH') {
        fetch(request.url)
            .then(response => response.json())
            .then(data => {
                sendResponse({success: true, data: data});
            })
            .catch(error => {
                sendResponse({success: false, error: error.toString()});
            });
        return true;  // 비동기 응답을 위해 필수
    }
}); 