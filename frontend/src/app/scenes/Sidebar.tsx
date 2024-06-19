import { FaHome } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <div className="text-content border-r-slate flex h-full flex-col border-r-2 p-2 ~w-48/64">
      <ul className="flex w-full flex-col gap-2">
        <SidebarItem url="/">
          <FaHome />
          <p>Home</p>
        </SidebarItem>
        <SidebarItem url="/all">
          <MdBarChart />
          <p>All</p>
        </SidebarItem>
        <li className="border-t-slate w-full border-t"></li>
      </ul>
    </div>
  );
}
