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