import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: [':result', 'isHighlighted:highlighted', 'isSelected:selected'],
  isMouseEnter: false,
  model: null,

  // index in parentView content
  index: 0,
  // index by keydown.
  indexOfSearchModel: -1,

  mouseEnter: function () {
    this.set('isMouseEnter', true);
  },

  mouseLeave: function () {
    this.set('isMouseEnter', false);
  },

  isHighlighted: Ember.computed('index', 'indexOfSearchModel', 'isMouseEnter', function() {
    return this.get('index') === this.get('indexOfSearchModel') || this.get('isMouseEnter');
  }),

  isSelected: Ember.computed('parentView.selection', 'parentView.selection.length', function() {
    if (this.get('parentView.isMultiple')) {
      return Ember.A(this.get('parentView.selection')).contains(this.get('model'));
    } else {
      return this.get('parentView.selection') === this.get('model');
    }
  }),

  click: function () {
    this.send('updateSelection', {item: this.get('model'), index: this.get('index')});
  },

  keyDown: function (event) {
    var keyCode = event.which || event.keyCode;
    if (keyCode === 32 || keyCode === 13) {  // space, enter
      this.send('updateSelection', {item: this.get('model'), index: this.get('index')});
    } else {
      return true;
    }
    event.preventDefault();
  }
});
