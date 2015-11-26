`import Ember from 'ember'`
`import InfinityRoute from "ember-infinity/mixins/route"`

StreamRoute = Ember.Route.extend InfinityRoute,
  model: ->
    @infinityModel 'tweet',{ perPage: 50, startingPage: 1 }
  # infinityModelUpdated: (totalPages)->
  #   Ember.Logger.debug('updated with more items')
  # infinityModelLoaded: (lastPageLoaded, totalPages, infinityModel) ->
  #   Ember.Logger.info('no more items to load');
  # actions:
    # newTweet: () ->
    #   fun = { tweet: { id: 420, text: "fun times", screen_name: "voodoologic", favorite_count: 99, url: "http://hatora.de", profile_image: "http://placekitten.com/90/90" } }
    #   updatedInfinityModel = this.updateInfinityModel(Ember.A([ fun.tweet ]))
    #   console.log(updatedInfinityModel)

`export default StreamRoute`
