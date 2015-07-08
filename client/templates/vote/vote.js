/**
 * Created by awaseem on 15-07-04.
 */

Template.vote.helpers({
    question: function () {
        return Questions.findOne();
    },
    choices: function () {
        return Choices.find();
    }
});

Template.vote.events({
    "submit .choice-selection": function (event, template) {
        var selectionElement = template.find("input:radio[name=choice]:checked");
        var choiceId = $(selectionElement).attr("id");
        if (choiceId) {
            Meteor.call("updateChoiceHit", choiceId);
        }
        else {
            // TODO error handling if the choice ID is none
        }
        return false;
    }
});