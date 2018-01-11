import Route from '@ember/routing/route';
import InfinityRoute from "ember-infinity/mixins/route"

export default Route.extend( InfinityRoute, {
  model(params) {
    if ((params.hashtag != null ) && (params.user != null)) {
      return this.infinityModel('tweet', {
        perPage: 50,
        startingPage: 1,
        hashtag: params.hashtag,
        user: params.user
      })
    } else if (params.hashtag != null ) {
      return this.infinityModel('tweet',{
        perPage: 50,
        startingPage: 1,
        hashtag: params.hashtag
      })
    } else if (params.user != null) {
      return this.infinityModel('tweet', {
        perPage: 50,
        startingPage: 1,
        user: params.user
      })
    } else {
      return this.infinityModel('tweet', {
        perPage: 50,
        startingPage: 1,
      })
    }
  }
});
