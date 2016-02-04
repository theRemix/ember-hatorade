`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

UserMentionsRoute = Ember.Route.extend InfinityRoute,
  model: (params) ->
    @infinityModel 'tweet', {perPage: 50, startPage: 1, mentions: params.screen_name}

`export default UserMentionsRoute`
