`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

UserRoute = Ember.Route.extend InfinityRoute,
  model: (params) ->
    @infinityModel 'tweet', {perPage: 50, startPage: 1, user: params.screen_name}

`export default UserRoute`
