import { getInitiatives } from "@/lib/api/initiatives";
import { GetInitiativeParams, Initiative } from "@/types/api/initiative";
import { useEffect, useState } from "react";

function useInitiatives({ status, location, search }: GetInitiativeParams) {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const initiative = await getInitiatives(controller.signal, {
          status,
          location,
          search,
        });
        setInitiatives(initiative);
      } catch {
        if (controller.signal.aborted) return;
        setError("Something went wrong");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [location, requestId, search, status]);

  const retry = () => {
    setRequestId((prev) => prev + 1);
  };
  return {
    initiatives,
    loading,
    error,
    retry,
  };
}

export default useInitiatives;
