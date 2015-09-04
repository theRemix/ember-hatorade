import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute,{
  model() {
    return this.infinityModel('tweet',{ perPage: 50, startingPage: 1 });
  },
  infinityModelUpdated: function(totalPages) {
    Ember.Logger.debug('updated with more items');
  },
  infinityModelLoaded: function(lastPageLoaded, totalPages, infinityModel) {
    Ember.Logger.info('no more items to load');
  },
  actions: {
    newTweet: function() {
      var fun = { tweet: { id: 420, text: "fun times", screen_name: "voodoologic", favorite_count: 99, url: "http://hatora.de", profile_image: "http://placekitten.com/90/90" } }
      var updatedInfinityModel = this.updateInfinityModel(Ember.A([ fun.tweet ]));
      console.log(updatedInfinityModel);
    }
  },
});
