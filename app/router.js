import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('tweets');
  this.route('home');
  this.route('stream');
  this.route('hashtags', function() {
    this.route('show', {path: '/:text'}, function() {
    });
  });
  this.route('hashtagTweets', { path: 'hashtags/:text' }, function() {
  });
  this.route('about');
});

export default Router;
