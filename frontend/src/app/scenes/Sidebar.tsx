import { FaHome } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import SidebarLink from "./SidebarLink";
import OwnedCommunities from "./OwnedCommunities";
import { useAppSelector } from "../hooks";
import { selectLoggedInUsername } from "../../features/user/userSlice";

export default function Sidebar() {
  const loggedInUsername = useAppSelector(selectLoggedInUsername);

  return (
    <div className="text-content border-r-slate flex h-full flex-col border-r-2 p-2 ~w-48/64">
      <ul className="flex w-full flex-col gap-2">
        <SidebarLink url="/">
          <FaHome />
          <p>Home</p>
        </SidebarLink>
        <SidebarLink url="/all">
          <MdBarChart />
          <p>All</p>
        </SidebarLink>
        {loggedInUsername && <li className="border-t-slate w-full border-t"></li>}
        {loggedInUsername && <OwnedCommunities />}
        <li className="border-t-slate w-full border-t"></li>
      </ul>
    </div>
  );
}
