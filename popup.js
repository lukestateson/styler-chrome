$(function() {

	var patreon_texts = [
		'Use !important',
		'IDs are more important than class',
		'I love Flexbox, do you?',
		'You can now use CSS Grid',
		'ECMAScript 6 is awesome!',
		'Linux > Windows',
		'Noob',
		'This won\'t work, lol',
		'Cool T-shirt',
		'Stop eating',
		'Get to Work',
		'Get to Gym',
		'I\'ve seen this in South Park',
		'You look handome',
		':)',
		':(',
		'Simpsons Already Did It',
		'I use Arch, btw',
		'Btw, i use Arch',
		'Hi, Reddit!',
		'Follow me',
		'Need help?',
		'Read man pages',

		'We need to go deeper',
		'Recommend me a good JS framework',
		'Ask me',

		'No GoT spoilers here',
		'Spoilers incoming',

		'Cool story, bro',
		'Git pull',

		'This app is running on Windows XP',
		'Do you remember Windows 7?',
		'Is Facebook reading this?',
		'Your PC will restart in...',
		'99% Ready',
		'Restarting...',
		'Python is slow',
		'Use Node.js',
		'What is this website?',

		'Knock, knock, Neo',
		'Your mind makes it real.',
		'Follow the white rabbit.',
		'The Matrix has you...',
		'Wake up, Neo...',
		'I know Kung Fu.',
		'Free your mind.',
		'Dodge this.',
		'Whoa',

		'I\'ll be back.',
		'Get out.',
		'Sarah Connor?',

		'Hey, Jack!',
		'Hey, Mike!',
		'Hey, Sarah',
		'Hey, Jane!',

		'I did my best',

		'Don\'t use wiki',

		'Another one bites the dust',
		'Don\'t stop me now',

		'Hello, Boomer',
		'Hello, Zoomer',

		'Developers, Developers, Developers...',

		'Call me',
		'In Avengers Endgame...',

		'I am your father!',
		'No. I am your father.',
		'Power! Unlimited power!',
		'Chewie, we\’re home.',
		'Hope.',
		'There\’s always a bigger fish.',
		'I find your lack of faith disturbing.',
		'The Force will be with you. Always.',
		'Do. Or do not. There is no try.',
		'Never tell me the odds!',

		'3.141592653589793238462643383279',

		'Are you even trying?',
		'You look ravaged.',
		'Fight me!',
		'So begins a new age of knowledge.',
		'Knowledge is power!',
		'A spell I well remember.',
		'I\'m polite and efficient.',
		'Ho ho ha ha',
		'I said good day, sir!',

		'Billy Cyrus > Miley Cyrus',
		'Oops, i did it again...',
		'Real Slim Shady',

		'Don\'t try this',
		'Bad idea...',

		'Mr. Stark? I don\'t feel so good...',
		'You love Candy Crush?',

		'Avada kedavra!',
		'Imperio!',
		'Crucio!',
		'You\'re a wizard, Harry.',
		'Oculus Reparo!',
		'- After all this Time? - Always',
		'Expelliarmus!',
		'Accio!',
		'Lumos!',
		'Wingardium Leviosa',
		'Expecto Patronum!',
		'Riddikulus',

		'Too soon!',
		'By fire be purged!',
		'OBLIVION!',
		'Leeeeroooy Jeeeenkiiins!',
		'Work, work',
		'Zug Zug',
		'BONESTORM!',
		'BOOOONESTOOOOOORM!',
		'Mrglglglgrlglg',
		'Okie dokie',
		'grglrglrlgrlglrglrglrlgrglrlgrl',
		'More work?',
		'You are not prepared!',
		'Hellscream\'s eyes are upon you!',
		'This... is not over!',
		'Lok\'tar ogar! Victory or death!',
		'Time is money, friend',
		'I have EXACTLY what you need',
		'MADNESS WILL CONSUME YOU!',
		'Destroyed... by... Kel\'Thuzad',
		'Made... to serve',
		'Betrayed... by... my... order',
		'I was once called... Ashbringer',
		'More dots, more dots!',
		'That\'s 50 DKP MINUS',
		'MORE EXPLOSIONS',
		'Frostmourne hungers',
	];

	// var patreon_text = patreon_texts[Math.floor(Math.random()*patreon_texts.length)];

	// $('.patreon').html("No ads & tracking. Support Styler!");

	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
			var data = {};
			data.url = tabs[0].url;
			data.host = get_hostname(data.url);
			init(data);
		}
	);

	function init(data) {

		var cssCM;
		var jsCM;

		var background = chrome.extension.getBackgroundPage();

		if(debug) {
			chrome.storage.local.get(data.host, function(values) {
				got_settings_popup(values);
			});
		} else {
			chrome.storage.sync.get(data.host, function(values) {
				var settings = {};
				if(typeof(values[data.host])  !== "undefined") {
					cl('normal');
					settings = values[data.host];
					got_settings_popup(settings);
				} else {
					chrome.storage.sync.get('http://' + data.host, function(values) {
						if(typeof(values['http://' + data.host])  !== "undefined") {
							cl('http legacy');
							settings = values['http://' + data.host];
							got_settings_popup(settings);
						} else {
							chrome.storage.sync.get('https://' + data.host, function(values) {
								if(typeof(values['https://' + data.host])  !== "undefined") {
									cl('httpS legacy');
									settings = values['https://' + data.host];
									got_settings_popup(settings);
								} else {
									cl('nothing!');
									settings.css = '';
									settings.js = '';
									got_settings_popup(settings);
								}
							});
						}
					});
				}
			});
		}

		function got_settings_popup(settings) {

			var css = settings.css;
			var js = settings.js;

			$('.css').val(css);
			$('.js').val(js);

			cssCM = CodeMirror.fromTextArea(document.getElementById('css'), {
				lineNumbers : true,
				mode:  "css",
				theme: 'default csscm',
				indentWithTabs: true,
				lineWrapping: true,
				tabSize: 2,
				autofocus: true
			});
			jsCM = CodeMirror.fromTextArea(document.getElementById('js'), {
				lineNumbers : true,
				mode:  "javascript",
				theme: 'default jscm',
				indentWithTabs: true,
				tabSize: 2,
				lineWrapping: true
			});
		}

		function get_option(option) {
			if($('button.' + option).hasClass('active')) {
				return 1;
			} else {
				return 0;
			}
		}

		function set_option(option, value) {
			if(value == 1) {
				$('button.' + option).addClass('active');
			}
		}

		function switch_option(option) {
			if($('button.' + option).hasClass('active')) {
				$('button.' + option).removeClass('active');
				set_option(option, 0);
			} else {
				$('button.' + option).addClass('active');
				set_option(option, 1);
			}
		}

		$(document).on('keyup change', function() {
			jsCM.save();
			cssCM.save();
			var settings = {};
			settings.css = $('.css').val();
			settings.js = $('.js').val();
			defer_save_settings(data.host, settings);
			chrome.tabs.insertCSS({code: settings.css });
		});

		$('.run').on('click', function() {
			jsCM.save();
			cssCM.save();
			var settings = {};
			settings.css = $('.css').val();
			settings.js = $('.js').val();
			defer_save_settings(data.host, settings);
			chrome.tabs.executeScript(null, { file: "jquery.js", runAt: 'document_start' }, function() {
				chrome.tabs.insertCSS({code: settings.css });
				chrome.tabs.executeScript(null,
					{ code: '(function() {' + settings.js + '})()', runAt: 'document_start' }
				);
			});
		});

		$('.styler-wrap, .buttons').click(function(event) {
			var target = $(event.target);
			if(target.is('.show-data') === false) {
				$('.data-exported').removeClass('popup-visible');
			}
		});

		$('.show-data').on('click', function () {
			chrome.storage.sync.get(function(result) {
				var data_exported = result;
				$('.data-exported').html('').addClass('popup-visible');
				for (var key in data_exported) {
					// skip loop if the property is from prototype
					if (!data_exported.hasOwnProperty(key)) continue;
						var obj = data_exported[key];
						for (var prop in obj) {
						// skip loop if the property is from prototype
						if(!obj.hasOwnProperty(prop)) continue;

						// your code
						//alert(prop + " = " + obj[prop]);
						if(obj[prop]) {
							$('.data-exported').append('<div><div class="urltitle">' + key + ' ' + prop + '</div><textarea>' + obj[prop] + '</textarea></div>');
						}
					}
				}
			});
		});

		var _deferred = {};

		function defer_save_settings(host, settings) {
			_deferred.host = host;
			_deferred.settings = settings;
		}

		addEventListener("unload", function (event) {
			background.save_background(_deferred);
		}, true);
	}

});
