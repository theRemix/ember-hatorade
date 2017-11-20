import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  init(args){
    const notification = this.get('notify')
    this.get('danthes').sign(
      {
        channel: 'messages',
        callback(message){
          return new Ember.RSVP.Promise( function(resolve, reject) {
            console.log(message);
            resolve(message)
          }).then(function(message) {
            console.log(message);
            notification.info(message)
          })
        }
      }
    );
    this.get('danthes').sign(
      {
        channel: 'notifications',
        callback(message) {
          return new Ember.RSVP.Promise( function(resolve, reject) {
            console.log(message);
            resolve(message)
          }).then(function(message) {
            console.log(message);
            notification.info(message)
          })
        }
      }
    );

    this._super(args);
  },
});
