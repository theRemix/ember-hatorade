`import DS from 'ember-data'`

Tweet = DS.Model.extend
  text: DS.attr()
  screen_name: DS.attr()
  created_at: DS.attr()
  favorite_count: DS.attr()
  url: DS.attr()
  profile_image: DS.attr()
  media_url: DS.attr()
  hashtags: DS.hasMany('hashtag')
  entities: DS.attr()

`export default Tweet`
