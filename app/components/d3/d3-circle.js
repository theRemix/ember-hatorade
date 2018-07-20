import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['getR:r', 'getCx:cx', 'getCy:cy'],
  tagName: 'circle',
  getR()  { return this.attrs.node.r },
  getCx() { return this.attrs.node.cx },
  getCy() { return this.attrs.node.cy }
});
