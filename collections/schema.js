/**
 * Created by awaseem on 15-06-29.
 */

var schemas = {};

schemas.responses = new SimpleSchema({
    choice_id: {
        type: String
    },
    response: {
        type: String,
        max: 500,
        label: "Response to each choice"
    },
    name: {
        type: String,
        max: 100,
        label: "Name of user"
    },
    date: {
        type: Date,
        label: "Date Created",
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
            else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            }
            else {
                this.unset();
            }
        }
    }
});

schemas.choices = new SimpleSchema({
    question_id: {
        type: String
    },
    choice: {
        type: String,
        label: "Choice",
        max: 500
    },
    hits: {
        type: Number,
        label: "Selection hits",
        min: 0,
        defaultValue: 0
    }
});

schemas.questions = new SimpleSchema({
    question: {
        type: String,
        label: "Question",
        max: 500,
        min: 3
    },
    date: {
        type: Date,
        label: "Date Created",
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            }
            else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            }
            else {
                this.unset();
            }
        }
    },
    urlKey: {
        type: String,
        label: "Url Key",
        autoValue: function () {
            if (this.isInsert) {
                return ShortId.generate()
            }
            else if (this.isUpsert) {
                return {$setOnInsert: ShortId.generate()}
            }
            else {
                this.unset();
            }
        }
    }
});

// Attach all of our schemas
Questions.attachSchema(schemas.questions);
Choices.attachSchema(schemas.choices);
Responses.attachSchema(schemas.responses);