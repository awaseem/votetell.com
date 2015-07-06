/**
 * Created by awaseem on 15-06-28.
 */
Router.route("/", {
    action: function () {
        this.render("home");
    }
});

Router.route("/:vote_id", {
    onBeforeAction: function () {
        if (!Questions.findOne({ urlKey: this.params.vote_id })) {
            if (this.questionSubscription.ready()) {
                this.render("error");
            }
            else {
                this.next();
            }
        }
        else {
            this.next();
        }
    },
    waitOn: function () {
        this.questionSubscription = Meteor.subscribe("questionInfo", this.params.vote_id);
    },
    action: function () {
        this.render("vote");
    }
});