/*
 * @Author: wanzp
 * @Date: 2023-09-25 23:41:42
 * @LastEditors: wanzp
 * @LastEditTime: 2023-09-25 23:42:11
 * @Description:
 */
// 需要安装依赖:  npm i eslint-define-config
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  /* 指定如何解析语法。*/
  parser: 'vue-eslint-parser',
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-globals
  globals: {
    Nullable: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // typescript-eslint推荐规则,
    'prettier',
    'plugin:prettier/recommended',
    'standard',
    'plugin:vue/vue3-essential',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    // 'no-undef': 'off',
    // 禁止使用 var
    'no-var': 'error',
    semi: 'off',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/html-indent': [
      'error',
      4,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    // 关闭此规则 使用 prettier 的格式化规则， 感觉prettier 更加合理，
    // 而且一起使用会有冲突
    'vue/max-attributes-per-line': ['off'],
    // 强制使用驼峰命名
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
  },
});
