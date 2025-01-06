import { useLoaderData } from "react-router-dom";
import { getQueryResults } from "../utils";
import {
  SemesterCode,
  StudentResults,
} from "../types";
import { Chart } from "primereact/chart";

export const analyticsLoader = async () => {
  const data = await getQueryResults(
    `SELECT A.htno, A.total AS cgpa, JSON_ARRAYAGG(JSON_OBJECT('semesterCode', B.semester_code, 'total', B.total, 'credits', B.credits, 'sgpa', B.cgpa, 'subjectResults', (SELECT JSON_ARRAYAGG(JSON_OBJECT('subjectCode', C.subject_code, 'subjectName', C.subject_name, 'subjectInternal', C.subject_internal, 'subjectExternal', C.subject_external, 'subjectTotal', C.subject_total, 'subjectGrade', C.subject_grade, 'subjectCredits', C.subject_credits)) FROM subject_results C WHERE C.htno = B.htno AND C.semester_code = B.semester_code))) AS semesterResults FROM results_totals A JOIN semester_results B ON A.htno = B.htno GROUP BY A.htno,A.total`
  );
  if (data.error) {
    throw new Error(data.error);
  }
  return data.data;
};

export default function Analytics() {
  const data =
    useLoaderData() as StudentResults[];
  const overallTop10 = data
    .sort(
      (res1, res2) =>
        Number(res2.cgpa) - Number(res1.cgpa)
    )
    .slice(0, 10);

  const getSemesterTop10 = (
    code: SemesterCode
  ) => {
    return data
      .sort(
        (res1, res2) =>
          Number(
            res2.semesterResults.find(
              (semRes) =>
                semRes.semesterCode === code
            )?.sgpa
          ) -
          Number(
            res1.semesterResults.find(
              (semRes) =>
                semRes.semesterCode === code
            )?.sgpa
          )
      )
      .slice(0, 10);
  };

  const sem1Top10 = getSemesterTop10("1-1");
  const sem2Top10 = getSemesterTop10("1-2");
  const sem3Top10 = getSemesterTop10("2-1");
  const sem4Top10 = getSemesterTop10("2-2");
  const sem5Top10 = getSemesterTop10("3-1");

  return (
    <div className="p-10">
      <h2>Semester Wise Top 10</h2>
      <div style={{ height: "10px" }} />
      <Chart
        className="w-full graph_container"
        type="bar"
        data={{
          labels: overallTop10.map(
            (res) => res.htno
          ),
          datasets: [
            {
              label: "CGPA",
              data: overallTop10.map(
                (res) => res.cgpa
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
          indexAxis: "y",
          scales: {
            x: {
              beginAtZero: true,
              max: 10,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Htno VS CGPA (TOP 10)",
            },
          },
        }}
      />
      <div style={{ height: "30px" }} />
      <h3>Semester Wise Top 10</h3>
      <div style={{ height: "10px" }} />
      <div className="grid-cols-2 grid gap-5">
        {[
          sem1Top10,
          sem2Top10,
          sem3Top10,
          sem4Top10,
          sem5Top10,
        ].map((top10, i) => (
          <Chart
            className="w-full graph_container"
            type="bar"
            data={{
              labels: top10.map(
                (res) => res.htno
              ),
              datasets: [
                {
                  label: "SGPA",
                  data: top10.map(
                    (res) =>
                      res.semesterResults[i].sgpa
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
              indexAxis: "y",
              scales: {
                x: {
                  beginAtZero: true,
                  max: 10,
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: `Htno VS SGPA (TOP 10) (${top10[0].semesterResults[i].semesterCode})`,
                },
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}
