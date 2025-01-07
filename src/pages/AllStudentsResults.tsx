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
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Paginator } from "primereact/paginator";
import { Button } from "../components/ui/button";

const semestersCodes: SemesterCode[] = [
  "1-1",
  "1-2",
  "2-1",
  "2-2",
  "3-1",
];

const query = (page: number, pageSize: number) =>
  `SELECT A.htno, A.total AS cgpa, JSON_ARRAYAGG(JSON_OBJECT('semesterCode', B.semester_code, 'total', B.total, 'credits', B.credits, 'sgpa', B.cgpa)) AS semesterResults FROM results_totals A JOIN semester_results B ON A.htno = B.htno GROUP BY A.htno,A.total LIMIT ${
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
  const navigate = useNavigate();

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
    <div className="p-10">
      <div className="relative">
        <div className="text-2xl text-center font-sans border-[1px] border-[#464646] rounded-xl py-2 bg-gradient-to-r from-[#374151] to-[#1f2937] mb-5">
          All Students Results
        </div>
        <div className="absolute z-20 right-1.5 top-1.5">
          <Button
            onClick={() =>
              navigate("/results/analytics")
            }
            className="bg-[#0d6efd] text-white hover:bg-[#224c83] hover:text-gray-300"
          >
            View Analytics (Top 10)
          </Button>
        </div>
      </div>

      {results.length > 0 ? (
        <DataTable
          value={results}
          stripedRows
          selectionMode={"single"}
          onSelectionChange={(e) =>
            navigate(`/results/${e.value.htno}`)
          }
          headerColumnGroup={
            <ColumnGroup>
              <Row>
                <Column
                  header={"Ht.No."}
                  rowSpan={2}
                />
                <Column
                  header={"CGPA"}
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
        >
          <Column field={"htno"} />
          <Column field={"cgpa"} />
          {semestersCodes.map((_, i) => (
            <Column
              field={`semesterResults.${i}.sgpa`}
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
    </div>
  );
}
