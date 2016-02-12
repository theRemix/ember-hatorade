`import DS from 'ember-data'`

TweetSerializer = DS.RESTSerializer.extend DS.EmbeddedRecordsMixin,
  attrs:
    entities:
      embedded: 'always'
      serialize: false


`export default TweetSerializer`
