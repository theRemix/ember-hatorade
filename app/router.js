import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tweets');
  this.route('home');
  this.route('stream');
  this.route('hashtags');
  this.route('hashtag', { path: 'hashtags/:text' });
  this.route('about')
  this.route('users')
  this.route('user', { path: 'user/:screen_name' }, function() {
    this.route('authored');
    this.route('mentions');
  });
  this.route('user/mentionds', { path: 'user/:screen_name/mentions' });
  this.route('user/authored', { path: 'user/:screen_name/authored' });
});

export default Router;
