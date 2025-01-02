import React, {
  useEffect,
  useState,
} from "react";
import { getQueryResults } from "../utils";
import { Terminal as PRTerminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";

export default function Terminal() {
  function jsonToTable(jsonObject: any) {
    // Extract keys (columns) and values (rows)
    const keys = Object.keys(jsonObject[0]);
    const rows = jsonObject.map((obj: any) =>
      keys.map((key) => String(obj[key]))
    );

    // Determine column widths
    const columnWidths = keys.map((key, index) =>
      Math.max(
        key.length,
        ...rows.map(
          (row: any) => row[index].length
        )
      )
    );

    // Helper function to create a line
    const createLine = (char: any, joint = "+") =>
      joint +
      columnWidths
        .map((width) => char.repeat(width + 2))
        .join(joint) +
      joint;

    // Helper function to create a row
    const createRow = (
      data: any,
      separator = "|"
    ) =>
      separator +
      data
        .map(
          (value: any, index: any) =>
            ` ${value.padEnd(
              columnWidths[index]
            )} `
        )
        .join(separator) +
      separator;

    // Build the table
    const topLine = createLine("-");
    const header = createRow(keys);
    const separatorLine = createLine("-");
    const body = rows
      .map((row: any) => createRow(row))
      .join("\n");
    const bottomLine = createLine("-");

    // Combine all parts
    const result = [
      topLine,
      header,
      separatorLine,
      body,
      bottomLine,
    ].join("\n");

    console.log(result);
    return result;
  }

  const commandHandler = async (
    command: string
  ) => {
    let response;

    if (command === "clear") {
      TerminalService.emit("clear");
      return;
    }

    const results = await getQueryResults(
      command
    );

    if (results.error) {
      response = (
        <p
          style={{
            color: "gray",
          }}
        >
          <span
            style={{
              color: "red",
              fontWeight: "bolder",
              opacity: "70%",
            }}
          >
            Error:{" "}
          </span>
          {results.error}
        </p>
      );
    } else {
      response = jsonToTable(results.data);
    }

    if (response)
      TerminalService.emit("response", response);
  };
  useEffect(() => {
    TerminalService.on("command", commandHandler);

    return () => {
      TerminalService.off(
        "command",
        commandHandler
      );
    };
  }, []);
  return (
    <div>
      <PRTerminal
        prompt="mysql>"
        className="custom-cursor"
        spellCheck={false}
        style={{
          fontFamily: "monospace",
          whiteSpace: "pre",
        }}
      />
    </div>
  );
}
