import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr(),
  screen_name: DS.attr(),
  created_at: DS.attr(),
  favorite_count: DS.attr,
  url: DS.attr(),
  profile_image: DS.attr(),
  hashtags: DS.hasMany('hashtag')
});
