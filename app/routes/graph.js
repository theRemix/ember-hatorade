import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  infinity: service(),
  setupController(controller, model) {
    controller.set('tweets', model.tweets);
    controller.set('users', model.users)
  },
  model() {
    return Ember.RSVP.hash({
      users: this.get('store').peekAll('user'),
      tweets: this.get('infinity').model('tweet', {
        perPage: 50,
        startingPage: 0
      })
    })
  }
});
