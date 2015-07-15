/**
 * Created by awaseem on 15-06-29.
 */

var addChoice = function(question_id, choice) {
    /**
     * @param {string} question_id - ID for the question the choice should correlate to.
     * @param {string} choice - choice to insert
     * @return {string} Choice that was successfully inserted into the database
     */
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
        var urlKey = ShortId.generate();
        try {
            var question_id = Questions.insert({
                question: question,
                urlKey: urlKey
            });
            for (var i = 0; i < choices.length; i++) {
                addChoice(question_id, choices[i]);
            }
        }
        catch (err) {
            console.error("Failed to add question: " + question + " because of the following error: " + err.toString());
            throw new Meteor.Error(500, "failed to add question: " + err.message);
        }
        return urlKey;
    },
    updateChoiceHit: function(choiceId) {
        Choices.update(choiceId, {
            $inc: { hits: 1 }
        }, function(error) {
            if (error) {
                console.error("Failed to update hit for choice id: " + choiceId);
            }
        });
    },
    addResponseToChoice: function(choiceId, response, name) {
        Responses.insert({
            choice_id: choiceId,
            name: name,
            response: response
        }, function(error) {
            if (error) {
                console.error("Failed to add response: " + response + " for choice id: " + choiceId);
            }
        })
    }
});