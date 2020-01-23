chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var url = tab.url;

	if (! /^https?.*$/.test(url)) {
		return;
	}

	var data = {};
	data.host = get_hostname(url);

	if(debug) {
		chrome.storage.local.get(data.host, function(values) {
			got_settings_bg(values);
		});
	} else {
		chrome.storage.sync.get(data.host, function(values) {
			got_settings_bg(values);
		});
	}

	function got_settings_bg(settings) {
		var settings_css = settings[data.host].css;
		var settings_js = settings[data.host].js;
		var willit = Math.random();
		if(typeof settings[data.host]  !== "undefined") {
			if(settings_css) {
				chrome.tabs.insertCSS(tabId, {code: settings_css, runAt: 'document_start' });
			}
			if(settings_js) {
				chrome.tabs.executeScript(tabId,	{ file: "jquery.js", runAt: 'document_start' }, function () {
					chrome.tabs.executeScript(tabId,
						{ code: '$(document).ready(function() {' + pandaTestsScript(settings_js, data.host) + '})', runAt: 'document_start' }
					);
				});
			}
		} else {
			cl('No settings');
		}
	}
});


function save_background(deferred) {
	if (deferred.host) {
		save_settings(deferred.host, deferred.settings);
	}
}