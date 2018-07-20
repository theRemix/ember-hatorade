import DS from 'ember-data';

export default DS.Model.extend({
  screen_name: DS.attr(),
  profile_image: DS.attr(),
  profile_banner_url: DS.attr(),
  hashtags: DS.hasMany('hashtag'),
  details: DS.attr(),
  r: DS.attr('number', { defaultValue: 5 }),
  cx: DS.attr('number', { defaultValue: 200 }),
  cy: DS.attr('number', { defaultValue: 200 }),
});
