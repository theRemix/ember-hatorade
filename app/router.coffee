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
  @route 'about'
  @route 'users'
  @route 'user',
    path: 'user/:screen_name'
  @route 'user/mentions',
    path: 'user/:screen_name/mentions'
  @route 'user/authored',
    path: 'user/:screen_name/authored'

`export default Router`
