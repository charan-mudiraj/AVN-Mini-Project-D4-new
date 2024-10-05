import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PrimeReactProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </PrimeReactProvider>
  </BrowserRouter>
);
