import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  infinity: service(),
  model() {
    return this.get('infinity').model('hashtag', { perPage: 50, startingPage: 1 })
  },
  queryParams: {
    page: {
      refreshModel: true
    }
  }

});
