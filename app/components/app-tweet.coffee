`import Ember from 'ember';`

AppTweetComponent = Ember.Component.extend
  tweet: null
  init: () ->
    @_super(arguments...)
  textTokens: Ember.computed  'componentTweet' , ->
    @get('tweet').get('text').split(' ').map (word) ->
      isHashtag = word.charAt(0) == '#'
      isUser    = word.charAt(0) == '@'
      {
        isHashtag: isHashtag
        isUser: isUser
        text: word.match(/((?:@|#){0,1}\w+|.*)/)[0] + " "
        hashtagLinkValue: word.match(/((?:@|#){0,1}\w+|.*)/)[0].slice(1)
        userLinkValue: word.match(/((?:@|#){0,1}\w+|.*)/)[0].slice(1)
      }
  funtimes: @tweetToken


`export default AppTweetComponent`
