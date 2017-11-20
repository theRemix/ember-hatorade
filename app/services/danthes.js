import Service from '@ember/service';
import config from '../config/environment';

export default Service.extend({
  debug: false,
  debugMessage(message) {
    console.log(message)
  },
  init() {
    this._super()
    this.set('subscriptions', {})
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

  faye(self) {
    self.get('fayeClient') || self.connectToFaye(self)
    // self.get('fayeClient').disable('long-polling')
    return self.get('fayeClient')
  },

  fayeExtension(self) {
    return {
      incoming(message, callback) { callback(message) },
      outgoing(message, callback) {
        if(!message.ext){ message.ext = {} }
        if (message.channel == '/meta/subscribe') {
          message.ext.danthes_signature = self.get(`subscriptions.${message.subscription.slice(1)}.opts.signature`)
          message.ext.danthes_timestamp = self.get(`subscriptions.${message.subscription.slice(1)}.opts.timestamp`)
          callback(message)
        } else {
          callback(message)
        }
      }
    }
  },

  connectToFaye(self) {
    self.set('fayeClient', new Faye.Client(self.get('server') + self.get('mount')));
    self.get('fayeClient').addExtension(self.get('fayeExtension')(self));
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
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (self.get(`subscription.${channel}.activated`)){
        return true
      }
      self.request_token().then((data) => {
        self.set(`subscriptions.${channel}.opts`, {})
        self.set(`subscriptions.${channel}.opts.signature`, data[channel].signature)
        self.set(`subscriptions.${channel}.opts.timestamp`, data[channel].timestamp)
        let subscription = self.get('faye')(self).subscribe(`/${channel}`, self.get(`subscriptions.${channel}.callback`))
        subscription.callback(function(){ console.log(`connected ${channel}`)})
        subscription.errback(function(error){ console.log(`failed subscription ${error}`)})
        resolve(data);
      }, function(reason) {
        console.log(reason)
      })
    })
  },

  request_token() {
    return fetch(config.apiScheme + config.apiHost + config.apiPort + '/api/v1/data').then(function(response){ return response.json(); })
  },
});
