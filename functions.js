var debug = false;

function pandaTestsScript(script, host) {
	return "if($('body').hasClass('pandastylerloaded') === false && window.location.hostname == '"+host+"') { $('body').addClass('pandastylerloaded'); " + script + " }";
}

function cl(data) {
	console.log(data);
}

function onError(error) {
	console.log(`Error: ${error}`);
}

function AP(data) {
	$('body').append(data);
}

function get_hostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function save_settings(hostname, settings) {
	var values = {};
	values[hostname] = settings;
	if(debug) {
		let setting = chrome.storage.local.set(values);
		setting.then(null, onError);
	} else {
		let setting = chrome.storage.sync.set(values);
		setting.then(null, onError);
	}
}