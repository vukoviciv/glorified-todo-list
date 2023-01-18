module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  extends: ['@extensionengine', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'vue/component-definition-name-casing': [2, 'kebab-case'],
    'no-control-regex': 0,
    'no-unused-vars': 1,
    'vue/no-multiple-template-root': 0,
    'vue/attribute-hyphenation': [ // https://github.com/primefaces/primevue/issues/1263
      'error',
      'always',
      { ignore: ['headerClass'] }
    ]
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
};
