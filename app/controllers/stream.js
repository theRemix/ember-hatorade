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
        self.myMessageHandler(message);
      });
  },
  myMessageHandler: function(data) {
                      console.log(data);
    var tweet = { 
       id: data.id_str,
       text: data.text,
       screen_name: data.user.screen_name,
       favorite_count: data.favorite_count,
       url: data.url,
       profile_image: data.user.profile_image_url
    }
    var funtimes = this.store.push('tweet', tweet)
    // self.model.unshiftObject(funtimes)
  }


});
