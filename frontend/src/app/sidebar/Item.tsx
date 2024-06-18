import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function Item({ url, children }: { url: string; children?: ReactNode }) {
  const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
    return clsx("flex w-full items-center gap-2 rounded-sm p-2 transition-none hover:bg-gray", isActive && "bg-gray");
  };

  return (
    <li>
      <NavLink className={navLinkStyles} to={url}>
        {children}
      </NavLink>
    </li>
  );
}
