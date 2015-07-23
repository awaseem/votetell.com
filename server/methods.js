/**
 * Created by awaseem on 15-06-29.
 */

var addChoice = function (question_id, choice) {
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

var checkClientAddress = function (question_id, clientIpAddress) {
    var query = clientAddress.findOne( {
        $and: [ { question_id: question_id }, { ipAddress: clientIpAddress } ]
    } );
    if (query) {
        return true;
    }
    return false;
};

var checkChoices = Match.Where(function (c) {
    check(c, [String]);
    return c.length <= MAX_CHOICES;
});

Meteor.methods({
    createQuestion: function (question, choices) {
        check(question, String);
        check(choices, checkChoices);
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
            throw new Meteor.Error(500, "Failed to add question: " + err.message);
        }
        return urlKey;
    },
    updateChoiceHit: function (question_id, choiceId) {
        check(question_id, String);
        check(choiceId, String);
        if (!checkClientAddress(question_id, Meteor.userId())) {
            clientAddress.insert({
                question_id: question_id,
                ipAddress: Meteor.userId()
            });
        }
        else {
            throw new Meteor.Error(500, "Can't update vote because this client has already voted!");
        }
        try{
            Choices.update(choiceId, {
                $inc: { hits: 1 }
            });
        }
        catch (err) {
            console.error("Failed to update choice: " + choiceId + " beacuse of the following error: " + err.toString());
            throw new Meteor.Error(500, "Failed to update choice: " + err.message);
        }
    },
    addResponseToChoice: function (question_id, choiceId, response, name) {
        check(question_id, String);
        check(choiceId, String);
        check(response, String);
        check(name, String);
        if (checkClientAddress(question_id, Meteor.userId())) {
            throw new Meteor.Error(500, "Can't add response because this client has already said something!");
        }
        try {
            Responses.insert({
                choice_id: choiceId,
                name: name,
                response: response
            });
        }
        catch (err) {
            console.log("Failed to add response: " + response + " for the following choice: " + choiceId)
            throw new Meteor.Error(500, "Failed to add response: " + err.message);
        }
    },
    hasClientVoted: function (question_id) {
        check(question_id, String);
        return checkClientAddress(question_id, Meteor.userId());
    }
});