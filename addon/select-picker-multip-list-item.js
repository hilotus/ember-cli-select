import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['result'],
  isFocus: false,
  content: null,

  mouseEnter: function () {
    this.set('isFocus', true);
  },

  mouseLeave: function () {
    this.set('isFocus', false);
  },

  value: Ember.computed('', {
    get: function () {
      return false;
    },

    set: function (key, newValue) {
      var selection = Ember.A(this.get('parentView.selection'));
      if (selection && this.content) {
        if (newValue) {
          if (!selection.contains(this.content)) {
            this.get('parentView.selection').pushObject(this.content);
          }
        } else {
          if (selection.contains(this.content)) {
            this.get('parentView.selection').removeObject(this.content);
          }
        }
      }
      return newValue;
    }
  }),

  didInsertElement: function () {
    return Ember.run.later(this, function () {
      var selection = this.get("parentView.selection");
      var content = this.get("content");
      if (selection && content) {
        return this.set('value', Ember.A(selection).contains(content));
      }
    }, 500);
  }
});
