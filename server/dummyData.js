if (Posts.find().count() === 0) {
	Posts.insert({
		title: "lol1",
		url: 'http://www.remotegarage.com'
	});
	Posts.insert({
		title: "lol2",
		url: "http://remotegarage2.com"
	});
	Posts.insert({
	  title: 'Meteor Docser',
	  author: 'Tom Coleman',
	  url: 'http://docs.meteor.com'
	});
}

