/**
 * Created by awaseem on 15-06-29.
 */

Meteor.publish("questionAndChoices", function(urlKey) {
    var question = Questions.findOne({ urlKey: urlKey });
    if (!question) {
        return [];
    }
    var choices = Choices.find({ question_id: question._id });
    if (!choices) {
        return [];
    }

    return [
        // returning this because meteor requires a cursor for its Pub Sub to work properly
        // findOne does not return a cursor, but the entire document
        Questions.find({ urlKey: urlKey }),
        choices
    ]
});

Meteor.publish("questionChoicesAndResponses", function (urlKey) {
    var question = Questions.findOne({ urlKey: urlKey });
    if (!question) {
        return [];
    }
    var choices = Choices.find({ question_id: question._id });
    if (!choices) {
        return [];
    }

    var choiceFilter = [];
    choices.forEach(function(choice) {
        choiceFilter.push(choice._id);
    });
    var responses = Responses.find({ choice_id: { $in: choiceFilter } });
    if (!responses) {
        return [];
    }

    return [
        // returning this because meteor requires a cursor for its Pub Sub to work properly
        // findOne does not return a cursor, but the entire document
        Questions.find({ urlKey: urlKey }),
        choices,
        responses
    ]
});