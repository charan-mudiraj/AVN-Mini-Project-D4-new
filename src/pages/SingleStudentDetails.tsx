import {
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import {
  capitalize,
  getQueryResults,
} from "../utils";
import { StudentDetail } from "../types";

export const singleStudentDetailsLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const { ht_no } = params;
  console.log(ht_no);
  if (!ht_no || ht_no.length !== 10) {
    throw new Error("Invalid Hall Ticket Number");
  }
  const data = await getQueryResults(
    `SELECT * FROM ds_students WHERE ht_no='${ht_no}'`
  );
  if (data.error) {
    throw new Error(data.error);
  }
  return data.data[0];
};

const ProfileCard = ({
  data,
}: {
  data: StudentDetail;
}) => {
  return (
    <div className="rounded-xl border-1 border-slate-400 p-5 flex flex-col gap-3 bg-slate-600 w-[22rem]">
      <img
        src={data.photo}
        className="rounded-full shadow-lg h-24 w-24 self-center"
      />
      {Object.entries(data).map(
        ([key, value], i) => {
          if (key === "photo") {
            return null;
          }
          return (
            <div
              className="flex justify-between gap-3"
              key={i}
            >
              <p
                className="w-1/2 text-sm"
                style={{
                  overflowWrap: "break-word",
                }}
              >
                {capitalize(key)}:
              </p>
              <p
                className="w-1/2 text-sm"
                style={{
                  overflowWrap: "break-word",
                }}
              >
                {value}
              </p>
            </div>
          );
        }
      )}
    </div>
  );
};

export default function SingleStudentDetails() {
  const data = useLoaderData() as StudentDetail;

  return (
    <div className="flex items-center justify-center py-10">
      <ProfileCard data={data} />
    </div>
  );
}
