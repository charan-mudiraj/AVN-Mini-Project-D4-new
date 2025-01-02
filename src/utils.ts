import { atomStore, queryAtom } from "./atoms";
import { Query } from "./types";

export function capitalize(str: string) {
  if (!str) return str;
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(
      /[_ ]([a-z])/g,
      (_, p1) => " " + p1.toUpperCase()
    )
    .replace(/^([a-z])/g, (p1) =>
      p1.toUpperCase()
    );
}

export const getQueryResults = async (
  query: string
) => {
  const queryTemp: Query = {
    query,
    loading: true,
    results: [],
  };
  atomStore.set(queryAtom, queryTemp);
  let data: any[] = [];
  let error: string = "";
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_STUDENTS
      }/?exec=${query}`
    );
    const resData = (await res.json()) as any;
    if (resData.error) {
      error = resData.error;
    } else {
      data = resData;
    }
  } catch (e) {
    console.log(e);
  } finally {
    atomStore.set(queryAtom, {
      loading: false,
      query,
      results: error ? [] : data,
    });
    return { data: error ? [] : data, error };
  }
};
