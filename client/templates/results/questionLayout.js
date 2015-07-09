/**
 * Created by awaseem on 15-07-08.
 */

Template.questionLayout.helpers({
    question: function() {
        return Questions.findOne();
    },
    formatDate: function(date) {
        if (date) {
            return date.toLocaleString();
        }
    }
});