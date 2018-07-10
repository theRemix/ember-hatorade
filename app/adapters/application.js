import DS from 'ember-data';
import config from '../config/environment';
import { computed } from '@ember/object';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend({//DataAdapterMixin,{
  namespace: 'api/v1',
  host: config.apiScheme + config.apiHost + config.apiPort,

  headers: computed('localStorage.token', function() {
    return {
      'Authorization': localStorage.token
    }
  })
});
