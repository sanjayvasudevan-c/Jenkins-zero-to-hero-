export default [
  {
    ignores: [
      "node_modules/**",
      "jenkins-data/**",
      ".git/**"
    ]
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs"
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];

