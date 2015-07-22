/**
 * Created by awaseem on 15-07-08.
 */

Template.result.helpers({
    totalHits: function() {
        var totalHits = 0;
        // Id is equal to zero to let minimongo know NOT to return the ID
        Choices.find({}, { hits: 1, _id: 0}).map(function(choice) {
            totalHits += choice.hits;
        });
        return totalHits;
    },
    totalResponses: function () {
        return Responses.find().count();
    }
});