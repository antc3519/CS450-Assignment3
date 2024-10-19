import React, { Component } from 'react';
import "./App.css";
import Child1 from './js/child1';
import Child2 from './js/child2';
import tips from './tips.csv'
import * as d3 from 'd3'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {data:[]};
  }
  componentDidMount() {
    var self = this
    d3.csv(tips, function(d){
      return {
        tip:parseFloat(d.tip),
        total_bill:parseFloat(d.total_bill),
        day:d.day
      }
    }).then(function(csv_data){
      self.setState({data:csv_data})
    })
    .catch(function(err){
      console.log(err)
    })
  }
  render() {
    return <div className='parent'>
      <div className='child1'><Child1 data={this.state.data}></Child1></div>
      <div className='child2'><Child2 data={this.state.data}></Child2></div>
    </div>
  }
}
export default App;