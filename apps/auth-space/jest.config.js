module.exports = {
  name: 'auth-space',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/auth-space',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
