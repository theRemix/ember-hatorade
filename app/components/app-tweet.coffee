`import Ember from 'ember';`

AppTweetComponent = Ember.Component.extend
  tweet: null
  init: () ->
    @_super(arguments...)
    @makeTokens()

  tweetTextTokens: []
  serializedEntities: []

  sortedEntities: ->
    @serializedEntities.sort @compareIndicies

  currentIndex: 0
  currentKey: ""
  currentText: null

  makeTokens: ->
    @tweetTextTokens = []
    @serializedEntities = []
    @generateTokens() #populates serializedEntities
    @createTokens() #populates tweetTextTokens with sreializedEntities

  generateTokens: () ->
    ['hashtags', 'user_mentions', 'urls'].forEach @normalizeEntity.bind(this)

  createTokens: ->
    @sortedEntities().forEach @pushToEndResult.bind(this)
    if @currentIndex  < @get('tweet.text').length
      @pushToken(@currentText)
    @currentText = null


  pushToEndResult: (entity, index) ->
    _currentText = @currentText || @get('tweet.text')
    prior_text  = unicodeStringUtils.substring(_currentText, 0, entity.indices[0] - this.currentIndex)
    prior_token = @convertToToken(prior_text)
    @pushToken(prior_token)
    @pushToken(entity)
    trailingText = unicodeStringUtils.substring(@get('tweet.text'), entity.indices[1], unicodeStringUtils.length(@get('tweet.text')))
    @currentText = trailingText
    @currentIndex = entity.indices[1]

  pushToken: (token) ->
    @tweetTextTokens.push(token)

  convertToToken: (text) ->
    text: text
    type: 'text'

  convertHashtagEntityToToken: (entity) ->
  compareIndicies: (a, b) ->
    a.indices[0] - b.indices[0]

  normalizeEntity: (hash_key, index, keys) ->
    @currentKey = hash_key
    @get('tweet.entities')[hash_key].forEach @processEntityKeyValues.bind(this)

  processEntityKeyValues: (entity_value, index, value_entities) ->
    @invertKey(entity_value)

  invertKey: (entity) ->
    switch @currentKey
      when 'hashtags'
        entity['isHashtag'] = true
        entity['urlText'] = entity['text']
        entity['text'] = "#" + entity['text']
        @serializedEntities.push(entity)
      when 'user_mentions'
        entity['isUser'] = true
        entity['text'] = "@" + entity['screen_name']
        entity['urlText'] = entity['screen_name']
        @serializedEntities.push(entity)
      when 'urls'
        entity['text'] = entity['display_url']
        entity['isUrl'] = true
        @serializedEntities.push(entity)

`export default AppTweetComponent`
