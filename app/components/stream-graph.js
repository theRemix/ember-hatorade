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
  selectAll,
  mouse,
  event
} from 'd3-selection';
import {
  scaleLinear ,
  scaleOrdinal,
  schemeCategory20
} from 'd3-scale';
import {transition} from 'd3-transition';
import { inject as service } from '@ember/service';
import { drag } from 'd3-drag';

export default Ember.Component.extend({
  tagName: 'svg',
  elementId: 'funtimes',
  width: 720,
  height: 400,
  attributeBindings: ['width', 'height', 'border'],
  init(args) {
    this._super(args);
  },
  funtimes(){
    let svg = select('#funtimes')
    svg.style( "border", '1px solid black')

    let circles = svg.selectAll('circle')
    let lines   = svg.selectAll('line')
    circles.data(this.get('nodes'))
      .attr("r", 5)
      .attr("cx", this.get('width') / 2 )
      .attr("cy", this.get('height') / 2 )
      .call(drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
        .on('mouseover', () => {
          console.log( select(this).data() )
        })
    let forcecenter = forceCenter( this.get('width') / 2, this.get('height') / 2 )
    lines.data(this.get('links'))
      .on('mouseover', () => {
        console.log( select(this).data() )
      })
      // .id(function(d) { return d.id })
    let sim = forceSimulation(circles.data())
      .force('linkForce',  forceLink(lines.data()).distance(50))
      .force('charge', forceManyBody().strength(-20))
      .force('collide', forceCollide(20).strength(.07))
      .on('tick', ticked)
      //.force('radial', forceRadial(() => { return Math.sin(this.get('nodes').length) * 50 }, this.get('width') / 2, this.get('height') / 2))
      //.force('center', forcecenter)

    function ticked(){
      lines
        .attr('x1', function(d) { return d.source.x })
        .attr('y1', function(d) { return d.source.y })
        .attr('x2', function(d) { return d.target.x })
        .attr('y2', function(d) { return d.target.y })
        .attr('stroke-width', function(d) { return d.width })
        .attr('stroke-opacity', function(d) { return d.opacity })
        .attr('stroke', function(d) { return d.color })
      circles
        .attr('cx', function(d) { return d.x  })
        .attr('cy', function(d) { return d.y })
        .attr('r', function(d) { return d.r })
        .style('fill', function(d) { return d.fill })
        .attr('stroke-width', function(d) { return 1 })
        .style('stroke', function(d) { return '#117DAE' })
    }
    function dragstarted(d) {
      if (!event.active) sim.alphaTarget(0.3).restart()
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = event.x
      d.fy = event.y
    }
    function dragended(d) {
      if (!mouse.active) simulation.alphaTarget(0).restart();
      d.fx = null
      d.fy = null
    }
  },
  didRender(){
    Ember.run.scheduleOnce('render', this, this.funtimes)
  }
});
