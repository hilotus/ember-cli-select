import Ember from 'ember';

export default Ember.Controller.extend({
  init: function () {
    this._super.apply(this, arguments);

    this.tmpData = [
      Ember.Object.create({id: '1', name: '1'}),
      Ember.Object.create({id: '2', name: '2'}),
      Ember.Object.create({id: '3', name: '3'}),
      Ember.Object.create({id: '4', name: '4'}),
      Ember.Object.create({id: '5', name: '5'}),
      Ember.Object.create({id: '6', name: '6'}),
      Ember.Object.create({id: '7', name: '7'}),
      Ember.Object.create({id: '8', name: '8'}),
      Ember.Object.create({id: '9', name: '9'}),
      Ember.Object.create({id: '10', name: '10'}),
      Ember.Object.create({id: '11', name: '11'}),
      Ember.Object.create({id: '12', name: '12'}),
      Ember.Object.create({id: '13', name: '13'}),
      Ember.Object.create({id: '14', name: '14'}),
      Ember.Object.create({id: '15', name: '15'}),
      Ember.Object.create({id: '16', name: '16'}),
      Ember.Object.create({id: '17', name: '17'}),
      Ember.Object.create({id: '18', name: '18'}),
      Ember.Object.create({id: '19', name: '19'}),
      Ember.Object.create({id: '20', name: '20'}),
      Ember.Object.create({id: '21', name: '21'}),
      Ember.Object.create({id: '22', name: '22'}),
      Ember.Object.create({id: '23', name: '23'}),
      Ember.Object.create({id: '24', name: '24'})
    ];
  },

  data: Ember.computed('', function () {
    return this.tmpData;
  }),

  mutilSelection: Ember.computed('', function () {
    return this.tmpData.filter(function (item) {
      return item.id === '3';
    });
  }),

  selection: []
});
