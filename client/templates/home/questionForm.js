/**
 * Created by awaseem on 15-07-02.
 */

// We already have one default choice given to the user, that's why this
// variable is equal to one!
test = "this is a test";
var choices = 1;
var maxChoices = MAX_CHOICES;

var enableLoadingButton = function () {
    $(".loading-button")
        .addClass("disabled")
        .val("Loading");
};

var disableLoadingButton = function () {
    $(".loading-button")
        .removeClass("disabled")
        .val("Submit");
};

var showErrorModal = function () {
    $("#error-modal")
        .modal({
            detachable: false
        })
        .modal("show").modal("refresh");
};

var showSuccessModal = function () {
    $("#success-modal")
        .modal({
            detachable: false
        })
        .modal("show").modal("refresh");
};

var hideSuccessModal = function () {
    $("#success-modal")
        .modal({
            detachable: false
        })
        .modal("hide").modal("refresh");
};

Template.questionSuccess.helpers({
    urlKey: function () {
        return Session.get("urlKey");
    }
});

Template.questionError.helpers({
    questionErrors: function () {
        return Session.get("questionErrors");
    },
    choiceErrors: function () {
        return Session.get("choiceErrors");
    }
});

Template.questionForm.onRendered(function () {
    choices = 1;
});

Template.questionForm.events ({
    "submit .new-question": function () {
        var newQuestion = $(".new-question");
        var formData = parseFormData(newQuestion.serializeArray());
        var questionErrors = questionValidator(formData.question);
        var choiceErrors = choiceValidator(formData.choices);
        if (choiceErrors.length != 0 || questionErrors.length != 0) {
            Session.set("questionErrors", questionErrors);
            Session.set("choiceErrors", choiceErrors);
            showErrorModal();
            return false;
        }
        else {
            enableLoadingButton();
            Meteor.call("createQuestion", formData.question, formData.choices, function (error, result) {
                if (result) {
                    disableLoadingButton();
                    Session.set("urlKey", result);
                    showSuccessModal();
                }
                else {
                    Session.set("questionErrors", error.reason);
                    showErrorModal();
                }
            });
        }
        newQuestion.trigger("reset");
        return false;
    },
    "focus .last-choice": function () {
        if (choices < maxChoices) {
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
    },
    "click #poll-link": function () {
        hideSuccessModal();
    }
});