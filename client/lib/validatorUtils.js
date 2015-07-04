/**
 * Created by awaseem on 15-07-02.
 */

questionValidator = function (questionString) {
    var questionErrors = [];
    var questionContext = Questions.simpleSchema().namedContext();
    if (!questionContext.validateOne({ question: questionString}, "question")) {
        var invalidKeys = questionContext.invalidKeys();
        for (var i = 0; i < invalidKeys.length; i++) {
            questionErrors.push(questionContext.keyErrorMessage(invalidKeys[i].name));
        }
    }
    return questionErrors
};

choiceValidator = function (choiceStrings) {
    var choiceErrors = [];
    var choiceContext = Choices.simpleSchema().namedContext();
    if (!Array.isArray(choiceStrings)) { throw "choiceStrings is not an array!"}
    if (choiceStrings.length == 0) {
        choiceErrors.push("You must enter at least one choice");
    }
    else {
        for (var i = 0; i < choiceStrings.length; i++) {
            if (!choiceContext.validateOne({ choice: choiceStrings[i]}, "choice")) {
                var invalidKeys = choiceContext.invalidKeys();
                for (var j = 0; j < invalidKeys.length; j++) {
                    choiceErrors.push(choiceContext.keyErrorMessage(invalidKeys[j].name));
                }
            }
        }
    }
    return choiceErrors
};