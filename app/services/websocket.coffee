`import Ember from 'ember'`

WebsocketService = Ember.Service.extend
  client: new Faye.Client('http://hatora.de:8080/faye'),

`export default WebsocketService`
