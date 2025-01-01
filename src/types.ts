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
  aadhaar_card_no: string;
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
