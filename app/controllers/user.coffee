`import Ember from 'ember'`

UserController = Ember.Controller.extend
  authoredController: Ember.inject.controller('user/authored')
  mentionsController: Ember.inject.controller('user/mentions')
  user: Ember.computed.reads('authoredController.user') || Ember.computer.reads('mentionsController.user') 

`export default UserController`
