Accounts.onCreateUser(function(options, user) {
	user.IntercomHash = IntercomHash(user, 'efzylBZMkDOy_WP3g-0ecjQTMPkrN2k_6v4vyuIX');

	if(options.profile)
		user.profile = options.profile;

	return user;
});