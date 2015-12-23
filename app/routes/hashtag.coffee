`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

HashtagRoute = Ember.Route.extend InfinityRoute, 
  queryParams:
    refresh:
      refreshModel: true
  model: (params) ->
    @infinityModel 'tweet', { perPage: 50 , startPage: 1 , hashtag: params.text}

`export default HashtagRoute`
