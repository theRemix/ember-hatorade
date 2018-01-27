import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr(),
  screen_name: DS.attr(),
  created_at: DS.attr('string'),
  created_at_string: Ember.computed('created_at', function(){ 
    return this.get('created_at').toUTCString()
  }),
  favorite_count: DS.attr(),
  url: DS.attr(),
  profile_image: DS.attr(),
  media_url: DS.attr(),
  entities: DS.attr(),
  mentions: DS.hasMany('user'),
  author: DS.belongsTo('user'),
  hashtags: DS.hasMany('hashtag')
});
