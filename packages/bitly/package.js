Package.describe({
  name: 'jaakko:bitly',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Bitly Package',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('bitly.js', 'server');
  api.export('Bitly');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('jaakko:bitly');
  api.addFiles('bitly-tests.js');
});
