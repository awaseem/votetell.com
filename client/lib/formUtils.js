/**
 * Created by awaseem on 15-07-02.
 */

parseFormData = function (formArray) {
    /**
     * Parses the form data and organizes the data into a simple use javascript object.
     * @param {Object[]} formArray - The form entries used to create a new poll.
     * @param {string} formArray[].name - Key used to distinguish between a question or a choice.
     * @param {string} formArray[].value - Value stored in the return object.
     * @return {{question: string, choices: Array}} Parsed form data into a single javascript object.
     */
    var formData = {
        question: "",
        choices: []
    };
    for (var i = 0; i < formArray.length; i++) {
        if (formArray[i].name === "question") {
            formData.question = formArray[i].value;
        }
        else if (formArray[i].name === "choice" && formArray[i].value !== "") {
            formData.choices.push(formArray[i].value);
        }
    }
    return formData
};