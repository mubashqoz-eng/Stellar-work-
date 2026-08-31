import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Tighten policies to prevent warning accumulation
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-function": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-unused-expressions": "error",

      // ── Accessibility (A11Y-30 #768, A11Y-31 #769) ──────────────────────
      //
      // eslint-config-next enables six jsx-a11y rules. These add the ones that
      // catch what these issues are about, so a regression fails lint rather
      // than waiting for the next manual audit.
      //
      // Severity reflects triage, not importance. A rule with no current
      // violations is an "error": it can never regress silently. A rule with
      // an existing backlog is a "warn" so the count is visible without
      // burying 57 new errors in a lint run that is already red — see
      // docs/accessibility-audit.md for the backlog and the plan to escalate
      // each of these to "error" as it reaches zero.

      // Clean today — locked at error.
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/iframe-has-title": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/scope": "error",
      "jsx-a11y/tabindex-no-positive": "error",
      "jsx-a11y/interactive-supports-focus": "error",

      // Backlog — see docs/accessibility-audit.md.
      "jsx-a11y/label-has-associated-control": "warn",   // 33
      "jsx-a11y/control-has-associated-label": [         // 11
        "warn",
        { ignoreElements: ["audio", "canvas", "embed", "input", "textarea", "tr", "video"] },
      ],
      "jsx-a11y/no-noninteractive-element-interactions": "warn", // 6
      "jsx-a11y/click-events-have-key-events": "warn",           // 3
      "jsx-a11y/no-redundant-roles": "warn",                     // 1, deliberate
      "jsx-a11y/no-noninteractive-tabindex": "warn",             // 1, deliberate
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
