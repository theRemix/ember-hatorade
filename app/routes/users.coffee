`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

UsersRoute = Ember.Route.extend InfinityRoute, 
  model: (params) ->
    @infinityModel 'user', {perPage: 50, startPage: 1, user: params.text, subdomain: @get('subdomain')}

`export default UsersRoute`
