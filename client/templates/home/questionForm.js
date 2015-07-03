/**
 * Created by awaseem on 15-07-02.
 */

var choices = 0;

Template.questionForm.helpers({
    // TODO add ui handling for errors
});

Template.questionForm.events ({
    "submit .new-question": function () {
        var newQuestion = $(".new-question");
        var formData = newQuestion.serializeArray();
        console.log(parseFormData(formData));
        newQuestion.trigger("reset");
        return false;
    },
    "focus .last-choice": function () {
        if (choices <= 10) {
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