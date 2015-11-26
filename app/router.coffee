`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType

Router.map ->
  @resource 'tweets'
  @route 'home'
  @route 'stream'
  @route 'hashtags', {path: '/hashtags'}
  @route 'about'

`export default Router`
