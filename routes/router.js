/**
 * Created by awaseem on 15-06-28.
 */
Router.route("/", {
    action: function() {
        this.render("home");
    }
});

Router.route("/:vote_id", {
    onBeforeAction: function() {
        if (!Questions.findOne({ urlKey: this.params.vote_id })) {
            if (this.questionAndChoicesSub.ready()) {
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
    waitOn: function() {
        this.questionAndChoicesSub = Meteor.subscribe("questionAndChoices", this.params.vote_id);
    },
    action: function() {
        if (this.questionAndChoicesSub.ready()) {
            this.render("vote");
        }
        else {
            this.render("loading");
        }
    }
});

Router.route("/:vote_id/r", {
    onBeforeAction: function() {
        if (!Questions.findOne({ urlKey: this.params.vote_id })) {
            if (this.questionResponsesAndChoicesSub.ready()) {
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
    waitOn: function() {
        this.questionResponsesAndChoicesSub = Meteor.subscribe("questionChoicesAndResponses", this.params.vote_id);
    },
    action: function() {
        if (this.questionResponsesAndChoicesSub.ready()) {
            this.render("result");
        }
        else {
            this.render("loading");
        }
    }
});