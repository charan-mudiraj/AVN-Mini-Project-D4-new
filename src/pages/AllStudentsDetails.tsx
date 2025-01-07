import {
  ReactNode,
  useEffect,
  useState,
} from "react";
import { StudentDetail } from "../types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  capitalize,
  getQueryResults,
} from "../utils";
import { RadioButton } from "primereact/radiobutton";
import {
  Accordion,
  AccordionTab,
} from "primereact/accordion";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Paginator } from "primereact/paginator";

interface ColumnMeta {
  field: string;
  header: string;
}

type StudentDetailField = keyof StudentDetail;

const initVisibleColumns: StudentDetailField[] = [
  "ht_no",
  "name",
  "gender",
  "phone_no",
  "dob",
  "email_id",
  "photo",
];

const allColumns: StudentDetailField[] = [
  "ht_no",
  "name",
  "father_name",
  "college_code",
  "branch_code",
  "gender",
  "phone_no",
  "income",
  "reservation",
  "dob",
  "address",
  "landline_no",
  "moles",
  "email_id",
  "religion",
  "admission_category",
  "photo",
];

const sortableColumns: StudentDetailField[] = [
  "ht_no",
  "name",
  "gender",
  "dob",
];
const ColumnsFilter = ({
  column,
  onChange,
}: {
  column: ColumnMeta;
  onChange: (
    col: ColumnMeta,
    value: boolean
  ) => void;
}) => {
  const [value, setValue] = useState<boolean>(
    initVisibleColumns.includes(
      column.field as StudentDetailField
    )
  );
  return (
    <div
      className="flex gap-2 cursor-pointer"
      onClick={() => {
        setValue((prev) => {
          onChange(column, !prev);
          return !prev;
        });
      }}
    >
      <RadioButton checked={value} />
      <p className="whitespace-nowrap">
        {column.header}
      </p>
    </div>
  );
};

const DisabledLayer = ({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled: boolean;
}) => {
  return (
    <div className="relative">
      {disabled && (
        <div className="absolute w-full h-full z-10" />
      )}
      <div
        className={`z-0 relative`}
        style={
          {
            // opacity: disabled ? "0.5" : "1",
          }
        }
      >
        {children}
      </div>
    </div>
  );
};

export const allStudentsDetailsloader =
  async () => {
    const res = await getQueryResults(
      "SELECT COUNT(*) as total FROM ds_students"
    );
    if (res.error) {
      return 0;
    }
    return res.data[0].total;
  };

export default function AllStudentsDetails() {
  const [details, setDetails] = useState<
    StudentDetail[]
  >([]);
  const columns: ColumnMeta[] = allColumns.map(
    (key) => ({
      field: key,
      header: capitalize(key),
    })
  );
  const [visibleColumns, setVisibleColumns] =
    useState<ColumnMeta[]>(
      initVisibleColumns.map((col) => ({
        field: col,
        header: capitalize(col),
      }))
    );
  const [loading, setLoading] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] =
    useState<number>(5);
  const totalCount = useLoaderData() as number;
  const navigate = useNavigate();

  const getData = async (
    selectedCol: ColumnMeta[] = []
  ) => {
    setLoading(true);
    const res = await getQueryResults(
      `SELECT ${[
        ...visibleColumns,
        ...selectedCol,
      ]
        .map((col) => col.field)
        .join(",")} FROM ds_students LIMIT ${
        (page - 1) * pageSize
      },${pageSize}`
    );
    if (!res.error) {
      setDetails(res.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  const onChangeColumnFilter = async (
    column: ColumnMeta,
    value: boolean
  ) => {
    await getData([column]);
    setVisibleColumns((prev) => {
      let arr: ColumnMeta[];
      if (value) {
        arr = [...prev, column];
      } else {
        arr = prev.filter(
          (col) => col.field !== column.field
        );
      }
      return arr.sort((a, b) => {
        const indexA = initVisibleColumns.indexOf(
          a.field as StudentDetailField
        );
        const indexB = initVisibleColumns.indexOf(
          b.field as StudentDetailField
        );

        // If either field is not found, move that object to the end
        if (indexA === -1 && indexB === -1)
          return 0; // Both not found, keep their order
        if (indexA === -1) return 1; // a.field not found, b comes first
        if (indexB === -1) return -1; // b.field not found, a comes first

        // Both fields found, compare based on their index in fields array
        return indexA - indexB;
      });
    });
  };

  return (
    <div className="p-10">
      <div className="text-2xl text-center font-sans border-[1px] border-[#464646] rounded-xl py-2 bg-gradient-to-r from-[#374151] to-[#1f2937] mb-5">
        All Students Details
      </div>
      {details.length > 0 && (
        <DataTable
          value={details}
          stripedRows
          showGridlines
          selectionMode={"single"}
          onSelectionChange={(e) =>
            navigate(`/details/${e.value.ht_no}`)
          }
          header={
            <Accordion>
              <AccordionTab header="Filter Columns">
                <DisabledLayer disabled={loading}>
                  <div className="flex flex-wrap gap-8 w-full">
                    {columns.map((col, i) => (
                      <ColumnsFilter
                        column={col}
                        key={i}
                        onChange={
                          onChangeColumnFilter
                        }
                      />
                    ))}
                  </div>
                </DisabledLayer>
              </AccordionTab>
            </Accordion>
          }
          // paginator
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
          {visibleColumns.map((col, i) => (
            <Column
              key={i}
              header={col.header}
              sortable={sortableColumns.includes(
                col.field as StudentDetailField
              )}
              body={(rowData) => {
                const val = rowData[col.field];
                if (
                  typeof val === "string" &&
                  val.startsWith("https")
                ) {
                  return (
                    <img
                      src={val}
                      style={{
                        height: "4rem",
                        borderRadius: "6px",
                      }}
                    />
                  );
                }
                return val;
              }}
            />
          ))}
        </DataTable>
      )}
    </div>
  );
}
