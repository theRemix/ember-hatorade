import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  graphdata: service(),
  nodes: Ember.computed.alias('graphdata.nodes'),
  links: Ember.computed.alias('graphdata.links')
});
