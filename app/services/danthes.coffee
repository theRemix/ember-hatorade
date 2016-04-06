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
DanthesService = Ember.Service.extend

  debug: false

  debugMessage: (message) ->
    console.log(message)

  init: ->
    @_super()

  # Reset all
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
  faye: Ember.computed (callback) ->
    if @get('fayeClient')?
      @get('debugMessage')('faye already inited')
    else
      @get('connectToFaye')(this)
    @get('fayeClient')

  # Faye extension for incoming and outgoing messages
  fayeExtension:
    incoming : (message, callback) =>
      @get('debugMessage')("incomming message #{JSON.stringify(message)}")
      callback(message)
    outgoing : (message, callback) =>
      @get('debugMessage')("outgoing message #{JSON.stringify(message)}")
      if message.channel == "/meta/subscribe"
        subscription = @get('subscriptions')[message.subscription]['opts']
        # Attach the signature and timestamp to subscription messages
        message.ext = {} unless message.ext?
        message.ext.danthes_signature = subscription.signature
        message.ext.danthes_timestamp = subscription.timestamp
      callback(message)

  # Initialize Faye client
  connectToFaye: (_self) ->
    if _self.get('server') && Faye?
      _self.get('debugMessage')('trying to connect faye')
      debugger
      _self.set('fayeClient', new Faye.Client(_self.get('server')))
      _self.get('fayeClient').addExtension(_self.get('fayeExtension'))
      # @get('fayeClient').disable(key) for key in @get('disables')
      # Disable any features what we want
      _self.get('debugMessage')('faye connected')
      # debugger
      # @get(callback)(@get('fayeClient')) for callback in @get('fayeCallbacks')

  # Sign to channel
  # @param [Object] options for signing
  sign: (options) ->
    @get('debugMessage')('sign to faye')
    @set('server', options.server) unless @get('server')
    @set('subscriptions', {})
    channel = options.channel
    console.log "channel: " , channel
    unless @get("subscriptions.channel")?
      @set("subscriptions.#{channel}" , {})
      @set("subscriptions.#{channel}.callback" , options['callback']) if options['callback']?
      @set("subscriptions.#{channel}.opts", {signature: options['signature'], timestamp: options['timestamp']})
      # If we have 'connect' or 'error' option then force channel activation
      # if options['connect']? || options['error']?
      #   @get('activateChannel')( channel, options )
    @get('faye')

  # Activating channel subscription
  # @param channel [String] channel name
  activateChannel: Ember.computed (channel, options = {}) ->
    return true if @get("subscriptions.#{options.channel}.activated")
    subscription = @get('faye').subscribe channel, (message) -> @get('handleResponse')(message)
    if subscription?
      @set("subscriptions#{channel}.sub" , subscription)
      subscription.callback ->
        options['connect']?(subscription)
      @get('debugMessage')("subscription for #{channel} is active now")
      subscription.errback (error) =>
        options['error']?(subscription, error)
      @get('debugMessage')("error for #{channel}: #{error.message}")
      @set("subscriptions.#{channel}.activated" , true)

  # Handle response from Faye
  # @param [Object] message from Faye
  handleResponse: Ember.computed (message) ->
    if message.eval
      eval(message.eval)
    channel = message.channel
    return unless @get("subscriptions.#{channel}")?
    if callback = @get("subscriptions.#{channel}.callback")
      callback(message.data, channel)

  # Disable transports
  # @param [String] name of transport

  # Subscribe to channel with callback
  # @param channel [String] Channel name
  # @param callback [Function] Callback function
  # @param options [Object] subscription callbacks options
  subscribe: (channel, callback, options = {}) ->
    @get('debugMessage')("subscribing to #{channel}")
    if @get("subscriptions.#{channel}")
      @get('activateChannel')(channel, options)
      # Changing callback on every call
      @set("subscriptions.#{channel}.callback" , callback)
    else
      @get('debugMessage')("Cannot subscribe on channel '#{channel}'. You need sign to channel first.")
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
