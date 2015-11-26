`import DS from 'ember-data'`

Hashtag = DS.Model.extend
  text: DS.attr()
  tweets: DS.hasMany('tweet')

`export default Hashtag`
