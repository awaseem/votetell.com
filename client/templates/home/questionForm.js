/**
 * Created by awaseem on 15-07-02.
 */

var choices = 0;
var MAX_CHOICES = 10;

Template.questionForm.helpers({
    // TODO add ui handling for errors
});

Template.questionForm.events ({
    "submit .new-question": function () {
        var newQuestion = $(".new-question");
        var formData = parseFormData(newQuestion.serializeArray());
        var questionErrors = questionValidator(formData.question);
        var choiceErrors = choiceValidator(formData.choices);
        if (choiceErrors.length != 0 || questionErrors.length != 0) {
            // TODO add ui handling for errors
            console.log(questionErrors);
            console.log(choiceErrors);
            return false;
        }
        else {
            Meteor.call("createQuestion", formData.question, formData.choices);
        }
        newQuestion.trigger("reset");
        return false;
    },
    "focus .last-choice": function () {
        if (choices <= MAX_CHOICES) {
            var submitButton = $("#submit");
            $(".last-choice")
                .removeClass("last-choice")
                .addClass("choice");
            submitButton
                .before("<input class='last-choice' type='text' name='choice' placeholder='Enter a choice'>")
                .before("<br>");
            choices++;
        }
    }
});