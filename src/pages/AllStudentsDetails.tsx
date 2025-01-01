import React, { ReactNode, useEffect, useState } from "react";
import { SQL_DESC_QUERY, StudentDetail } from "../types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { capitalize, getQueryResults } from "../utils";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { Accordion, AccordionTab } from "primereact/accordion";
import { get } from "http";

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
  "aadhaar_card_no",
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
  onChange: (col: ColumnMeta, value: boolean) => void;
}) => {
  const [value, setValue] = useState<boolean>(
    initVisibleColumns.includes(column.field as StudentDetailField)
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
      <p className="whitespace-nowrap">{column.header}</p>
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
      {disabled && <div className="absolute w-full h-full z-10" />}
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

export default function AllStudentsDetails() {
  const [details, setDetails] = useState<StudentDetail[]>([]);
  const columns: ColumnMeta[] = allColumns.map((key) => ({
    field: key,
    header: capitalize(key),
  }));
  const [visibleColumns, setVisibleColumns] = useState<ColumnMeta[]>(
    initVisibleColumns.map((col) => ({ field: col, header: capitalize(col) }))
  );
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async (selectedCol: ColumnMeta[] = []) => {
    setLoading(true);
    try {
      const data = await getQueryResults(
        `SELECT ${[...visibleColumns, ...selectedCol]
          .map((col) => col.field)
          .join(",")} FROM ds_students`
      );
      setDetails(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeColumnFilter = async (column: ColumnMeta, value: boolean) => {
    await getData([column]);
    setVisibleColumns((prev) => {
      let arr: ColumnMeta[];
      if (value) {
        arr = [...prev, column];
      } else {
        arr = prev.filter((col) => col.field !== column.field);
      }
      return arr.sort((a, b) => {
        const indexA = initVisibleColumns.indexOf(
          a.field as StudentDetailField
        );
        const indexB = initVisibleColumns.indexOf(
          b.field as StudentDetailField
        );

        // If either field is not found, move that object to the end
        if (indexA === -1 && indexB === -1) return 0; // Both not found, keep their order
        if (indexA === -1) return 1; // a.field not found, b comes first
        if (indexB === -1) return -1; // b.field not found, a comes first

        // Both fields found, compare based on their index in fields array
        return indexA - indexB;
      });
    });
  };

  return (
    <div className="p-10">
      {details.length > 0 && (
        <DataTable
          value={details}
          stripedRows
          header={
            <Accordion>
              <AccordionTab header="Filter Columns">
                <DisabledLayer disabled={loading}>
                  <div className="flex flex-wrap gap-8 w-full">
                    {columns.map((col, i) => (
                      <ColumnsFilter
                        column={col}
                        key={i}
                        onChange={onChangeColumnFilter}
                      />
                    ))}
                  </div>
                </DisabledLayer>
              </AccordionTab>
            </Accordion>
          }
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className="border-[1px] rounded-xl"
          paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        >
          {visibleColumns.map((col, i) => (
            <Column
              key={i}
              field={col.field}
              header={col.header}
              sortable={sortableColumns.includes(
                col.field as StudentDetailField
              )}
            />
          ))}
        </DataTable>
      )}
    </div>
  );
}
