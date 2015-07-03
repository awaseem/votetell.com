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
    var choiceContext = Choices.simpleSchema().nameContext();

};