//      https://gionkunz.github.io/chartist-js/getting-started.html

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object. As a third parameter we pass in our custom options.
new Chartist.Line('#chart1', {
    // A labels array that can contain any sort of values
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
        [5, 2, 4, 2, 0]
    ]
}, {
    showArea: true,
    showLine: true,
    showPoint: true,
    lineSmooth: true,
    low: 0
});


// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object. As a third parameter we pass in our custom options.
new Chartist.Line('#chart2', {
    // A labels array that can contain any sort of values
    labels: ['1/10', '2/10', '3/10', '4/10', '5/10', '6/10', '7/10'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
        [34811, 0, 34103, 22039, 0, 3491, 12390]
    ]
}, {
    showArea: true,
    showLine: true,
    showPoint: true,
    lineSmooth: true,
    low: 0
});