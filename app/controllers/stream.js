import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this._super();
    self = this

    var client = new Faye.Client('http://hatora.de:8080/faye');
    var  subscription = client.subscribe('/messages', function(message) {
        var data = {tweet: message}
        console.log(data.tweet);
        var serializer = self.store.serializerFor('tweet')
        tweet = serializer.normalize(data.tweet)
        self.myMessageHandler(data);
      });
  },

  myMessageHandler: function(data) {
    jQuery('body').append(data.tweet);
    this.get('model').pushObject(data);
  },

});
