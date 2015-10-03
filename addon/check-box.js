import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':check-box', 'isEnabled:enabled:disabled', 'value:selected', 'isFocus:focus'],
  isEnabled: true,
  isFocus: false,
  value: false,
  text: "",

  toggleOnValue: true,
  toggleOffValue: false,

  __toggleValue: function() {
    var isOn;
    isOn = this.value === this.toggleOnValue;
    this.set('value', isOn ? this.toggleOffValue : this.toggleOnValue);
  },

  click: function() {
    if (!this.isEnabled) {
      return false;
    }
    this.__toggleValue();
  },

  focusIn: function() {
    if (this.isEnabled) {
      this.set('isFocus', true);
    }
  },

  focusOut: function() {
    if (this.isEnabled) {
      this.set('isFocus', false);
    }
  },

  keyDown: function(event) {
    if (!this.isEnabled) {
      return false;
    }
    if (event.which === 13 || event.which === 32) {
      this.__toggleValue();
    }
  }
});
