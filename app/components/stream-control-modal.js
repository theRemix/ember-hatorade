import Ember from 'ember';

export default Ember.Component.extend({
  streamTerms: '#hatorade, #hatersgonnahate',
  actions:{
    updateStreamCriteria(form){
      this.set('streamTerms', form)
    },
    commitStreamChange(form) {
      debugger
      this.attrs.commitStreamChange(this.get('streamTerms').split(','))
    }
  }
});
