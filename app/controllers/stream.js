import { Promise as EmberPromise } from 'rsvp';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  sortProperties: ['id:dsc'],
  showStreamControllButton: true,
  danthes: service(),
  init(args){
    const notification = this.get('notify')
    this.get('danthes').sign(
      {
        channel: 'messages',
        callback(message){
          return new EmberPromise( function(resolve, reject) {
            console.log(message);
            resolve(message)
          }).then(function(message) {
            console.log(message);
            notification.info(message)
          });
        }
      }
    );
    this.get('danthes').sign(
      {
        channel: 'notifications',
        callback(message) {
          return new EmberPromise( function(resolve, reject) {
            console.log(message);
            resolve(message)
          }).then(function(message) {
            console.log(message);
            notification.info(message)
          });
        }
      }
    );

    this._super(args);
  },
  myMessageHandler(data) {
    tweet = {
      id: data.id,
      text: data.text,
      screen_name: data.user.screen_name,
      favorite_count: data.favorite_count,
      url: data.url,
      created_at: data.created_at,
      entities: data.entities,
      profile_image: data.user.profile_image_url
    }
    this.store.pushPayload({tweets: [tweet]});
    this.set('model', this.store.peekAll('tweet').sortBy('id').reverse())
  }

});
