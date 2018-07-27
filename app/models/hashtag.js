import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr(),
  tweets: DS.hasMany('tweet'),
  r: DS.attr('number', { defaultValue: 2 }),
  cx: DS.attr('number', { defaultValue: 200 }),
  cy: DS.attr('number', { defaultValue: 200 }),
  color: DS.attr('number', { defaultVAlue: 'aquamarine'})

});
