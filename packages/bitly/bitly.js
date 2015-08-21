// Write your package code here!
Bitly = {};

Bitly.shortenURL = function(url) {
	if(!Meteor.settings.bitly)
		throw new Meteor.Error(500, 'Please provide bitly token in Meteor.settings');

	var shortenResponse = Meteor.http.get("https://api-ssl.bitly.com/v3/shorten?", {
		timeout: 5000,
		params: {
			"format": "json",
			"access_token": Meteor.settings.bitly,
			"longurl": url
		}
	}
	);
	if(shortenResponse.statusCode === 200) {
		return shortenResponse.data.data.url
	} else {
		throw new Meteor.Error(500, "Bitly call failed with error: " + shortenResponse.status_txt);
	}
}

Bitly.getClicks = function(link) {
	if(!Meteor.settings.bitly)
		throw new Meteor.Error(500, 'Please provide bitly token in Meteor.settings');

	var statsResponse = Meteor.http.get("https://api-ssl.bitly.com/v3/link/clicks?", {
		timeout: 5000,
		params: {
			"format": "json",
			"access_token": Meteor.settings.bitly,
			"link": link
		}
	}
	);
	if(statsResponse.statusCode === 200) {
		return statsResponse.data.data.link_clicks
	}
}

Meteor.methods({
	'getBitlyClicks': function(link) {
		return Bitly.getClicks(link);
	}
});

var callInterval = 10000;
Meteor.setInterval(function() {
	//get all posts with the shortUrl property
	var shortUrlPosts = Posts.find({shortUrl: {$exists: true}});
	var postsNumber = shortUrlPosts.count();
	//initialize counter
	var count = 0;
	shortUrlPosts.forEach(function(post) {
		//calculate the delay to distribute API calls evenly throughout the interval
		var callTimeOut = Math.round(callInterval/postsNumber*count);
		Meteor.setTimeout(function() {
			Posts.update(post._id, {$set: {clicks: Bitly.getClicks(post.shortUrl)}});
		}, callTimeOut);
		count++
	});
}, callInterval);

