`import Ember from 'ember';`

AppTweetComponent = Ember.Component.extend
  tweet: null
  init: () ->
    @_super(arguments...)
    @makeTokens(@tweet)

  tweetTextTokens: []
  serializedEntities: []

  sortedEntities: ->
    @serializedEntities.sort @compareIndicies

  currentIndex: 0
  currentKey: ""
  currentText: null

  makeTokens: (tweet)->
    if @tweetTextTokens.length < 1
      @generateTokens()
      @createTokens(tweet)

  generateTokens: () ->
    ['hashtags', 'user_mentions', 'urls'].forEach @normalizeEntity.bind(this)

  createTokens: (tweet)->
    debugger
    @sortedEntities().forEach @pushToEndResult.bind(this)
    if @currentIndex  < tweet.length # pushes last text token into list
      @pushToken(@currentText)
    @currentText = null # prevents new instantiations from using old data

  pushToEndResult: (entity, index) ->
    _currentText = @currentText || @tweet.get('text')
    prior_text  = _currentText.substring(0, entity.indices[0] - @currentIndex)
    prior_token = @convertToToken(prior_text)
    @pushToken(prior_token)
    @pushToken(entity)
    trailingText = @tweet.get('text').substring(entity.indices[1], @get('tweet').get('text').length)
    @currentText = trailingText
    @currentIndex = entity.indices[1]

  pushToken: (token) ->
    @tweetTextTokens.push(token)

  convertToToken: (text) ->
    text: text
    type: 'text'
    
  compareIndicies: (a, b) ->
    a.indices[0] - b.indices[0]

  entities: () ->
    entities = @get('tweet').get('entities')

  normalizeEntity: (hash_key, index, keys) ->
    @currentKey = hash_key
    @tweet.get('entities')[hash_key].forEach @processEntityKeyValues.bind(this)

  processEntityKeyValues: (entity_value, index, value_entities) ->
    @invertKey(entity_value)

  invertKey: (entity) ->
    switch @currentKey
      when 'hashtags'
        entity['isHashtag'] = true
        entity['text'] = "#" + entity['text']
        @serializedEntities.push(entity)
      when 'user_mention'
        entity['isUser'] = true
        @serializedEntities.push(entity)
      when 'urls'
        entity['isUrl'] = true
        @serializedEntities.push(entity)

`export default AppTweetComponent`
