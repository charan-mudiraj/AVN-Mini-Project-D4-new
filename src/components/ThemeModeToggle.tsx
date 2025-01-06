import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { useEffect } from "react";

const primereactThemes: any = {
  light:
    "primereact/resources/themes/lara-light-cyan/theme.css",
  dark: "primereact/resources/themes/lara-dark-cyan/theme.css",
};

export function ThemeModeToggle() {
  const { toggleTheme, theme } = useTheme();

  const loadTheme = async (theme: string) => {
    const existingLink =
      document.getElementById("theme-css");
    if (existingLink) {
      existingLink.remove();
    }
    const link = document.createElement("link");
    link.id = "theme-css";
    link.rel = "stylesheet";
    link.href = `./node_modules/${primereactThemes[theme]}`;
    document.head.appendChild(link);
  };

  useEffect(() => {
    loadTheme(theme);
  }, [theme]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed z-50 right-5 top-2"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-300" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-300" />
    </Button>
  );
}
