/**
 * Created by awaseem on 15-07-02.
 */

// We already have one default choice given to the user, that's why this
// variable is equal to one!
var choices = 1;
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
        if (choices < MAX_CHOICES) {
            choices++;
            var submitButton = $("#submit");
            var choiceField = $(".last-choice-field");
            var duplicateChoiceField = choiceField.clone();
            duplicateChoiceField
                .find("label")
                .text("Choice: #" + choices);
            choiceField
                .removeClass("last-choice-field")
                .addClass("choice-field");
            choiceField
                .find("input")
                .removeClass("last-choice")
                .addClass("choice");
            submitButton
                .before(duplicateChoiceField.prop("outerHTML"));
        }
    }
});