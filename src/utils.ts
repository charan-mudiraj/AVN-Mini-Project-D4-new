import { StudentDetail } from "./types";

export function capitalize(str: string) {
  if (!str) return str;
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_ ]([a-z])/g, (_, p1) => " " + p1.toUpperCase())
    .replace(/^([a-z])/g, (p1) => p1.toUpperCase());
}

export const getQueryResults = async (query: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_STUDENTS}/?exec=${query}`
  );
  const data = (await res.json()) as any[];
  return data;
};
