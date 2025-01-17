import { StudentDetail } from "../types";
import { capitalize } from "../utils";
import { Button } from "../components/ui/button";
import { useRef, useState } from "react";
import { singleStudentDetailsLoader } from "./SingleStudentDetails";
import { Chart } from "primereact/chart";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";

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
  loading,
}: {
  onGetAtt: (num: string) => void;
  loading: boolean;
}) {
  const [value, setValue] = useState<string>("");
  const toastRef = useRef<Toast>(null);
  return (
    <>
      <Toast ref={toastRef} />
      <form
        className="rounded-xl border-[1px] border-[#464646] p-5 flex flex-col gap-3  w-[22rem] bg-gradient-to-r to-[#374151] from-[#1f2937]"
        onSubmit={(e) => {
          console.log("sdf");
          e.preventDefault();
          if (value.length < 10) {
            toastRef.current?.show({
              severity: "error",
              summary: "Hall Ticket Number should be of 10 digits length",
            });
            return;
          }
          onGetAtt(value);
        }}
      >
        <p>Enter Hall Ticket Number: </p>
        <InputText
          className="px-2 py-1"
          disabled={loading}
          value={value}
          maxLength={10}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "loading..." : "Get Attendance"}
        </Button>
      </form>
    </>
  );
}

export default function AttendancePerformance() {
  const [details, setDetails] = useState<StudentDetail | undefined | null>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const onGetAtt = async (num: string) => {
    setLoading(true);
    const data = await singleStudentDetailsLoader({
      params: { ht_no: num },
    } as any);
    setLoading(false);
    if (!data) {
      setDetails(null);
      return;
    }
    setDetails(data);
  };
  return (
    <div className="flex items-center justify-center py-10 flex-col gap-5">
      <HallTicketInputCard onGetAtt={onGetAtt} loading={loading} />
      {details !== undefined &&
        (details === null ? (
          <Message severity="error" text="Invalid Hall Ticket Number" />
        ) : (
          <ProfileCard data={details} />
        ))}
    </div>
  );
}
