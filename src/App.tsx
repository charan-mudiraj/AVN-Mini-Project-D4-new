import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

import { ThemeModeToggle } from "./components/ThemeModeToggle";
import AllStudentsDetails from "./pages/AllStudentsDetails";

function App() {
  return (
    <>
      <ThemeModeToggle />
      <NavBar />
      <div className="p-7" />
      <Routes>
        <Route path="/all" element={<AllStudentsDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
