module.exports = {
  description: 'Blueprint for ember-cli-select',

  afterInstall: function() {
    return this.addBowerPackageToProject('coreweb-css', 'git://github.com/hilotus/coreweb-css.git');
  }
};
