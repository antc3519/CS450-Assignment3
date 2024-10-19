import React, { Component } from "react";
import * as d3 from "d3";

class child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.data);
  }

  componentDidUpdate() {
    console.log("ComponentDidUpdates", this.props.data)

    var data = this.props.data

    var margin = {top: 40, right:10, bottom:30, left:20}
    var w = 500 - margin.left - margin.right;
    var h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_1")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x_data = data.map(item => item.total_bill)
    const x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left,w]);

    container.selectAll(".x_axis_g").data([0]).join('g').attr("class",'x_axis_g')
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    var y_data = data.map(item => item.tip)
    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h,0]);

    container.selectAll(".y_axis_g").data([0]).join('g').attr("class",'y_axis_g')
    .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

    container.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", function (d) {
      return x_scale(d.total_bill);
    })
    .attr("cy", function (d) {
      return y_scale(d.tip);
    })
    .attr("r", 3)
    .style("fill", "#69b3a2");

    container.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", w)
    .attr("y", h + 25)
    .text("Total Bill");
    container.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -20)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Tips");
    container.append("text")
    .attr("x", (w / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Total Bill vs Tips");
  }
  render() {
    return <svg className="child1_svg">
      <h1>Total Bill vs Tips</h1>
      <g className="g_1"></g>
    </svg>
  }
}

export default child1;