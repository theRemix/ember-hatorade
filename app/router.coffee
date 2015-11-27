`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType

Router.map ->
  @route 'tweets'
  @route 'home'
  @route 'stream'
  @route 'hashtags'
  @route 'about'

`export default Router`
