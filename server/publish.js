/**
 * Created by awaseem on 15-06-29.
 */

Meteor.publish("questionInfo", function (urlKey) {
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

//Meteor.publish("responses", function(choice_ids) {
//    return Responses.find({ choice_id: { $in: choice_ids } });
//});