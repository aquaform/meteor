module.exports = {
  extends: [
    "next/core-web-vitals",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "prettier",
  ],
  plugins: ["prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "prettier/prettier": ["error"],
    "react/react-in-jsx-scope": "off",
  },
};
