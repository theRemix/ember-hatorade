import { Promise as EmberPromise } from 'rsvp';
import Service from '@ember/service';
import config from '../config/environment';

export default Service.extend({
  debug: false,
  debugMessage(message) {
    console.log(message)
  },
  init() {
    this.set('subscriptions', {});
    this.faye();
    this._super();
  },
  server: config.publisherUrl,
  mount: '/faye',
  reset() {
    this.set('connectiong', false)
    this.set('fayeClient', null)
    this.set('fayeCallbacks', [])
    this.set('subscriptions', {})
    this.set('server', null)
    this.set('disables', [])
    this.set('connectionSettings',
      {
        timeout: 120,
        retry: 5,
        endpoints: {}
      }
    )
  },

  faye() {
    return this.get('fayeClient') || this.connectToFaye()
  },

  fayeExtension() { 
    self = this
    return {
      incoming(message, callback) { callback(message) },
      outgoing(message, callback) {
        if(!message.ext){ message.ext = {} }
        if (message.channel == '/meta/subscribe') {
          message.ext.danthes_signature = self.get(`subscriptions.${message.subscription.slice(1)}.opts.signature`)
          message.ext.danthes_timestamp = self.get(`subscriptions.${message.subscription.slice(1)}.opts.timestamp`)
          callback(message)
        } else {
          message.ext.danthes_token = '588d158962940ed4c022ae44526889ee809343fea3cc47b5ce159940cf4c110d0f769517fc7b622c'
          callback(message)
        }
      }
    }
  },

  connectToFaye() {
    this.set('fayeClient', new Faye.Client(this.get('server') + this.get('mount')));
    this.get('fayeClient').addExtension(this.get('fayeExtension').bind(this)());
    return this.get('fayeClient')
  },

  sign(options) {
    this.get('debugMessage')('sign into faye')
    this.get('server') || this.set('server', options.server)
    this.get('subscriptions') || this.set('subscriptions', {})
    let channel = options.channel
    if (!this.get('subscription.channel')) {
      this.set(`subscriptions.${channel}`, {})
      this.set(`subscriptions.${channel}.callback`, options.callback)
      this.get('activeChannel')( channel, this )
    }
  },

  activeChannel(channel, self){
    return new EmberPromise(function(resolve, reject) {
      if (self.get(`subscription.${channel}.activated`)){
        return true
      }
      self.request_token().then((data) => {
        self.set(`subscriptions.${channel}.opts`, {})
        self.set(`subscriptions.${channel}.opts.signature`, data[channel].signature)
        self.set(`subscriptions.${channel}.opts.timestamp`, data[channel].timestamp)
        let subscription = self.get('fayeClient')
        console.log(subscription)
        subscription.subscribe(`/${channel}`, self.get(`subscriptions.${channel}.callback`))
        subscription.callback(function(){ console.log(`connected ${channel}`)})
        subscription.errback(function(error){ console.log(`failed subscription ${error}`)})
        self.set(`subscriptions.${channel}.activated`, true)
        resolve(data);
      }, function(reason) {
        console.log(reason)
      })
    });
  },

  request_token() {
    return fetch(config.apiScheme + config.apiHost + config.apiPort + '/api/v1/data').then(function(response){ return response.json(); })
  },
});
