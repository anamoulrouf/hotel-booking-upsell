// eslint-config-next 16 ships native flat config — import it directly.
// (Wrapping it in FlatCompat crashes: eslintrc validation of a flat array.)
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // LLM-derived text must never bypass escaping (doc 08 §2)
      "react/no-danger": "error",
    },
  },
  { ignores: [".next/", "out/", "playwright-report/", "test-results/"] },
];

export default eslintConfig;
