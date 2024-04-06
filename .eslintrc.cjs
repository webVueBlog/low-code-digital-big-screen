module.exports = {
  root: true,// 告诉 ESLint 忽略此文件夹下的所有子目录
  env: { browser: true, es2020: true },// 指定环境的全局变量
  extends: [
    'eslint:recommended',// 使用 ESLint 的推荐规则
    'plugin:@typescript-eslint/recommended',// 使用 @typescript-eslint/eslint-plugin 的推荐规则
    'plugin:react-hooks/recommended',// 使用 react-hooks/eslint-plugin 的推荐规则
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],// 忽略 dist 文件夹和 .eslintrc.cjs 文件
  parser: '@typescript-eslint/parser',// 使用 @typescript-eslint/parser 作为解析器
  plugins: ['react-refresh'],// 启用 react-refresh/babel 插件
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },// 允许导出常量组件
    ],
    "@typescript-eslint/no-explicit-any": "off",// 关闭 @typescript-eslint/no-explicit-any 规则 no-explicit-any 规则禁止使用 any 类型，但允许使用 any 类型
  },
}
