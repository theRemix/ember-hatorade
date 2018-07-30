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
  open(auth) {
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

  fetch() {
    if (!localStorage.token) {
      return rejectPromise();
    }

    return this.get('store').find('user', 'me').then(function(user) {
      return {
        currentUser: user
      };
    });
  },

  close() {
    var authToken = localStorage.token;

    localStorage.token = null;
  }
});
