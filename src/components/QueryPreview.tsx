import { useAtomValue } from "jotai";
import { queryAtom } from "../atoms";

export default function QueryPreview() {
  const query = useAtomValue(queryAtom);

  return (
    <div className="bg-red-300">
      {query?.query}
      {query?.loading && <div>Loading...</div>}
      <pre>
        {JSON.stringify(query?.results, null, 2)}
      </pre>
    </div>
  );
}
