import { inject as service } from '@ember/service';
export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('appSession').fetch().then(function() {
      console.log('session fetched');
    }, function(x) {
      console.log('no session to fetch');
    });
  },
  actions: {
  }
})
