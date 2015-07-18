/**
 * Created by awaseem on 15-07-02.
 */

questionValidator = function (questionString) {
    /**
     * Takes a question string and returns an array of errors that are found
     * with the string.
     * @param {String} questionString - Question to validate.
     * @returns {Array} Contains all error messages that relate to the question.
     */
    var questionErrors = [];
    var questionContext = Questions.simpleSchema().namedContext();
    if (!questionContext.validateOne({ question: questionString}, "question")) {
        var invalidKeys = questionContext.invalidKeys();
        for (var i = 0; i < invalidKeys.length; i++) {
            questionErrors.push(questionContext.keyErrorMessage(invalidKeys[i].name));
        }
    }
    return questionErrors;
};

choiceValidator = function (choiceStrings) {
    /**
     * Takes an array of choices and returns an array of errors that are found
     * with each choice.
     * @param {Array} choiceStrings - All choices to validate.
     * @return {Array} Contains all error messages that relating to all the choices
     * passed in.
     */
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
    return choiceErrors;
};

responseValidator = function (responseString, nameString) {
    /**
     * Takes a response string and returns an array of errors that are found
     * with the string.
     * @param {String} responseString - Response to validate.
     * @returns {Array} Contains all error messages that relate to the response.
     */
    var responseErrors = [];
    var responseContext = Responses.simpleSchema().namedContext();
    if (!responseContext.validateOne({ response: responseString }, "response") || !responseContext.validateOne({ name: nameString }, "name")) {
        var invalidKeys = responseContext.invalidKeys();
        for (var i = 0; i < invalidKeys.length; i++) {
            responseErrors.push(responseContext.keyErrorMessage(invalidKeys[i].name));
        }
    }
    return responseErrors;
};