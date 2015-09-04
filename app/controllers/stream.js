import Ember from 'ember';

export default Ember.Controller.extend({
  sortBy: 'id',
  init: function() {
    this._super();
    self = this

    var client = new Faye.Client('http://hatora.de:8080/faye');
    var  subscription = client.subscribe('/messages', function(message) {
        var data = {tweet: message};
        var serializer = self.store.serializerFor('tweet');
        self.myMessageHandler(message);
      });
  },
  myMessageHandler: function(data) {
    console.log(data);
    var tweet = {
      tweet: {
        id: data.id,
        text: data.text,
        screen_name: data.user.screen_name,
        favorite_count: data.favorite_count,
        url: "nope",
        created_at: "nope",
        profile_image: data.user.profile_image_url
      }
    };
    self.model.unshiftObject(tweet.tweet)
  }


});
