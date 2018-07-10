export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('appSession').fetch().then(function() {
      console.log('session fetched');
    }, function() {
      console.log('no session to fetch');
    });
  },
})
