/**
 * Created by awaseem on 15-07-09.
 */

var chart;

var CHART_ID = "choices-pie-chart";

var chartColors = CHART_CHOICE_COLORS;

var chartOptions = {
    segmentShowStroke : false,
    responsive: true,
    percentageInnerCutout: 55
};

var generatePieGraph = function (choices, chartId, callback) {
    // generate a pie graph based on the labels and data
    // returns an instance of a chart object
    if (choices.length == 0 ) {
        return;
    }
    var data = [];

    for (var i = 0; i < choices.length; i++) {
        var chartData = {
            label: choices[i].choice,
            highlight:"rgba(220,220,220,0.75)",
            value: choices[i].hits
        };
        if (typeof chartColors[i] === 'undefined') {
            chartData.color = "black";
        }
        else {
            chartData.color = chartColors[i];
        }
        data.push(chartData);
    }

    var ctx = $("#" + chartId).get(0).getContext("2d");
    var chart = new Chart(ctx).Doughnut(data,chartOptions);
    // callback function to call right after the chart has rendered
    if (typeof callback === "function") {
        callback();
    }
    return chart;
};

var updatePieGraph = function (choices, chartObj) {
    // update or insert new data into the pie graph
    // re-render the chart after the update is complete
    for (var i = 0; i < choices.length; i++) {
        chartObj.segments[i].value = choices[i].hits;
    }
    chartObj.update();
};

var doChoicesHaveVotes = function (choices) {
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].hits != 0 ) {
            return true
        }
    }
    return false;
};

Template.chartLayout.onRendered(function() {
    var chartRendered = false;
    this.autorun(function() {
        var choices = Choices.find().fetch();
        if (!doChoicesHaveVotes(choices)) {
            // TODO handle zero votes for pie chart
            return;
        }
        if (!chartRendered) {
            if (chart) {
                chart.destroy();
            }
            chart = generatePieGraph(choices, CHART_ID, function() {
                chartRendered = true;
            })
        }
        else if (chartRendered) {
            updatePieGraph(choices, chart);
        }
    })
});

Template.chartLayout.onDestroyed(function () {
    if (chart) {
        chart.destroy()
    }
});