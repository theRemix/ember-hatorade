import Ember from 'ember';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

var rejectPromise = function() {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    reject('no code');
  });
};

export default Ember.Object.extend({
  store: service(),
  cookies: service(),
  open(auth) {
    if (!auth.code) {
      return rejectPromise();
    }

    localStorage.token = auth.code;
    let cookieService = this.get('cookies')
    cookieService.write('auth', auth.code, {domain: '.lvh.me'})
    return this.get('store').find('user', 'me').then(function(user) {
      return {
        currentUser: user
      };
    });
  },

  fetch() {
    let cookieService = this.get('cookies')
    let auth = cookieService.read('auth')
    if (!localStorage.token && !!auth) {
      localStorage.token = auth
    }
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

    let cookieService = this.get('cookies')
    cookieService.clear('currentUser')
    localStorage.token = null;
  }
});
