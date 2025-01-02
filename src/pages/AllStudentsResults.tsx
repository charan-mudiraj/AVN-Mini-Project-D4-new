import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { getQueryResults } from "../utils";
import {
  SemesterCode,
  StudentResults,
} from "../types";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { useLoaderData } from "react-router-dom";
import { Paginator } from "primereact/paginator";

const semestersCodes: SemesterCode[] = [
  "1-1",
  "1-2",
  "2-1",
  "2-2",
  "3-1",
];

const query = (page: number, pageSize: number) =>
  `SELECT A.htno, A.total AS sgpa, JSON_ARRAYAGG(JSON_OBJECT('semesterCode', B.semester_code, 'total', B.total, 'credits', B.credits, 'cgpa', B.cgpa)) AS semesterResults from results_totals A JOIN semester_results B ON A.htno = B.htno GROUP BY A.htno,A.total LIMIT ${
    (page - 1) * pageSize
  }, ${pageSize}`;

export const allStudentsResultsLoader =
  async () => {
    const res = await getQueryResults(
      "SELECT COUNT(*) as total FROM results_totals"
    );
    if (res.error) {
      return 0;
    }
    return res.data[0].total;
  };
export default function AllStudentsResults() {
  const [results, setResults] = useState<
    StudentResults[]
  >([]);
  const [loading, setLoading] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] =
    useState<number>(5);
  const totalCount = useLoaderData() as number;

  const getData = async () => {
    setLoading(true);
    const res = await getQueryResults(
      query(page, pageSize)
    );
    if (!res.error) {
      setResults(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  return (
    <>
      {results.length > 0 ? (
        <DataTable
          value={results}
          stripedRows
          headerColumnGroup={
            <ColumnGroup>
              <Row>
                <Column
                  header={"Ht.No."}
                  rowSpan={2}
                />
                <Column
                  header={"SGPA"}
                  rowSpan={2}
                />
                <Column
                  header="Semester Results"
                  colSpan={semestersCodes.length}
                />
              </Row>
              <Row>
                {semestersCodes.map((code) => (
                  <Column header={code} />
                ))}
              </Row>
            </ColumnGroup>
          }
          footer={
            <Paginator
              totalRecords={totalCount}
              first={pageSize * (page - 1)}
              rows={pageSize}
              rowsPerPageOptions={[5, 10, 25, 50]}
              onPageChange={(e) => {
                setPage((e.page as number) + 1);
                setPageSize(e.rows);
              }}
              template={{
                layout:
                  "PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown",
              }}
            />
          }
          className="border-[1px] rounded-xl"
        >
          <Column field={"htno"} />
          <Column field={"sgpa"} />
          {semestersCodes.map((code, i) => (
            <Column
              field={`semesterResults.${i}.cgpa`}
              header={`Semester ${code} CGPA`}
            />
          ))}
        </DataTable>
      ) : (
        <p>
          {loading
            ? "Loading..."
            : "Failed to Fetch"}
        </p>
      )}
    </>
  );
}
