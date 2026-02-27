import { useState } from "react";

export const useAsyncAction = (errMsg?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (action: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : errMsg || "Ошибка операции");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute, setError };
};
