import React, { Component } from "react";
import * as d3 from "d3";

class child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  componentDidUpdate() {

    var data = this.props.data

    var margin = {top: 40, right:10, bottom:30, left:20}
    var w = 500 - margin.left - margin.right;
    var h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_2")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x_data = data.map(item => item.day);
    x_data = new Set(x_data);
    x_data = [...x_data];
    console.log(x_data);
    const x_scale = d3.scaleBand().domain(data.map(d => d.day)).range([margin.left,w]);
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class",'x_axis_g')
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));
    var newData = data.map(item => [item.day, item.tip])

    var y_data = []
    for (var i = 0; i < x_data.length; i++){
      var tipTotal = 0;
      var count = 0;
      for (var x = 0; x < newData.length; x++){
        if (x_data[i] === data[x].day){
          tipTotal += data[x].tip
          count++
        } 
      }
      tipTotal = tipTotal/count
      y_data.push([x_data[i],tipTotal])
    }
      
    console.log(y_data)

    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data, (d) => d[1])]).range([h,0]);

    container.selectAll(".y_axis_g").data([0]).join('g').attr("class",'y_axis_g')
    .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));
    
    container.selectAll("bar")
      .data(y_data)
      .join("rect")
      .style("fill", "#69b3a2")
      .attr("x", (d) => x_scale(d[0]) + 10)
      .attr("width", x_scale.bandwidth() - 20)
      .attr("y", (d) => y_scale(d[1]))
      .attr("height", (d) => h - y_scale(d[1]));

    container.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", w)
    .attr("y", h + 25)
    .text("Day");
    container.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -20)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Average Tip");
    container.append("text")
    .attr("x", (w / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Average Tip by Day");

  }
  render() {
    return <svg className="child2_svg">
      <h1>Average Tip by Day</h1>
      <g className="g_2"></g>
    </svg>
  }
}

export default child2;