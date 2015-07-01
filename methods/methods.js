/**
 * Created by awaseem on 15-06-29.
 */

var addChoice = function(question_id, choice) {
    Choices.insert({
        question_id: question_id,
        choice: choice
    }, function (error, result) {
        if (error) {
            console.error("Failed to add choice to the following question id: " + question_id);
        }
        else {
            return result;
        }
    });
};

Meteor.methods({
    createQuestion: function(question, choices) {
        Questions.insert({
            question: question
        }, function(error, result) {
            if (error) {
                console.error("Failed to create question: " + question)
            }
            else {
                for (var i = 0; i < choices.length; i++) {
                    addChoice(result, choices[i]);
                }
            }
        });
    }
});