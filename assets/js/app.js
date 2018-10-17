// @TODO: YOUR CODE HERE!
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

var margin = {
    top: 20, 
    bottom: 60, 
    right: 40, 
    left: 60
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter")
    .append('svg')
    .attr('height', svgHeight)
    .attr('width',svgWidth)
    .attr('class', 'chart')

var chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.csv('assets/data/data.csv').then(function(data) {
    data.forEach(d =>{
        d.income = +d.income
        d.obesity = +d.obesity
        d.abbr = d.abbr
    })
    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.income))
        .range([0, width])
    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.obesity))
        .range([height, 0])
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    chartGroup.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

    chartGroup.append('g')
        .call(yAxis);

    chartGroup.append('text')
        .attr('x', width/2-15)
        .attr('y', (height + 40))
        .text('Income')
        .attr('font-size', 30);
     
    
    chartGroup.append('text')
        .attr('transform', `rotate(-90)`)
        .attr('y', 0 - margin.left + 30)
        .attr('x', 0 -(height/2) -25)
        .text('Obesity')
        .attr('font-size', 30);
        
        
    var circleGroup = chartGroup.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.income))
        .attr('cy', d => yScale(d.obesity))
        .attr('r', 15)
        .attr('fill', 'purple')
        .attr('stroke-width', '1')
        .attr('stroke', 'black')
        .attr('opacity', 0.75);

    chartGroup.selectAll('text.stateText')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'stateText')
        .text(d => d.abbr)
        .attr('x', d => xScale(d.income))
        .attr('y', d => yScale(d.obesity)+4)

        
    })
