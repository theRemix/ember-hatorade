import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceRadial,
  forceSimulation
} from 'd3-force';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

export default Controller.extend({
  init(args){
    this._super(args)
  },
  scale(){
    scaleLinear.create({domain: [0,10], range: [10,50]})
  },
  data: [
    {
      x_axis: 5,
      y_axis: 5,
      color: 'purple',
      radius: 15
    }
  ],
  nodes: [
    {id: "12", cx: 400 , cy: 100 , r: 5, fill: 'green'},
    {id: "11", cx: 200 , cy: 200 , r: 15, fill: 'purple'},
    {id: "13", cx: 200 , cy: 100 , r: 20, fill: 'yellow'}
  ],
  links: [
    {
      id: '1',
      source: "11",
      target: "12",
      value: 8,
      stroke: 'black',
      'stroke-width': 8
    },
    {
      id: '2',
      target: "11",
      source: "12",
      value: 8,
      stroke: 'black',
      'stroke-width': 8
    }
  ],
});
