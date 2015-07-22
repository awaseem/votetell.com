/**
 * Created by awaseem on 15-07-08.
 */

var choiceColors = {};

Template.choiceLayout.onCreated(function () {
    choiceColors = getChoiceColors(Choices.find().fetch());
});

Template.choiceLayout.helpers({
    choices: function() {
        return Choices.find();
    },
    totalHits: function() {
        var totalHits = 0;
        Choices.find({}, { hits: 1, _id: 0}).map(function(choice) {
            totalHits += choice.hits;
        });
        return totalHits;
    },
    calculatePercentage: function(hits, totalHits) {
        if (hits && totalHits != 0) {
            return Math.round((hits / totalHits) * 100);
        }
        else {
            return 0;
        }
    },
    getBarColor: function (choice) {
        return choiceColors[choice];
    }
});