/**
 * Created by awaseem on 15-06-28.
 */

Template.home.events({
    "submit .new-question": function (event) {
        var formData = $(".new-question").serializeArray();
        console.log(formData);
        $(".new-question").trigger("reset");
        return false;
    },
    "focus .last-choice": function (event) {
        $(".last-choice").removeClass("last-choice");
        $(".submit").before("<input class='last-choice' type='text' name='choice' placeholder='Enter a choice'>");
    }
});