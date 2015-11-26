`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

HashtagsRoute = Ember.Route.extend InfinityRoute,
  model: ->
    @infinityModel 'hashtag',{ perPage: 50, startingPage: 1 }

`export default HashtagsRoute`
