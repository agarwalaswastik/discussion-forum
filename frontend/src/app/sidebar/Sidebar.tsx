import { FaHome } from "react-icons/fa";
import Item from "./Item";
import { MdBarChart } from "react-icons/md";

export default function Sidebar() {
  return (
    <div className="text-content border-r-slate ~w-48/64 flex h-full flex-col border-r-2 p-2">
      <ul className="flex w-full flex-col gap-2">
        <Item url="/">
          <FaHome />
          <p>Home</p>
        </Item>
        <Item url="/all">
          <MdBarChart />
          <p>All</p>
        </Item>
        <li className="border-t-slate w-full border-t"></li>
      </ul>
    </div>
  );
}
