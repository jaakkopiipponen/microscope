Tracker.autorun(function() {
  	if (Meteor.user() && !Meteor.loggingIn()) {
  		var intercomSettings = {
  			name: Meteor.user().username,
  			email: Meteor.user().emails[0].address,
  			created_at: Math.round(Meteor.user().createdAt/1000),
  			favorite_color: _.sample(['blue', 'green', 'red', 'nauta']),
  			user_id: Meteor.user()._id,
  			user_hash: Meteor.user().intercomHash,
  			widget: {
  				activator: '#Intercom',
  				use_counter: true
  			},
  			app_id: 'sn9ytq3j'
  		};
  		Intercom('boot', intercomSettings);
  	}
});