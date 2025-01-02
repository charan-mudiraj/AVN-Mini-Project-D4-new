import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "All Students Details",
      icon: "pi pi-users",
      command: () => navigate("/details"),
    },
    {
      label: "All Students Results",
      icon: "pi pi-calculator",
      command: () => navigate("/results"),
    },
    {
      label: "Terminal",
      icon: "pi pi-code",
      command: () => navigate("/terminal"),
    },
  ];

  return (
    <Menubar
      className="fixed top-0 w-full z-30"
      model={items}
      start={
        <div
          className="px-3 font-bold tracking-widest cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Student Portal
        </div>
      }
    />
  );
}
