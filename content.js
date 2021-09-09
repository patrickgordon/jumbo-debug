const style = "text-decoration: none;";

function checkIfDebug(ref, translationId) {
	const isAlreadyDebug = $(ref).find(`abbr[title='${translationId}']`).length > 0;

	return isAlreadyDebug;
}

function applyDebug() {
	$("[data-translation-id]").each(function () {
		var data = $(this).data();

		// Make sure there's actually data attributes to access on.
		if (data) {
			// Get the translation key.
			const translationId = data.translationId;

			// Determine whether we're already showing the debug information.
			const checkIfItemAlreadyDebug = checkIfDebug($(this), translationId);

			// If we have a translation ID and debug is not already showing then...
			if (translationId && !checkIfItemAlreadyDebug) {
				const indicator = `
					<abbr data-id="translation_debug" style="${style}" title=${translationId}>
						?
					</abbr>
				`;

				$(this).prepend(indicator);

				// check if hidden and if it is to enable it so the debug shows
				if ($(this).css("display") === "none") {
					$(this).css("display", "block");
				}
			}
		}
	});
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		// listens for the messages coming from background.js. ATM they do the same thing but leaving in a
		// loop incase we need to seperate behaviour differently.
		if (request.message === "clicked_browser_action") {
			applyDebug();
		}
	}
);