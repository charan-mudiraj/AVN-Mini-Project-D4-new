import { atomStore, queryAtom } from "./atoms";
import { Query } from "./types";

export function capitalize(str: string) {
  if (!str) return str;
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_ ]([a-z])/g, (_, p1) => " " + p1.toUpperCase())
    .replace(/^([a-z])/g, (p1) => p1.toUpperCase());
}

export const getQueryResults = async (query: string) => {
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
      `${import.meta.env.VITE_API_STUDENTS}/?exec=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
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

export function jsonToTable(jsonObject: any) {
  const keys = Object.keys(jsonObject[0]);
  const rows = jsonObject.map((obj: any) =>
    keys.map((key) =>
      typeof obj[key] === "object" ? JSON.stringify(obj[key]) : String(obj[key])
    )
  );

  const columnWidths = keys.map((key, index) =>
    Math.max(key.length, ...rows.map((row: any) => row[index].length))
  );

  const createLine = (char: any, joint = "+") =>
    joint +
    columnWidths.map((width) => char.repeat(width + 2)).join(joint) +
    joint;

  const createRow = (data: any, separator = "|") =>
    separator +
    data
      .map((value: any, index: any) => ` ${value.padEnd(columnWidths[index])} `)
      .join(separator) +
    separator;

  const topLine = createLine("-");
  const header = createRow(keys);
  const separatorLine = createLine("-");
  const body = rows.map((row: any) => createRow(row)).join("\n");
  const bottomLine = createLine("-");

  return [topLine, header, separatorLine, body, bottomLine].join("\n");
}
