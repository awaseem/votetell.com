/**
 * Created by awaseem on 15-07-09.
 */

var ALL_FILTER = "item-all";

var responsesSnapshot = [];

var choiceColors;

Template.responseLayout.helpers({
    responses: function () {
        var choiceFilter = Session.get("choiceFilter");
        var updateRealTime = Session.get("updateRealTime");
        if (updateRealTime) {
            var queryFilter = {};
            if (choiceFilter) {
                queryFilter.choice_id = choiceFilter;
            }
            return Responses.find(queryFilter, {
                sort: { date: -1 }
            }).fetch();
        }
        else {
            var responses = [];
            if (choiceFilter) {
                for (var i = 0; i < responsesSnapshot.length; i++) {
                    if (responsesSnapshot[i].choice_id === choiceFilter) {
                        responses.push(responsesSnapshot[i]);
                    }
                }
            }
            else {
                responses = responsesSnapshot;
            }
            return responses;
        }
    },
    formatDate: function (date) {
        if (date) {
            return date.toLocaleString();
        }
    },
    choices: function () {
        return Choices.find();
    },
    newResponses: function () {
        return Responses.find().count() - Session.get("totalResponses")
    },
    updateRealTime: function () {
        return Session.get("updateRealTime");
    },
    getColorForChoice: function (choiceId) {
        return choiceColors[choiceId];
    }
});

Template.responseLayout.events({
    "click #update-real-time": function () {
        Session.set("updateRealTime", !Session.get("updateRealTime"));
        // Only keep a cached copy of the responses if the user does not want them to update real time
        if (!Session.get("updateRealTime")) {
            responsesSnapshot = Responses.find( {}, {
                sort: { date: -1 }
            }).fetch();
            Session.set("totalResponses", responsesSnapshot.length);
        }
        else {
            responsesSnapshot = [];
            Session.set("totalResponses", responsesSnapshot.length);
        }
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
    choiceColors = getChoiceColors(Choices.find().fetch());
});

Template.responseLayout.onRendered(function () {
    // Initialize our dropdown when the template is rendered
    $(".ui.floating.dropdown.labeled.icon.button").dropdown();
});