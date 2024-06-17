import { FaHome } from "react-icons/fa";
import { selectTheme } from "../../features/theme/themeSlice";
import { useAppSelector } from "../hooks";
import Item from "./Item";
import { MdBarChart } from "react-icons/md";

export default function Sidebar() {
  const mode = useAppSelector(selectTheme);

  return (
    <div className={`text-content flex w-72 flex-col border-r-2 p-2 border-r-${mode}-slate h-full`}>
      <ul className="flex w-full flex-col gap-2">
        <Item url="/">
          <FaHome />
          <p>Home</p>
        </Item>
        <Item url="/all">
          <MdBarChart />
          <p>All</p>
        </Item>
        <li className={`w-full border-t border-t-${mode}-slate`}></li>
      </ul>
    </div>
  );
}
