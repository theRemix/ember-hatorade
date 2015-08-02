import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('tweet');
  },
  actions: {
    newTweet: function() {
      var fun = { tweet: { id: 420, text: "fun times", screen_name: "voodoologic", favorite_count: 99, url: "http://hatora.de", profile_image: "http://placekitten.com/90/90" } }
      console.log(this.currentModel)
      funtimes = this.store.createRecord('tweet', fun.tweet)
      this.currentModel.pushObject(funtimes)
    }
  },
});
