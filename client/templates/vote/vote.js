/**
 * Created by awaseem on 15-07-04.
 */

Template.vote.helpers({
    question: function () {
        return Questions.findOne();
    },
    choices: function () {
        return Choices.find();
    },
    responses: function () {
        return Responses.find({}, {sort: {date: -1}});
    }
});

Template.vote.events({
    "submit .choice-selection": function (event, template) {
        var selectionElement = template.find("input:radio[name=choice]:checked");
        var responseElement = template.find("input:text[name=response]");
        var choiceId = $(selectionElement).attr("id");
        var responseText = $(responseElement).val();

        if (!choiceId) {
            // TODO error handling if the choice ID is none
            console.error("choice id is blank!");
            return false;
        }

        if (/\S/.test(responseText)) {
            var responseErrors = responseValidator(responseText);
            if (responseErrors.length != 0) {
                console.log(responseErrors);
            }
            else {
                Meteor.call("addResponseToChoice", choiceId, responseText, "bob"); // TODO add field for user to input name
            }
        }
        else {
            // TODO error handling for responses
            console.error("response id can not be inserted");
        }

        Meteor.call("updateChoiceHit", choiceId);
        return false;
    }
});