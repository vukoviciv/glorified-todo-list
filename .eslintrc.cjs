module.exports = {
  root: true,
  extends: ['@extensionengine'],
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
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  overrides: [{
    files: ['**/*.ts'],
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['./tsconfig.json']
    }
  }]
};
