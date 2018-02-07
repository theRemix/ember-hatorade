import Ember from 'ember';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceRadial,
  forceSimulation
} from 'd3-force';
import { 
  select,
  selectAll
} from 'd3-selection';
import {
  scaleLinear ,
  scaleOrdinal,
  schemeCategory20
} from 'd3-scale';

export default Ember.Component.extend({
  tagName: 'svg',
  elementId: 'funtimes',
  width: 720,
  height: 200,
  attributeBindings: ['width', 'height', 'border'],
  init(args) {
    this._super(args);
  },
  funtimes(){
    let svg = select('#funtimes')
    svg.style( "border", '1px solid black')

    let circles = svg.selectAll('circle').data(this.get('nodes'));
    let lines = svg.selectAll('line').data(this.get('links'))
    lines
      .attr('x1', function(d) { debugger; return 15 })
      .attr('y1', function(d) { return 15 })
      .attr('x2', function(d) { return 45 })
      .attr('y2', function(d) { return 15 })
      .attr('stroke-width', function(d) { return 8 })
      .attr('stroke', function(d) {return "black" })
    circles
      .attr('cx', function(d) { return d.cx })
      .attr('cy', function(d) { return d.cy })
      .attr('r', function(d) { return d.r })
      .style('fill', function(d) { return d.fill })
    forceSimulation(circles)
      .force('charge', forceManyBody())
      .force('link', forceLink().id( function(d) { return d.id; }))
      .force('center', forceCenter( this.get('width') / 2, this.get('height') / 2 ))
      .on('tick', this.get('ticked'))
  },
  ticked(){
    // console.log(this.nodes())
  },
  didReceiveAttrs(){
    Ember.run.scheduleOnce('render', this, this.funtimes)
  }
});
