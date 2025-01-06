import Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import { Button } from "./ui/button";
import { Clipboard } from "lucide-react";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function CodeViewer({
  lang,
  data,
  bg,
  copyBtn,
  noWrap,
}: {
  lang: "javascript" | "sql" | "none";
  data: string;
  bg?: boolean;
  copyBtn?: boolean;
  noWrap?: boolean;
}) {
  const toastRef = useRef<Toast>(null);
  return (
    <div className="relative">
      <pre
        className={
          bg
            ? `bg-[#0d1117] p-3 rounded-xl ${
                noWrap
                  ? "overflow-auto"
                  : "text-wrap"
              }`
            : ""
        }
        dangerouslySetInnerHTML={{
          __html:
            lang === "none"
              ? data
              : Prism.highlight(
                  data,
                  Prism.languages[lang],
                  lang
                ),
        }}
      />
      {bg && copyBtn && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            navigator.clipboard
              .writeText(data)
              .then(() => {
                toastRef.current?.show({
                  severity: "info",
                  summary:
                    "Copied to Clipboard !",
                });
              })
              .catch(() => {
                toastRef.current?.show({
                  severity: "error",
                  summary: "Failed to Copy",
                });
              });
          }}
          className="absolute z-30 top-2 right-2"
          style={{
            height: "2rem",
            width: "2rem",
          }}
        >
          <Clipboard className="p-1" />
        </Button>
      )}
      <Toast ref={toastRef} />
    </div>
  );
}
