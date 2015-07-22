/**
 * Created by awaseem on 15-07-21.
 */

getChoiceColors = function (choicesArray) {
    /**
     * Creates an object that contains key value pairs for a choice and its color
     * @param {Array} choices - Array containing all choices for the current question
     * @return {{choice: string, color: string}} object mapping choice to a certain color.
     */
    var choiceColors = CHOICE_COLORS;
    var choiceColorsObj = {};
    for (var i = 0; i < choicesArray.length; i++) {
        if (typeof choiceColors[i] === 'undefined') {
            // if some how the number of choices is greater than the color, just give that choice the color black
            choiceColorsObj[choicesArray[i]._id] = "black";
        }
        else {
            choiceColorsObj[choicesArray[i]._id] = choiceColors[i];
        }
    }
    return choiceColorsObj;
};