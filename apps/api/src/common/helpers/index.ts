import dotenv from "dotenv";

const NODE_ENV = process.env["NODE_ENV"] || "production";

// Загружаем нужный файл
const envFile = NODE_ENV === "development" ? ".env.development" : ".env";
dotenv.config({ path: envFile });

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

export { getEnvVar };
