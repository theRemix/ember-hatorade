import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  infinity: service(),
  model(params) {
    if ((params.hashtag != null ) && (params.user != null)) {
      return this.get('infinity').model('tweet', {
        perPage: 50,
        startingPage: 1,
        hashtag: params.hashtag,
        user: params.user
      })
    } else if (params.hashtag != null ) {
      return this.get('infinity').model('tweet',{
        perPage: 50,
        startingPage: 1,
        hashtag: params.hashtag
      })
    } else if (params.user != null) {
      return this.get('infinity').model('tweet', {
        perPage: 50,
        startingPage: 1,
        user: params.user
      })
    } else {
      return this.get('infinity').model('tweet', {
        perPage: 50,
        startingPage: 1,
      })
    }
  }
});
