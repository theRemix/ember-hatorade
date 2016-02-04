`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType

Router.map ->
  @route 'tweets'
  @route 'home'
  @route 'stream'
  @route 'hashtags'
  @route 'hashtag',
    path: 'hashtags/:text'
    queryParams: ['refresh']
  @route 'about'
  @route 'users', ->
  @route 'user',
    path: 'users/:screen_name',
    @route 'users/mentions',
      path: 'users/:screen_name/mentions'
    @route 'users/authored',
      path: 'users/:screen_name/authored'

`export default Router`
