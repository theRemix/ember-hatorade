`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

HashtagRoute = Ember.Route.extend InfinityRoute, 
  queryParams:
    refresh:
      refreshModel: true
  model: (params) ->
    @store.queryRecord('hashtag', text: params.text)
  afterModel: (model, transition) ->
    this.set('tweets', Ember.RSVP.hash(tweets: model.get('tweets')))

`export default HashtagRoute`
