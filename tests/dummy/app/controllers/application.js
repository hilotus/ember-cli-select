import Ember from 'ember';

export default Ember.Controller.extend({
  init: function () {
    this._super.apply(this, arguments);

    this.tmpData = [
      Ember.Object.create({id: '111', name: '111'}),
      Ember.Object.create({id: '222', name: '222'}),
      Ember.Object.create({id: '333', name: '333'}),
      Ember.Object.create({id: '444', name: '444'}),
      Ember.Object.create({id: '555', name: '555'}),
      Ember.Object.create({id: '666', name: '666'})
    ];
  },

  data: Ember.computed('', function () {
    return this.tmpData;
  }),

  mutilSelection: Ember.computed('', function () {
    return this.tmpData.filter(function (item) {
      return item.id === '333';
    });
  }),

  selection: []
});
