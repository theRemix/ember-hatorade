import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  queryParams:{
    hashtags: {
      refereshModel: true
    },
    user: {
      refereshModel: true
    },
  },
  hashtag: null,
  user: null,
  filteredTweets: computed("hashtag", "model", function(){
    return this.get('model')
  })
});
