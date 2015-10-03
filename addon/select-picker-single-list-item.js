import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: [':result', ':not-multiple', 'isMouseEnter:highlighted', 'isSelected:selected'],
  isMouseEnter: false,
  content: null,

  mouseEnter: function () {
    this.set('isMouseEnter', true);
  },

  mouseLeave: function () {
    this.set('isMouseEnter', false);
  },

  isSelected: Ember.computed('parentView.selection.id', function () {
    return this.content && this.get('content.id') === this.get('parentView.selection.id');
  }),

  click: function () {
    this.set('parentView.isActive', false);
    this.set('parentView.selection', this.get('isSelected') ? null : this.content);
  }
});
