// @ts-check
import next from "eslint-config-next";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**"] },
  ...next,
];

export default eslintConfig;
