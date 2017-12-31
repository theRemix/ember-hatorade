import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  hashtag: '',
  filtered_tweets: computed('tweet.@each.hashtags', 'target', function(){
    if(this.get('hashtag') == '') {
      this.get('tweets');
    } else {
      this.get('tweets').filterBy('hashtag', this.get('target'));
    }
  })
});
