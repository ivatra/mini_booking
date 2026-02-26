const TEST_IMPORT_OVERRIDE = [
  {
    files: ["test/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
];

export default TEST_IMPORT_OVERRIDE;
