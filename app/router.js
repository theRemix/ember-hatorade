import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('tweets');
  this.route('home');
  this.route('stream');
  this.resource('hashtags', {path: '/hashtags'}, function() {
  });
  this.resource('hashtag', {path: 'hashtag/:text'}, function() {
  });
  this.route('about');
});

export default Router;
