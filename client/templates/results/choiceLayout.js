/**
 * Created by awaseem on 15-07-08.
 */

var progressBarColors = [
    "red",
    "orange",
    "yellow",
    "olive",
    "teal",
    "blue",
    "violet",
    "purple",
    "pink",
    "brown"
];

var choiceColors = {};

Template.choiceLayout.onCreated(function () {
    Choices.find().forEach(function (choices, index) {
        if (typeof progressBarColors[index] === 'undefined') {
            choiceColors[choices.choice] = "black";
        }
        else {
            choiceColors[choices.choice] = progressBarColors[index];
        }
    });
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
        return totalHits
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