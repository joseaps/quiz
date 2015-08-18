var models = require('../models/models.js');

// GET /quizes/statistics
exports.show = function(req, res) {
	var questions = 0;
	var comments = 0;
	var questions_with_comments = 0;
	var questions_without_comments = 0;
	
	models.Quiz.findAll({ include: [{ model: models.Comment }] }).then(function(quizes) {
		quizes.forEach(function(quiz) {
			questions++;
			comments += quiz.Comments.length;
			if (quiz.Comments.length === 0)
			{
				questions_without_comments++;
			}
			else
			{
				questions_with_comments++;
			}
		});
		res.render('statistics', { questions: questions, comments: comments, questions_with_comments: questions_with_comments, questions_without_comments: questions_without_comments, errors: []});
	});
};
