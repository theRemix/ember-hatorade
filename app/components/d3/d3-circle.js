import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'circle',
  attributeBindings: ['r:r', 'cx:cx', 'cy:cy'],
  r: 30
});
