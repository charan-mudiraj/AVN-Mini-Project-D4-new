import {
  Outlet,
  useLocation,
} from "react-router-dom";
import "./Root.css";
import NavBar from "./components/NavBar";
import QueryPreview from "./components/QueryPreview";
import Home from "./pages/Home";

function Root() {
  const location = useLocation();
  return (
    <div>
      {/* <ThemeModeToggle /> */}
      <NavBar />
      <div className="p-7" />
      {location.pathname === "/" ? (
        <Home />
      ) : (
        <Outlet />
      )}

      <QueryPreview />
    </div>
  );
}

export default Root;
