/**
 * Created by awaseem on 15-07-08.
 */

Template.result.onRendered(function () {
    $('.ui.sticky')
        .sticky({
            jitter: 10,
            offset: 25,
            context: '#context'
        });
});

Template.result.helpers({
    totalHits: function() {
        var totalHits = 0;
        Choices.find({}, { hits: 1, _id: 0}).map(function(choice) {
            totalHits += choice.hits;
        });
        return totalHits
    }
});