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
  // nodes: [
  //   {id: "packers", fill: 'green'},
  //   {id: "vikings",  fill: 'purple'},
  //   {id: "big_bird", fill: 'yellow'}
  // ],
  nodes: [
    {id: "packers", cx: 400 , cy: 100 , r: 5, fill: 'green'},
    {id: "vikings", cx: 200 , cy: 200 , r: 15, fill: 'purple'},
    {id: "big_bird", cx: 200 , cy: 100 , r: 20, fill: 'yellow'}
  ],
  links: [
    {
      "target": 0,
      "source": 1,
      "value": 8,
      "distance": 40,
      "stroke": 'black',
      "stroke-width": 8
    }
  ],
});
