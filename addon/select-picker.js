import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [":select-picker", "isActive:select-picker-active"],
  attributeBindings: ['style'],

  isActive: false,
  width: "",

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
  content: [],
  isMultiple: false,
  keywords: "",
  searchContent: [],
  selection: [],

  title: Ember.computed('selection.id', 'selection.length', function () {
    if (this.isMultiple) {
      if (!this.selection || this.get('selection.length') === 0) {
        return this.prompt;
      } else {
        return (Ember.A(this.selection).map(function (item) {
          return item.get('name');
        })).join(',');
      }
    } else {
      var name = this.get('selection.name');
      if (name) {
        return name;
      } else {
        return this.prompt;
      }
    }
  }),

  keywordsChanged: Ember.observer('keywords', function () {
    var keywords = this.keywords;
    if (keywords) {
      return this.set('searchContent', this.content.filter(function (item) {
        return (item.get('name') || "").toLowerCase().indexOf(keywords.toLowerCase()) > -1;
      }));
    } else {
      return this.set('searchContent', this.content);
    }
  }),

  init: function() {
    this._super();
    this.set('searchContent', this.content);
  },

  contentChanged: Ember.observer('content.length', function () {
    this.set('searchContent', this.content);
    this.rerender();
  }),

  didInsertElement: function() {
    return Ember.run.schedule('afterRender', this, function () {
      return Ember.$(document).on('click', function (event) {
        if (!Ember.$.contains(this.$()[0], event.target)) {
          if (this.get('isActive')) {
            this.set('isActive', false);
          }
        }
      }.bind(this));
    });
  },

  actions: {
    toggle: function() {
      this.set('isActive', !this.isActive);
      if (this.isActive) {
        this.$('.select-picker-search input').focus();
      }
    }
  }
});
