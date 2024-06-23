module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['standard', 'prettier', 'plugin:jest/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
}
