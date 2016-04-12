# Danthes Privat pub/sub Faye wrapper
#
# @example Howto enable debug
#   Danthes.debug = true
# @example reset all internal data
#   Danthes.reset()
# @example Howto sign and subscribe on channel with callback function
#   Danthes.sign
#     server: 'faye.example.com'
#     channel: 'somechannel'
#     signature: 'dc1c71d3e959ebb6f49aa6af0c86304a0740088d'
#     timestamp: 1302306682972
#     connect: (subscription) ->
#       console.log(subscription)
#     error: (subscription, error) ->
#       console.log("error: #{error}")
`import Ember from 'ember'`
`import config from '../config/environment';`
DanthesService = Ember.Service.extend

  debug: false

  debugMessage: (message) ->
    console.log(message)

  init: ->
    @_super()

  server: config.publisherUrl

  mount:  '/faye'
  # Reset all
  #
  reset: ->
    @set 'connecting', false
    @set 'fayeClient' , null
    @set 'fayeCallbacks' , []
    @set 'subscriptions' , {}
    @set 'server' , null
    @set 'disables' , []
    @set 'connectionSettings' ,
      timeout: 120
      retry: 5
      endpoints: {}

  # Connect to faye
  faye: (self) ->
    self.get('fayeClient') || self.get('connectToFaye')(self)
    for protocal in ['long-polling']
      self.get('fayeClient').disable(protocal)
    self.get('fayeClient')
  # Faye extension for incoming and outgoing messages
  fayeExtension: (self) ->
    incoming : (message, callback) =>
      callback(message)
    outgoing : (message, callback) =>
      message.ext = {} unless message.ext?
      if message.channel == "/meta/subscribe"
        message.ext.danthes_signature = self.get("subscriptions.#{message.subscription.slice(1)}.opts.signature")
        message.ext.danthes_timestamp = self.get("subscriptions.#{message.subscription.slice(1)}.opts.timestamp")
      else
        message.ext.danthes_token = '588d158962940ed4c022ae44526889ee809343fea3cc47b5ce159940cf4c110d0f769517fc7b622c'
      callback(message)

  # Initialize Faye client
  connectToFaye: (_self) ->
    if _self.get('server') && Faye?
      _self.set('fayeClient', new Faye.Client(_self.get('server') + _self.get('mount')))
      _self.get('fayeClient').addExtension(_self.get('fayeExtension')(_self))

  # Sign to channel
  # @param [Object] options for signing
  sign: (options) ->
    @get('debugMessage')('sign to faye')
    @set('server', options.server) unless @get('server')
    @set('subscriptions', {}) unless @get('subscriptions')
    channel = options.channel
    unless @get("subscriptions.channel")?
      @set("subscriptions.#{channel}" , {})
      @set("subscriptions.#{channel}.callback" , options['callback']) if options['callback']?
      @get('activateChannel')( channel, @ )

  # Activating channel subscription
  # @param channel [String] channel name
  activateChannel: (channel, self) ->
    new Ember.RSVP.Promise (resolve, reject) ->
      return true if self.get("subscriptions.#{channel}.activated")
      self.get('request_token')().then (data) ->
        self.set("subscriptions.#{channel}.opts", {})
        self.set("subscriptions.#{channel}.opts.signature", data[channel].signature)
        self.set("subscriptions.#{channel}.opts.timestamp", data[channel].timestamp)
        subscription = self.get('faye')(self).subscribe "/" + channel, (message) ->  self.get('handleResponse')(message, channel, self)
        # subscription = self.get('faye')(self).subscribe "/" + channel, (message) ->  console.log('subscription works: ', message)
        if subscription?
          self.set("subscriptions.#{channel}.sub" , subscription)
          subscription.callback ->
            options['connect']?(subscription)
          self.get('debugMessage')("subscription for #{channel} is active now")
          subscription.errback (error) =>
            options['error']?(subscription, error)
          self.set("subscriptions.#{channel}.activated" , true)

  
  request_token: ->
    new Ember.RSVP.Promise (resolve, reject) ->
      Ember.$.ajax
        type: "GET"
        url: 'http://localhost:3000/api/v1/data'
        dataType: 'json'
        success: (data) ->
          resolve( data )
  # Handle response from Faye
  # @param [Object] message from Faye
  handleResponse: (message, channel, self) ->
    return unless self.get("subscriptions.#{channel}")?
    if callback = self.get("subscriptions.#{channel}.callback")
      callback(message, channel)

  # Disable transports
  # @param [String] name of transport

  # Subscribe to channel with callback
  # @param channel [String] Channel name
  # @param callback [Function] Callback function
  # @param options [Object] subscription callbacks options
  subscribe: (channel, callback, self ) ->
    self.get('debugMessage')("subscribing to #{channel}")
    if self.get("subscriptions.#{channel}")
      self.set("subscriptions.#{channel}.callback" , callback)
      self.get('activateChannel')(channel, self)
      # Changing callback on every call
    else
      self.get('debugMessage')("Cannot subscribe on channel '#{channel}'. You need sign to channel first.")
      return false
    true

  # Unsubscribe from channel
  # @param [String] Channel name
  # @param [Boolean] Full unsubscribe
  unsubscribe: (channel, fullUnsubscribe = false) ->
    @get('debugMessage')("unsubscribing from #{channel}")
    if @get("subscriptions.#{channel}.activated")
      @set("subscriptions.#{channel}.sub").cancel()
      if fullUnsubscribe
        @set("subscriptions.#{channel}", null)
      else
        @set("subscriptions.#{channel}.activated", null)
        @set("subscriptions.#{channel}.sub", null)

  # Unsubscribe from all channels
  unsubscribeAll: ->
    @unsubscribe(channel) for channel, _ of @subscriptions

`export default DanthesService`
