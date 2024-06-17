import { ReactNode } from "react";
import { useAppSelector } from "../hooks";
import { selectTheme } from "../../features/theme/themeSlice";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function Item({ url, children }: { url: string; children?: ReactNode }) {
  const mode = useAppSelector(selectTheme);

  const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
    return clsx(
      `flex w-full items-center gap-2 rounded-sm p-2 transition-none text-${mode}-text hover:bg-${mode}-gray`,
      isActive && `bg-${mode}-gray`,
    );
  };

  return (
    <li>
      <NavLink className={navLinkStyles} to={url}>
        {children}
      </NavLink>
    </li>
  );
}
