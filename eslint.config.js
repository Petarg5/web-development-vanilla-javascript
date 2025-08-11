export default [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "dist/**"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      semi: ["warn", "always"],
      quotes: ["warn", "double"],
      "no-unused-vars": "warn",
    },
  },
];
