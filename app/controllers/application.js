export default Ember.Controller.extend({
  init: function() {
  },

  myMessageHandler: function(event) {
    console.log('Message: ' + event.data);
    this.set('message',event.data);
  },

  actions: {
    sendButtonPressed: function() {
      var socket = this.get('websockets').socketFor('ws://localhost:7000/');
      socket.send('Hello Websocket World');
    }
  }
});
