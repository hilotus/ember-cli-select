import Ember from 'ember';

function scroll() {
  var containerHeight = this.$('.select-picker-results').height(),
    perHeight = this.get('itemHeight'),
    index = this.get('indexOfSearchModel'),
    $item = this.$('.select-picker-results li').filter(function(i) { return i === index; });

  var itemTop = $item.position().top;
  if (itemTop === 0) {

  } else if (perHeight > containerHeight - itemTop) {  // afer down, need scroll down.
    this.$('.select-picker-results')[0].scrollTop = (index + 1) * perHeight - containerHeight;
  } else if (itemTop < 0) {  // after up, need scroll up
    this.$('.select-picker-results')[0].scrollTop = index * perHeight;
  } else {
    return true;
  }
}

export default Ember.Component.extend({
  classNameBindings: [':select-picker', 'isActive:select-picker-active'],
  attributeBindings: ['style'],

  width: "",
  itemHeight: 33,
  tabindex: '-1',

  style: Ember.computed('width', function () {
    var width;
    width = this.width.includes('%') ? this.width : this.width + "px";
    return new Ember.Handlebars.SafeString("width: " + width);
  }),

  widthChanged: Ember.observer('width', function () {
    return this.$().css({
      width: (this.width.includes('%') ? this.width : this.width + "px")
    });
  }),

  prompt: "",
  keywords: "",

  isActive: false,
  isMultiple: false,

  model: [],
  searchModel: [],
  selection: null,

  // index of searchModel
  indexOfSearchModel: -1,

  title: Ember.computed('selection', 'selection.length', function() {
    if (this.get('isMultiple')) {
      if (!this.get('selection') || this.get('selection.length') === 0) {
        return this.get('prompt');
      } else {
        return (this.get('selection').map(function(item) {
          return item.get('name');
        })).join(',');
      }
    } else {
      return !!this.get('selection.name') ? this.get('selection.name') : this.get('prompt');
    }
  }),

  keywordsChanged: Ember.observer('keywords', function () {
    var keywords = this.get('keywords');

    // We should reset indexOfSearchModel, because of the results is changed.
    this.set('indexOfSearchModel', -1);

    if (keywords) {
      return this.set('searchModel', this.get('model').filter(function (item) {
        return (item.get('name') || "").toLowerCase().indexOf(keywords.toLowerCase()) > -1;
      }));
    } else {
      return this.set('searchModel', this.get('model'));
    }
  }),

  // When model is changes. Such as refresh at post create page.
  modelChanged: Ember.observer('model.length', function () {
    this.set('searchModel', this.get('model'));
    this.rerender();
  }),

  init: function() {
    this._super();
    this.set('searchModel', this.get('model'));
  },

  didInsertElement: function () {
    Ember.$(document).bind('click', function(event) {
      if (this.$() && this.$()[0]) {
        if (!Ember.$.contains(this.$()[0], event.target)) {
          if (this.get('isActive')) {
            this.set('isActive', false);
          }
        }
      }
    }.bind(this));

    this.$('.select-picker-single').bind('keydown', function(event) {
      var keyCode = event.which || event.keyCode;
      if (keyCode === 32 || keyCode === 13) {  // space, enter
        this.send('toggle');
      } else {
        return true;
      }
      event.preventDefault();
    }.bind(this));
  },

  willDestroyElement: function () {
    Ember.$(document).unbind('click');
  },

  actions: {
    toggle: function () {
      this.set('isActive', !this.isActive);
      if (this.isActive) {
        Ember.run.schedule('afterRender', this, function() {
          // this.set('indexOfSearchModel', -1);
          this.$('.select-picker-search input').focus();
          this.$('.select-picker-results').scrollTop(this.get('indexOfSearchModel') * this.get('itemHeight'));
        });
      }
    },

    keyDownSelect: function (inputValue, event) {
      var keyCode = event.which || event.keyCode,
        index = this.get('indexOfSearchModel');

      if (keyCode === 38) {  // up
        if (index > 0) {
          this.set('indexOfSearchModel', index - 1);
          scroll.call(this);
        }
      } else if (keyCode === 40) {  // down
        if (index < this.get('searchModel.length') - 1) {
          this.set('indexOfSearchModel', index + 1);
          scroll.call(this);
        }
      } else if (keyCode === 27) {  // esc
        this.set('isActive', false);
      } else if (keyCode === 13 || keyCode === 32) {  // enter, space
        this.send('updateSelection', {item: this.get('searchModel')[index], index: index});
      } else {
        return true;
      }
      event.preventDefault();
    },

    updateSelection: function ({item, index}) {
      if (this.get('isMultiple')) {
        if (item) {
          if (this.get('selection').contains(item)) {
            this.get('selection').removeObject(item);
          } else {
            this.get('selection').pushObject(item);
          }
          this.set('indexOfSearchModel', index);
        }
      } else {
        if (this.get('selection') !== item) {
          this.set('selection', item);
        } else {
          this.set('selection', null);
        }
        this.set('indexOfSearchModel', index);
        this.send('toggle');
      }
    }
  }
});
