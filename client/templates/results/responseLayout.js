/**
 * Created by awaseem on 15-07-09.
 */

Template.responseLayout.helpers({
    responses: function() {
        return Responses.find({}, { sort: { date: -1 }});
    },
    formatDate: function(date) {
        if (date) {
            return date.toLocaleString();
        }
    }
});