/**
 * Created by awaseem on 15-07-04.
 */

var showErrorModal = function () {
    $("#vote-error-modal")
        .modal({
            detachable: false
        })
        .modal("show").modal("refresh");
};

var disableVoteButton = function () {
    $(".vote-button").addClass("active disabled").val("Voted");
    Session.set("hasVoted", true);
};

Template.vote.onRendered(function () {
    Meteor.call("hasClientVoted", Questions.findOne()._id, function (error, result) {
        if (result) {
            disableVoteButton();
        }
        else {
            Session.set("hasVoted", false);
        }
    })
});

Template.vote.helpers({
    question: function () {
        return Questions.findOne();
    },
    choices: function () {
        return Choices.find();
    },
    hasVoted: function () {
        return Session.get("hasVoted");
    }
});

Template.choiceErrors.helpers({
    responseErrors: function () {
        return Session.get("responseErrors");
    },
    choiceError: function () {
        return Session.get("choiceError");
    },
    unexpectedError: function () {
        return Session.get("unexpectedError");
    }
});

Template.vote.events({
    "submit .choice-selection": function (event, template) {
        var question = Questions.findOne();
        var choiceId = $(template.find("input:radio[name=choice]:checked")).attr("id");
        var nameText = $(template.find("input:text[name=name]")).val();
        var responseText = $(template.find("input:text[name=response]")).val();

        Session.set({
            choiceError: "",
            responseErrors: "",
            unexpectedError: ""
        });

        if (!choiceId) {
            Session.set("choiceError", "You must pick a choice to cast a vote!");
            showErrorModal();
            return false;
        }

        if (responseText !== "") {
            if (nameText === "") {
                nameText = "Bob";
            }
            var responseErrors = responseValidator(responseText, nameText);
            if (responseErrors.length != 0) {
                Session.set("responseErrors", responseErrors);
                showErrorModal();
                return false;
            }
            else {
                Meteor.call("addResponseToChoice", question._id, choiceId, responseText, nameText, function (error) {
                    if (error) {
                        Session.set("unexpectedError", error.reason);
                    }
                });
            }
        }

        Meteor.call("updateChoiceHit", question._id, choiceId, function (error) {
            if (error) {
                Session.set("unexpectedError", error.reason);
                showErrorModal();
            }
        });
        $(".choice-selection").trigger("reset");
        disableVoteButton();
        return false;
    }
});