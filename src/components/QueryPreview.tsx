import { useAtomValue } from "jotai";
import { queryAtom } from "../atoms";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Button } from "./ui/button";
import { Code } from "lucide-react";
import CodeViewer from "./CodeViewer";
import { useLocation } from "react-router-dom";
import { jsonToTable } from "../utils";

export default function QueryPreview() {
  const query = useAtomValue(queryAtom);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const location = useLocation();
  const showBtn =
    location.pathname !== "/" &&
    location.pathname !== "/terminal" &&
    location.pathname !== "/attendance";

  return (
    <>
      <Sidebar
        visible={showSidebar}
        position="bottom"
        style={{
          height: "300px",
        }}
        header={""}
        onHide={() => setShowSidebar(false)}
      >
        <p className="text-center w-full text-xl py-5">Query Viewer</p>
        <CodeViewer lang="sql" bg copyBtn data={query?.query ?? ""} />
        <div style={{ height: "1rem" }} />
        {query?.results && query.results.length > 0 && (
          <CodeViewer lang="none" bg data={jsonToTable(query.results)} noWrap />
        )}
      </Sidebar>
      {showBtn && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSidebar((prev) => !prev)}
          className="fixed z-30 right-5 bottom-5"
        >
          <Code className="p-0.5" />
        </Button>
      )}
    </>
  );
}
