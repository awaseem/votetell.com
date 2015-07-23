/**
 * Created by awaseem on 15-06-29.
 */

var schemas = {};

schemas.clientAddress = new SimpleSchema({
    question_id: {
        type: String
    },
    ipAddress: {
        type: String
    }
});

schemas.responses = new SimpleSchema({
    choice_id: {
        type: String
    },
    response: {
        type: String,
        max: 140,
        label: "Response to choice"
    },
    name: {
        type: String,
        max: 50,
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
        max: 140
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
        max: 140,
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
        label: "Url Key"
    }
});

// Custom validation and validation messages
SimpleSchema.messages({
    spaceOnly: "[label]: \"[value]\" must contain some characters not just spaces",
    maxString: "[label]: \"[value]\" cannot exceed [max] characters"
});

var spaceOnlyValidator = function () {
    if(!/\S/.test(this.value)) {
        return "spaceOnly";
    }
};

SimpleSchema.addValidator(spaceOnlyValidator);

// Attach all of our schemas
Questions.attachSchema(schemas.questions);
Choices.attachSchema(schemas.choices);
Responses.attachSchema(schemas.responses);
clientAddress.attachSchema(schemas.clientAddress);