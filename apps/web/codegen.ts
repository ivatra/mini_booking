import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/src/graphql/schema.graphql",
  documents: ["src/**/*.ts", "src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./src/generated/graphql/": {
      preset: "client",
      config: {
        useTypeImports: true,
        skipTypename: false,
        avoidOptionals: {
          field: true,
          inputValue: false,
        },
      },
      plugins: [],
    },
  },
};

export default config;
