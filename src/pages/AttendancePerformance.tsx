import { StudentDetail } from "../types";
import { capitalize } from "../utils";
import { Button } from "../components/ui/button";
import { useRef, useState } from "react";
import { singleStudentDetailsLoader } from "./SingleStudentDetails";
import { Chart } from "primereact/chart";

const fields: (keyof StudentDetail)[] = ["ht_no", "name"];

const ProfileCard = ({ data }: { data: StudentDetail }) => {
  const presentDays = useRef(Math.floor(Math.random() * 132) + 1);
  const presentPer = useRef(Math.floor((presentDays.current / 132) * 100));
  return (
    <div className="rounded-xl  border-[1px] border-[#464646] p-5 flex flex-col gap-3  w-[22rem] bg-gradient-to-r to-[#374151] from-[#1f2937]">
      <img
        src={data.photo}
        className="rounded-full shadow-lg h-24 w-24 self-center"
      />
      {Object.entries(data).map(([key, value], i) => {
        if (fields.includes(key as any)) {
          return (
            <div className="flex justify-between gap-3" key={i}>
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
        return null;
      })}
      <div className="flex justify-between gap-3">
        <p
          className="w-1/2 text-sm"
          style={{
            overflowWrap: "break-word",
          }}
        >
          {"Present Days"}:
        </p>
        <p
          className="w-1/2 text-sm"
          style={{
            overflowWrap: "break-word",
          }}
        >
          {presentDays.current}
        </p>
      </div>
      <div className="flex justify-between gap-3">
        <p
          className="w-1/2 text-sm"
          style={{
            overflowWrap: "break-word",
          }}
        >
          {"Absent Days"}:
        </p>
        <p
          className="w-1/2 text-sm"
          style={{
            overflowWrap: "break-word",
          }}
        >
          {132 - presentDays.current}
        </p>
      </div>
      <div className="flex justify-between gap-3">
        <p
          className="w-1/2 text-sm"
          style={{
            textWrap: "nowrap",
          }}
        >
          {"Present(%)"}:
        </p>
        <p
          className="w-1/2 text-sm"
          style={{
            overflowWrap: "break-word",
          }}
        >
          {presentPer.current}
        </p>
      </div>
      <div className="flex justify-between gap-3">
        <p
          className="w-1/2 text-sm"
          style={{
            textWrap: "nowrap",
          }}
        >
          {"Absent(%)"}:
        </p>
        <p
          className="w-1/2 text-sm"
          style={{
            overflowWrap: "break-word",
          }}
        >
          {Math.abs(100 - presentPer.current)}
        </p>
      </div>
      <Chart
        className="w-full"
        type="bar"
        data={{
          labels: ["Present", "Absent"],
          datasets: [
            {
              label: "Present",
              data: [presentPer.current, Math.abs(100 - presentPer.current)],
              backgroundColor: [
                "rgba(255, 159, 64, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: ["rgb(255, 159, 64)", "rgb(75, 192, 192)"],
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
              max: 100,
            },
            x: {
              ticks: {
                color: "white",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              color: "white",
              display: true,
            },
          },
        }}
      />
    </div>
  );
};

function HallTicketInputCard({
  onGetAtt,
}: {
  onGetAtt: (num: string) => void;
}) {
  const [value, setValue] = useState<string>("");
  return (
    <form
      className="rounded-xl border-[1px] border-[#464646] p-5 flex flex-col gap-3  w-[22rem] bg-gradient-to-r to-[#374151] from-[#1f2937]"
      onSubmit={(e) => {
        console.log("sdf");
        e.preventDefault();
        onGetAtt(value);
      }}
    >
      <p>Enter Hall Ticket Number: </p>
      <input
        className="bg-transparent border-[1px] border-white py-1 px-2 rounded-md"
        maxLength={10}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">Get Attendance</Button>
    </form>
  );
}

export default function AttendancePerformance() {
  const [details, setDetails] = useState<StudentDetail | null>(null);
  const onGetAtt = async (num: string) => {
    const data = await singleStudentDetailsLoader({
      params: { ht_no: num },
    } as any);
    setDetails(data);
  };
  return (
    <div className="flex items-center justify-center py-10 flex-col gap-5">
      <HallTicketInputCard onGetAtt={onGetAtt} />
      {details && <ProfileCard data={details} />}
    </div>
  );
}
