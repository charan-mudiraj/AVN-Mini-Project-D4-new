import {
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { getQueryResults } from "../utils";
import { StudentResults } from "../types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";

export const singleStudentResultLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const { ht_no } = params;
  if (!ht_no || ht_no.length !== 10) {
    throw new Error("Invalid Hall Ticket Number");
  }
  const data = await getQueryResults(
    `SELECT A.htno, A.total AS cgpa, JSON_ARRAYAGG(JSON_OBJECT('semesterCode', B.semester_code, 'total', B.total, 'credits', B.credits, 'sgpa', B.cgpa, 'subjectResults', (SELECT JSON_ARRAYAGG(JSON_OBJECT('subjectCode', C.subject_code, 'subjectName', C.subject_name, 'subjectInternal', C.subject_internal, 'subjectExternal', C.subject_external, 'subjectTotal', C.subject_total, 'subjectGrade', C.subject_grade, 'subjectCredits', C.subject_credits)) FROM subject_results C WHERE C.htno = B.htno AND C.semester_code = B.semester_code))) AS semesterResults FROM results_totals A JOIN semester_results B ON A.htno = B.htno  WHERE A.htno = '${ht_no}' GROUP BY A.htno,A.total`
  );
  if (data.error) {
    throw new Error(data.error);
  }
  return data.data[0];
};

export default function SingleStudentResult() {
  const data = useLoaderData() as StudentResults;

  return (
    <div className="space-y-10 p-10">
      {data.semesterResults.map((result, i) => (
        <DataTable
          key={i}
          header={
            <h3 style={{ textAlign: "center" }}>
              {result.semesterCode} Results
            </h3>
          }
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              SGPA: {result.sgpa}
            </div>
          }
          value={result.subjectResults}
        >
          <Column
            field="subjectCode"
            header="SUBJECT CODE"
          />
          <Column
            field="subjectName"
            header="SUBJECT NAME"
          />
          <Column
            field="subjectInternal"
            header="INTERNAL"
          />
          <Column
            field="subjectExternal"
            header="EXTERNAL"
          />
          <Column
            field="subjectTotal"
            header="TOTAL"
          />
          <Column
            field="subjectGrade"
            header="GRADE"
          />
          <Column
            field="subjectCredits"
            header="CREDITS"
          />
        </DataTable>
      ))}

      <div className="flex gap-5 graph_container bg-gradient-to-r to-[#374151] from-[#1f2937]">
        <Chart
          className="w-full"
          type="bar"
          data={{
            labels: [
              "1-1",
              "1-2",
              "2-1",
              "2-2",
              "3-1",
            ],
            datasets: [
              {
                label: "SGPA",
                data: data.semesterResults.map(
                  (res) => res.sgpa
                ),
                backgroundColor: [
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(203, 158, 190, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 159, 64)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgba(203, 158, 190)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                ticks: {
                  color: "white",
                },
                beginAtZero: true,
                max: 10,
              },
              x: {
                ticks: {
                  color: "white",
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
              title: {
                color: "white",
                display: true,
                text: "Semester VS SGPA",
              },
            },
          }}
        />

        <Chart
          type="pie"
          data={{
            labels: [
              "1-1",
              "1-2",
              "2-1",
              "2-2",
              "3-1",
            ],
            datasets: [
              {
                label: "Score",
                data: data.semesterResults.map(
                  (res) => {
                    let score = 0;
                    res.subjectResults.forEach(
                      (subRes) =>
                        (score += Number(
                          subRes.subjectTotal
                        ))
                    );
                    return score;
                  }
                ),
                backgroundColor: [
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(203, 158, 190, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 159, 64)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgba(203, 158, 190)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
              title: {
                color: "white",
                display: true,
                text: "Semester VS Score(out of 1000)",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
