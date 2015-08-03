import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute,{
  model() {
    return this.infinityModel('tweet',{ perPage: 50, startingPage: 1 });
  },
  actions: {
    newTweet: function() {
      var fun = { tweet: { id: 420, text: "fun times", screen_name: "voodoologic", favorite_count: 99, url: "http://hatora.de", profile_image: "http://placekitten.com/90/90" } }
      console.log(this.currentModel)
      funtimes = this.store.createRecord('tweet', fun.tweet)
      this.currentModel.unshiftObject(funtimes)
    }
  },
});
