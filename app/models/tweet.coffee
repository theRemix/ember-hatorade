`import DS from 'ember-data'`

Tweet = DS.Model.extend
  text: DS.attr()
  screen_name: DS.attr()
  created_at: DS.attr()
  favorite_count: DS.attr()
  url: DS.attr()
  profile_image: DS.attr()
  media_url: DS.attr()
  hashtags: DS.hasMany('hashtag')
  entities: DS.attr()
  # textTokens: () ->
  #   @makeTokens()
  #   @tweetTextTokens
  #
  # tweetTextTokens: []
  # serializedEntities: []
  #
  # sortedEntities: ->
  #   @serializedEntities.sort @compareIndicies
  #
  # currentIndex: 0
  # currentKey: ""
  # currentText: null
  #
  # makeTokens: ->
  #   debugger
  #   if @tweetTextTokens.length < 1
  #     @generateTokens() #populates sortedEntities
  #     @createTokens() #populates tweetTextTokens with sortedEntities
  #
  # generateTokens: () ->
  #   ['hashtags', 'user_mentions', 'urls'].forEach @normalizeEntity.bind(this)
  #
  # createTokens: ()->
  #   @sortedEntities().forEach @pushToEndResult.bind(this)
  #   if @currentIndex < @get('text').length # pushes last text token into list
  #     @pushToken(@currentText)
  #   @currentText = null # prevents new instantiations from using old data
  #
  # pushToEndResult: (entity, index) ->
  #   _currentText = @currentText || @get('text')
  #   prior_text  = _currentText.substring(0, entity.indices[0] - @currentIndex)
  #   prior_token = @convertToToken(prior_text)
  #   @pushToken(prior_token)
  #   @pushToken(entity)
  #   trailingText = @get('text').substring(entity.indices[1], @get('text').length)
  #   @currentText = trailingText
  #   @currentIndex = entity.indices[1]
  #
  # pushToken: (token) ->
  #   @tweetTextTokens.push(token)
  #
  # convertToToken: (text) ->
  #   text: text
  #   type: 'text'
  #   
  # compareIndicies: (a, b) ->
  #   a.indices[0] - b.indices[0]
  #
  # normalizeEntity: (hash_key, index, keys) ->
  #   @currentKey = hash_key
  #   @get('entities')[hash_key].forEach @processEntityKeyValues.bind(this)
  #
  # processEntityKeyValues: (entity_value, index, value_entities) ->
  #   @invertKey(entity_value)
  #
  # invertKey: (entity) ->
  #   switch @currentKey
  #     when 'hashtags'
  #       entity['isHashtag'] = true
  #       entity['text'] = "#" + entity['text']
  #       @serializedEntities.push(entity)
  #     when 'user_mention'
  #       entity['isUser'] = true
  #       @serializedEntities.push(entity)
  #     when 'urls'
  #       entity['isUrl'] = true
  #       @serializedEntities.push(entity)
  #
  #
`export default Tweet`
