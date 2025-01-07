import {
  Calculator,
  ChartPie,
  SquareTerminal,
  Users,
} from "lucide-react";

export default function Home() {
  //   import "../../bootstrap.css";
  return (
    <>
      <link
        rel="stylesheet"
        href="../../bootstrap.css"
      />
      <div className="my-5">
        <div className="text-center bg-gradient-to-r from-[#374151] to-[#1f2937] shadow-xl">
          <div className="container py-5">
            <h1 className="">
              {" "}
              A Fully Functioning Students Portal
            </h1>
            <h4 className="text-gray-300">
              An Interface for Management and
              Staff to Get & Manage Student Data.
            </h4>
            <h5 className="text-gray-300">
              ***For CSE(Data Science) 2021-25
              Batch Only***
            </h5>
            <p className="col-lg-8 mx-auto fs-5 text-gray-500">
              Get the Students Data and their
              Academic Performance with our
              Interactive and User-Friendly
              Web-Site.
            </p>
            <div className="mt-3 d-inline-flex gap-2 ">
              <a
                href="/details"
                className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
              >
                Get All Students Data
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="px-5 py-5"
        id="hanging-icons"
      >
        <h2 className="pb-2 border-bottom">
          Features:
        </h2>
        <div className="row g-4 pt-4 row-cols-1 row-cols-lg-4">
          <div className="col d-flex align-items-start flex-col">
            <ChartPie
              height={"5rem"}
              width={"5rem"}
              className="p-3 border-2 border-white rounded-xl mb-3"
            />
            <div>
              <h3 className="fs-2">
                Visualized Data
              </h3>
              <p className="text-gray-300">
                Get Students Academic Performace
                in Visual Form (Charts and Graphs)
                for Comparative Data Analytics.
              </p>
              <a
                href="/results/analytics"
                className="btn btn-primary"
              >
                Analyze Data
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start flex-col">
            <Users
              height={"5rem"}
              width={"5rem"}
              className="p-3 border-2 border-white rounded-xl mb-3"
            />
            <div>
              <h3 className="fs-2">
                Students Details
              </h3>
              <p className="text-gray-300">
                Get the Paginated list table of
                students details.
              </p>
              <a
                href="/details"
                className="btn btn-primary"
              >
                Get Details
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start flex-col">
            <Calculator
              height={"5rem"}
              width={"5rem"}
              className="p-3 border-2 border-white rounded-xl mb-3"
            />
            <div>
              <h3 className="fs-2 ">
                Students Results
              </h3>
              <p className="text-gray-300">
                Getting the Paginated list table
                of students results in all
                semesters.
              </p>
              <a
                href="/results"
                className="btn btn-primary"
              >
                Get Results
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start flex-col">
            <SquareTerminal
              height={"5rem"}
              width={"5rem"}
              className="p-3 border-2 border-white rounded-xl mb-3"
            />
            <div>
              <h3 className="fs-2 ">
                Querying SQL DB (Terminal)
              </h3>
              <p className="text-gray-300">
                Interacting/Querying with the SQL
                database from the terminal built
                in frontend.
              </p>
              <a
                href="/results"
                className="btn btn-primary"
              >
                Go to Terminal
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5">
        <hr />
        <p className="text-gray-300">
          © 2021-25 AVNIET CSE-DS D4 |
          Mini-Project | 215U1A67-(11, 15, 18, 50)
        </p>
      </div>
    </>
  );
}
