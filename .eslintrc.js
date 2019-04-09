module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb'
  ],
  rules: {
    'vue/attributes-order': "off",
    'no-param-reassign': "off",
    'vue/attribute-hyphenation': [0, 'always' | 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'never']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
