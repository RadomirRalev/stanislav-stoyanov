module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix']],
    'type-case': [2, 'always', 'lower-case'],
  },
};
