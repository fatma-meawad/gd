module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  plugins: [
    "node",
    "security",
    "babel",
    "prettier",
    "sonarjs",
    "complexity",
    "unicorn",
    "jsdoc",
  ],
  ignorePatterns: [
    "**/*.test.js", // Ignore test files
    "**/*.test.ts", // Ignore TypeScript test files
    "**/*.json", // Ignore JSON files
  ],
  rules: {
    "unicorn/consistent-function-scoping": "warn",
    "unicorn/no-array-reduce": "warn",
    "unicorn/no-nested-ternary": "warn",
    "unicorn/prefer-array-flat": "warn",
    "unicorn/prefer-spread": "warn",
    "jsdoc/check-alignment": "warn",
    "jsdoc/check-indentation": "warn",
    "jsdoc/check-syntax": "warn",
    "jsdoc/require-description": "warn",
    "jsdoc/require-jsdoc": "warn",
    "jsdoc/require-param": "warn",
    "jsdoc/require-returns": "warn",
    complexity: ["error", { max: 20 }],
    "max-depth": ["warn", { max: 4 }],
    "max-lines-per-function": ["warn", { max: 200 }],
    "max-statements": ["warn", { max: 200 }],
    "no-magic-numbers": ["warn", { ignore: [0, 1, -1] }],
    "sonarjs/cognitive-complexity": ["warn", 15],
    "sonarjs/max-switch-cases": ["warn", 10],
    "sonarjs/no-duplicate-string": ["error"],
    "sonarjs/no-identical-functions": "error",
    "sonarjs/no-collapsible-if": "error",
    "sonarjs/prefer-single-boolean-return": "warn",
    "sonarjs/no-redundant-jump": "warn", // Flags unnecessary returns
    "sonarjs/no-small-switch": "warn",
    "no-console": "warn",
    "no-unused-vars": 0,
    "prefer-const": "warn",
    "consistent-return": "error",
    camelcase: [
      "warn",
      {
        properties: "always",
        ignoreDestructuring: true,
        ignoreImports: true,
      },
    ],

    eqeqeq: "warn",
    "no-lonely-if": "warn",
    "no-else-return": "warn",
    "object-curly-spacing": ["warn", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
  },
};
