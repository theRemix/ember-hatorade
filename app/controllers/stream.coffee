`import Ember from 'ember'`

StreamController = Ember.Controller.extend
  sortProperties: ['id:dsc']
  # sortedModel: Ember.computed.sort('model', 'sortProperties')
  showStreamControlButton: true,
  websocket: Ember.inject.service(),
  init: () ->
    this._super()
    self = this

    self.get('websocket').client.subscribe '/messages', (message) ->
        data = {tweet: message}
        serializer = self.store.serializerFor('tweet')
        self.myMessageHandler(message)
      websocket = this.get('websocket')
    self.get('websocket').client.subscribe 'notification', (message) ->
      console.log(message)
  actions:
    showStreamControls: ()->
      $('#control-modal').modal("show")
      # client.publish('/commands', {commands: 'status', status: 'report status'})
      $('.stream-input').tagsinput({trimValue: true})
    commitStreamChange: ()->
      client.publish( '/commands', {command: "search",  terms: $('input.stream-input').val()});
  myMessageHandler: (data) ->
    console.log(data)
    tweet =
      id: data.id,
      text: data.text,
      screen_name: data.user.screen_name,
      favorite_count: data.favorite_count,
      url: data.url,
      created_at: data.created_at,
      profile_image: data.user.profile_image_url
    @store.pushPayload({tweets: [tweet]})
    # @store.push('tweet', {data: {tweet: tweet}})
    @.set('model', @store.peekAll('tweet').sortBy('id').reverse())

`export default StreamController`
