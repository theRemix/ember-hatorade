export default Ember.Controller.extend({
  init: function() {
    this._super();
    self = this
    var client = new Faye.Client('http://hatora.de:8080/faye');
    var  subscription = client.subscribe('/messages', function(message) {
        var data = {tweet: message}
        console.log(data.tweet);
        self.myMessageHandler(data);
      });
 },

  myMessageHandler: function(event) {
    console.log('Message: ' + event.data);
  },

  actions: {
    sendButtonPressed: function() {
    }
  }
});
