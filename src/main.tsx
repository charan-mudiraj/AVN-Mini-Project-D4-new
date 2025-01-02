import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import AllStudentsDetails, {
  allStudentsDetailsloader,
} from "./pages/AllStudentsDetails.tsx";
import AllStudentsResults, {
  allStudentsResultsLoader,
} from "./pages/AllStudentsResults.tsx";
import Root from "./Root.tsx";
import { Provider } from "jotai";
import { atomStore } from "./atoms.ts";
import Terminal from "./pages/Terminal.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/details",
        element: <AllStudentsDetails />,
        loader: allStudentsDetailsloader,
      },
      {
        path: "/results",
        element: <AllStudentsResults />,
        loader: allStudentsResultsLoader,
      },
      {
        path: "/terminal",
        element: <Terminal />,
      },
    ],
  },
]);

createRoot(
  document.getElementById("root")!
).render(
  <Provider store={atomStore}>
    <PrimeReactProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </PrimeReactProvider>
  </Provider>
);
