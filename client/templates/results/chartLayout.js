/**
 * Created by awaseem on 15-07-09.
 */

var chart;
var CHART_ID = "choices-pie-chart";

var chartOptions = {
    segmentShowStroke : false,
    responsive: true,
    percentageInnerCutout: 55
};

var generatePieGraph = function (choices, chartId, callback) {
    // generate a bar graph based on the labels and data
    // returns an instance of a chart object
    if (choices.length == 0 ) {
        return;
    }
    var data = [];

    for (var i = 0; i < choices.length; i++) {
        data.push({
            value: choices[i].hits,
            color: randomColor({
                luminosity: 'light'
            }),
            highlight:"rgba(220,220,220,0.75)",
            label: choices[i].choice
        });
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
    // update or insert new data into the bar graph
    // re-render the chart after the update is complete
    for (var i = 0; i < choices.length; i++) {
        chartObj.segments[i].value = choices[i].hits;
    }
    chartObj.update();
};

Template.chartLayout.onRendered(function() {
    var chartRendered = false;
    this.autorun(function() {
        if (!chartRendered) {
            if (chart) {
                chart.destroy();
            }
            chart = generatePieGraph(Choices.find().fetch(), CHART_ID, function() {
                chartRendered = true;
            })
        }
        else if (chartRendered) {
            updatePieGraph(Choices.find().fetch(), chart);
        }
    })
});

Template.chartLayout.onDestroyed(function () {
    if (chart) {
        chart.destroy()
    }
});