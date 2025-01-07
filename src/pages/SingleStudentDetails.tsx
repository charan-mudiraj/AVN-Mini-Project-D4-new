import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import {
  capitalize,
  getQueryResults,
} from "../utils";
import { StudentDetail } from "../types";
import { Button } from "../components/ui/button";

export const singleStudentDetailsLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const { ht_no } = params;
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
  const navigate = useNavigate();
  return (
    <div className="rounded-xl  border-[1px] border-[#464646] p-5 flex flex-col gap-3  w-[22rem] bg-gradient-to-r to-[#374151] from-[#1f2937]">
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
      <Button
        onClick={() =>
          navigate(`/results/${data.ht_no}`)
        }
        className="bg-[#0d6efd] text-white hover:bg-[#224c83] hover:text-gray-300"
      >
        Show Exam Results
      </Button>
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
