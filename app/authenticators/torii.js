import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';

const { RSVP } = Ember;
const { service } = Ember.inject;

export default Torii.extend({
  torii: Ember.inject.service(),
});
