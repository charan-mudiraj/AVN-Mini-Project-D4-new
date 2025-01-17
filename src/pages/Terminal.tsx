import { useEffect } from "react";
import { getQueryResults, jsonToTable } from "../utils";
import { Terminal as PRTerminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";

export default function Terminal() {
  const commandHandler = async (command: string) => {
    let response;

    if (command.toLowerCase().trim() === "clear") {
      TerminalService.emit("clear");
      return;
    }

    if (command.toLowerCase().trim() === "help") {
      TerminalService.emit(
        "response",
        jsonToTable([
          {
            command: "clear",
            description: "Clears the terminal.",
          },
          {
            command: "show project info",
            description: "Displays info about the project.",
          },
          {
            command: "show team",
            description: "Displays team members of the project.",
          },
          {
            command: "show code",
            description: "Provided links to code repositories of this Project.",
          },
          {
            command: "show stack",
            description:
              "Displays the list of web technologies used on the project.",
          },
        ])
      );
      return;
    }

    if (command.toLowerCase().trim() === "show project info") {
      TerminalService.emit(
        "response",
        <p className="text-sky-500">
          {`The Student Information Management System (SIMS) is an innovative and 
comprehensive software solution designed to streamline and enhance the 
management of student data for educational institutions. This system is 
tailored to meet the needs of administrators, educators, and support 
staff by providing a centralized platform for efficient storage, 
retrieval, and analysis of student information, academic records, 
attendance data, and related administrative tasks.`}
        </p>
      );
      return;
    }

    if (command.toLowerCase().trim() === "show team") {
      TerminalService.emit(
        "response",
        jsonToTable([
          {
            name: "Narsimha Reddy",
            ht_no: "215U1A6711",
          },
          {
            name: "Charan Midiraj",
            ht_no: "215U1A6750",
          },
          {
            name: "Akshay Kumar",
            ht_no: "215U1A6718",
          },
          {
            name: "Vijay",
            ht_no: "215U1A6715",
          },
        ])
      );
      return;
    }

    if (command.toLowerCase().trim() === "show code") {
      TerminalService.emit(
        "response",
        <>
          <a
            href="https://github.com/charan-mudiraj/AVN-Mini-Project-D4-new"
            target="_blank"
            className="hover:underline"
          >
            {"https://github.com/charan-mudiraj/AVN-Mini-Project-D4-new"}
          </a>
          <br />
          <a
            href="https://github.com/charan-mudiraj/AVN-Mini-Project-D4-Backend"
            target="_blank"
            className="hover:underline"
          >
            {"https://github.com/charan-mudiraj/AVN-Mini-Project-D4-Backend"}
          </a>
        </>
      );
      return;
    }

    if (command.toLowerCase().trim() === "show stack") {
      TerminalService.emit(
        "response",
        jsonToTable([
          {
            frontend: "ReactJS",
            backend: "NodeJS",
            hosting: "AWS EC2",
          },
          {
            frontend: "React Router",
            backend: "ExpressJS",
            hosting: "Nginx Server",
          },
          {
            frontend: "Tailwind CSS",
            backend: "mysql2",
            hosting: "",
          },
          {
            frontend: "Prime React",
            backend: "",
            hosting: "",
          },
          {
            frontend: "ChartJS",
            backend: "",
            hosting: "",
          },
        ])
      );
      return;
    }

    const results = await getQueryResults(command);

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

    if (response) TerminalService.emit("response", response);
  };
  useEffect(() => {
    TerminalService.on("command", commandHandler);

    return () => {
      TerminalService.off("command", commandHandler);
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
