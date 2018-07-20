import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr(),
  screen_name: DS.attr(),
  created_at: DS.attr('string'),
  favorite_count: DS.attr(),
  url: DS.attr(),
  profile_image: DS.attr(),
  media_url: DS.attr(),
  entities: DS.attr(),
  r: DS.attr('number', { defaultValue: 10 }),
  cx: DS.attr('number', { defaultValue: 200 }),
  cy: DS.attr('number', { defaultValue: 200 }),
  mentions: DS.hasMany('user'),
  author: DS.belongsTo('user'),
  reply_to: DS.belongsTo('tweet', { inverse: null}),
  quote: DS.belongsTo('tweet', { inverse: null}),
  retweet: DS.belongsTo('tweet', { inverse: 'retweets'}),
  retweets: DS.hasMany('tweet', { inverse: 'retweet'}),
  reply: DS.belongsTo('tweet', { inverse: null}),
  hashtags: DS.hasMany('hashtag')
});
