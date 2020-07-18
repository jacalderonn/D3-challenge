let svgWidth = 960;
let svgHeight = 500;

let margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 100
};

let width = svgWidth - margin.left - margin.right
let height = svgHeight - margin.top - margin.bottom

let svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

let chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Importing data
d3.csv("assets/data/data.csv").then(data => {
    console.log(data)

    // Saving some of the data to variables for later use
    let poverty = data.map(d => +d.poverty)
    let healthcare = data.map(d => +d.healthcare)
    let abbr = data.map(d => d.abbr)

    // Creating the scale functions
    let xLiearScale = d3.scaleLinear()
            .domain([8, d3.max(poverty)+1])
            .range([0, width]);
    
    let yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(healthcare)+2])
            .range([height, 0]);

    // Creating the axis functions
    let xAxis = d3.axisBottom(xLiearScale);
    let yAxis = d3.axisLeft(yLinearScale);

    // Appeding axes to the chart
    chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
    
    chartGroup.append("g")
            .call(yAxis);

    // Creating the circles
    let circlesGroup = chartGroup.selectAll("circle")
            .append("text")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xLiearScale(+d.poverty))
            .attr("cy", d => yLinearScale(+d.healthcare))
            .attr("r", "15")
            .attr("class", "stateCircle")
            .attr("stroke-width", "1")
            .attr("stroke", "black")
        

    // Creating the labels for each circle
    let circleText = chartGroup.append("text")
                .selectAll("tspan")
                .data(data)
                .enter()
                .append("tspan")
                .attr("x", d => xLiearScale(+d.poverty))
                .attr("y", d => yLinearScale(+d.healthcare))
                .attr("dy", "0.45em")
                .attr("class", "stateText")
                .text(d => `${d.abbr}`)

    // Creating axes labels 
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        //.attr("dx", "1em")
        .attr("class", "aText")
        .text("Lack of Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "aText")
        .text("In Poverty (%)");

}).catch(function(error){console.log(error)});

