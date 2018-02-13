import Ember from 'ember';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceY,
  forceX,
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
import {transition} from 'd3-transition';

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

    let circles = this.set('circles', svg.selectAll('circle'))
    debugger
      circles.data(this.get('nodes'))
      .attr("cy", 200)
      .attr("cx", 200)
      .attr("r", 50)
      .enter().append()
    let links   = svg.selectAll('line').data(this.get('links'))
    let derp = forceLink(links).distance(40).strength(2)
    let sim = forceSimulation(circles)
      .force('charge', forceManyBody().strength(20))
      // .force('x', forceX(this.get('width') / 2))
      // .force('y', forceX(this.get('height') / 2))
      .force('x', forceX(360))
      .force('y', forceX(100))
      // .force('center', forceCenter( this.get('width') / 2, this.get('height') / 2 ))
      .on('tick', ticked)
      
    function ticked(){
      console.log('tick')
        
      // links
      //   .attr('x1', function(d) { return d.source.x })
      //   .attr('y1', function(d) { return d.source.y })
      //   .attr('x2', function(d) { return d.target.x })
      //   .attr('y2', function(d) { return d.target.y })
      //   .attr('stroke-width', function(d) { return 8 })
      //   .attr('stroke', function(d) {return "black" })
      circles
        .attr('cx', function(d) { return d.x  })
        .attr('cy', function(d) { return d.y })
        .attr('r', function(d) { return d.r })
        .style('fill', function(d) { return d.fill })
    }
  },
  didRender(){
    Ember.run.scheduleOnce('render', this, this.funtimes)
  }
});
