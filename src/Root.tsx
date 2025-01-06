import { Outlet } from "react-router-dom";
import "./Root.css";
import NavBar from "./components/NavBar";
import { ThemeModeToggle } from "./components/ThemeModeToggle";
import QueryPreview from "./components/QueryPreview";

function Root() {
  return (
    <>
      <ThemeModeToggle />
      <NavBar />
      <div className="p-7" />
      <Outlet />
      <QueryPreview />
    </>
  );
}

export default Root;
