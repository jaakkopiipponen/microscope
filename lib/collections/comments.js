Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		check(this.userId, String);
		check(commentAttributes, {
			postId: String,
			body: String
		});

		var user = Meteor.user();

		var post = Posts.findOne(commentAttributes.postId);

		if(!post)
			throw new Meteor.Error('invalid-comment', "You must enter a comment.");

		var comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		//update the post with a number of comments
		Posts.update(comment.postId, {$inc: {commentsCount: 1}});

		//create the comment, save the ID
		comment._id = Comments.insert(comment);
		//follow by creating notification informing user about a new comment
		createCommentNotification(comment);
		return comment._id;
	}
});