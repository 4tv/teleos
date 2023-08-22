const {
  utils: { getPackages },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@commitlint/config-lerna-scopes');

module.exports = {
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes',
  ],
  rules: {
    'scope-enum': async (ctx) => [
      2,
      'always',
      [
        ...(await getPackages(ctx)),
        // Custom scopes
        'release',
      ],
    ],
  },
};
