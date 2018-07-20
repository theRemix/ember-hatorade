import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller, model) {
    controller.set('tweets', model.tweets);
    controller.set('users', model.users)
  },
  model() {
    return Ember.RSVP.hash({
      users: this.get('store').peekAll('user'),
      tweets: this.get('store').peekAll('tweet')
    })
  }
});
