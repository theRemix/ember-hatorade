import Component from '@ember/component';

export default Component.extend({
  appTitle: 'HATORA.DE',
  actions: {
    toggleStreamModal() {
      this.attrs.toggleStreamModal.update(true);
    }
  }
});
