module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "plugin:vue/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/name-property-casing": ["error", "kebab-case"],
    "vue/require-default-prop": ["off"],
    curly: "error"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
