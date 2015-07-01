/**
 * Created by awaseem on 15-06-29.
 */

Meteor.publish("questions", function () {
    return Questions.find();
});