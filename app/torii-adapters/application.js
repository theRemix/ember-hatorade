import Ember from 'ember';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

var rejectPromise = function() {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    reject('no code');
  });
};

export default Ember.Object.extend({
  store: Ember.inject.service(),
  open: function(auth) {
    if (!auth.code) {
      return rejectPromise();
    }

    localStorage.token = auth.code;

    return this.get('store').find('user', 'me').then(function(user) {
      return {
        currentUser: user
      };
    });
  },

  fetch: function() {
    if (!localStorage.token) {
      return rejectPromise();
    }

    var adapter = this.container.lookup('adapter:application');
    adapter.set('headers', { 'Authorization': localStorage.token });
    
    return this.get('store').find('user', 'me').then(function(user) {
      return {
        currentUser: user
      };
    });
  },

  close: function() {
    var authToken = localStorage.token;

    localStorage.token = null;
    var adapter = this.container.lookup('adapter:application');
    adapter.set('headers', { 'Authorization': authToken });
    
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url: '/logout',
        headers: {
          'Authorization': authToken
        },
        type: 'POST',
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject)
      });
    });
  }
});
