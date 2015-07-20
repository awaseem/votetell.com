/**
 * Created by awaseem on 15-07-09.
 */

var ALL_FILTER = "item-all";

Template.responseLayout.helpers({
    responses: function () {
        var choiceFilter = Session.get("choiceFilter");
        var queryFilter = {};
        if (choiceFilter) {
            queryFilter.choice_id = choiceFilter;
        }
        // Some how without using fetch, this returns some exception. Google the exception didn't find a solution,
        // but a work around. Calling fetch has solved this issue!
        return Responses.find(queryFilter, {
            sort: { date: -1 },
            reactive: Session.get("updateRealTime")
        }).fetch();
    },
    formatDate: function (date) {
        if (date) {
            return date.toLocaleString();
        }
    },
    choices: function () {
        return Choices.find();
    }
});

Template.responseLayout.events({
    "click #update-real-time": function () {
        Session.set("updateRealTime", !Session.get("updateRealTime"));
        $("#update-real-time").toggleClass("active");
    },
    "click #dropdown-button": function () {
        $(".ui.floating.dropdown.labeled.icon.button").dropdown({
            onChange: function (value, text, $choice) {
                var choiceId = $choice.attr("id");
                if (choiceId === ALL_FILTER) {
                    Session.set("choiceFilter", "");
                }
                else {
                    Session.set("choiceFilter", choiceId);
                }
            }
        });
    }
});

Template.responseLayout.onCreated(function () {
    Session.set("updateRealTime", true);
    Session.set("choiceFilter", "");
});

Template.responseLayout.onRendered(function () {
    // Initialize our dropdown when the template is rendered
    $(".ui.floating.dropdown.labeled.icon.button").dropdown();
});