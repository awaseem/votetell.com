/**
 * Created by awaseem on 15-07-02.
 */

parseFormData = function (formArray) {
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