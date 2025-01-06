import { useEffect } from "react";
import {
  getQueryResults,
  jsonToTable,
} from "../utils";
import { Terminal as PRTerminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";

export default function Terminal() {
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
        className="custom-cursor h-full text-wrap"
        spellCheck={false}
        style={{
          fontFamily: "monospace",
          whiteSpace: "pre",
          height: "calc(100vh - 3.5rem)",
        }}
      />
    </div>
  );
}
