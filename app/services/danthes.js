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
    this.activeChannel.bind(this);
    this.faye();
    this._super();
  },
  danthes_token: config.danthes_token,
  server: config.publisherUrl,
  mount: '/faye',
  reset() {
    this.set('connection', false)
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
          message.ext.danthes_token = self.danthes_token
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
    let user = options.user
    let channel = options.channel + '/' + user
    if (!this.get('subscription.channel')) {
      this.set(`subscriptions.${channel}`, {})
      this.set(`subscriptions.${channel}.callback`, options.callback)
      //this.get('activeChannel')( channel, this )
      this.get('activeChannel').bind(this)( channel, user )
    }
  },

  activeChannel(channel, user){
    self = this
    return new EmberPromise(function(resolve, reject) {
      if (self.get(`subscription.${channel}.activated`)){
        return true
      }
      self.request_token(channel, user).then((data) => {
        self.set(`subscriptions.${channel}.opts`, {})
        self.set(`subscriptions.${channel}.opts.signature`, data[channel].signature)
        self.set(`subscriptions.${channel}.opts.timestamp`, data[channel].timestamp)
        let subscription = self.get('fayeClient')
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

  request_token(channel, user) {
    let url = new URL( config.apiScheme + config.apiHost + config.apiPort + '/api/v1/subscriptions' )
    let params = {channel: channel, user: user}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url,{
      headers: {
        Accept: 'application/json',
      }
    }).then(function(response){ return response.json(); })
  },
});
