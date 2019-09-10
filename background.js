// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
	// Send a message to the active tab
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
	});
});

// Called when the user navigates using browser push.
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
	// Send a message to the active tab
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, { "message": "navigated_via_push" });
	});
});