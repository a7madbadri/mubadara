"use client";

import useInitiatives from "@/hooks/useInitiatives";
import { Initiative } from "@/types/api/initiative";

type Props = {
  initiatives: Initiative[];
  loading: boolean;
  error: string | null;
  retry: () => void;
};

function InitiativesList({ initiatives, loading, error, retry }: Props) {
  return (
    <div className="p-3 space-y-3">
      {loading ? (
        <p>Loading initiatives</p>
      ) : error ? (
        <div>
          <p>{error}</p>
          <button onClick={retry}>Retry</button>
        </div>
      ) : initiatives.length > 0 ? (
        initiatives.map(
          ({ id, title, description, followersCount, activitiesCount }) => (
            <div
              className="border border-slate-200 p-3 rounded-md bg-white"
              key={id}
            >
              <h1 className="text-xl font-semibold">{title}</h1>
              <p>{description}</p>
              <p>Followers: {followersCount}</p>
              <p>Activities: {activitiesCount}</p>
            </div>
          ),
        )
      ) : (
        <div className="">No initiatives.</div>
      )}
    </div>
  );
}

export default InitiativesList;
