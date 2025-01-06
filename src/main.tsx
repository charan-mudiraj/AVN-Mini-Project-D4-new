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
import SingleStudentDetails, {
  singleStudentDetailsLoader,
} from "./pages/SingleStudentDetails.tsx";
import SingleStudentResult, {
  singleStudentResultLoader,
} from "./pages/SingleStudentResult.tsx";
import Analytics, {
  analyticsLoader,
} from "./pages/Analytics.tsx";

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
        path: "/details/:ht_no",
        element: <SingleStudentDetails />,
        loader: singleStudentDetailsLoader,
      },
      {
        path: "/results",
        element: <AllStudentsResults />,
        loader: allStudentsResultsLoader,
      },
      {
        path: "/results/:ht_no",
        element: <SingleStudentResult />,
        loader: singleStudentResultLoader,
      },
      {
        path: "/results/analytics",
        element: <Analytics />,
        loader: analyticsLoader,
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
  <ThemeProvider>
    <Provider store={atomStore}>
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </Provider>
  </ThemeProvider>
);
