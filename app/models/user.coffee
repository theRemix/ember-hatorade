`import DS from 'ember-data'`

User = DS.Model.extend {
  screen_name: DS.attr()
  profile_image: DS.attr()
  profile_banner_url: DS.attr()
  tweets: DS.hasMany('tweet')
  hashtags: DS.hasMany('hashtag')
  details: DS.attr()
}

`export default User`
