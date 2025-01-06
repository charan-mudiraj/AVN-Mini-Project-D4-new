export interface StudentDetail {
  ht_no: string;
  name: string;
  father_name: string;
  college_code: string;
  branch_code: number;
  gender: string;
  phone_no: number;
  income: number;
  reservation: string;
  dob: string;
  address: string;
  landline_no: number;
  moles: string;
  email_id: string;
  religion: string;
  admission_category: string;
  photo: string;
}

export interface SQL_DESC_QUERY {
  Field: string;
  Type: string;
  Null: string;
  Key: string;
  Default: string;
  Extra: string;
}

export type SemesterCode =
  | "1-1"
  | "1-2"
  | "2-1"
  | "2-2"
  | "3-1"
  | "3-2"
  | "4-1"
  | "4-2";

export interface StudentResults {
  htno: string;
  cgpa: string;
  semesterResults: {
    semesterCode: SemesterCode;
    sgpa: string;
    total: string;
    credits: string;
    subjectResults: {
      subjectCode: string;
      subjectName: string;
      subjectInternal: string;
      subjectExternal: string;
      subjectTotal: string;
      subjectGrade: string;
      subjectCredits: string;
    }[];
  }[];
}

export interface Query {
  query: string;
  loading: boolean;
  results: any[];
}
