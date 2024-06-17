import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";

export default function MyButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const mode = useAppSelector(selectTheme);

  return (
    <button
      className={clsx(
        `text-content inline-block border-2 px-2 py-1 lg:px-4 lg:py-2 border-${mode}-accent text-${mode}-accent hover:bg-${mode}-accent rounded-md hover:text-dark-text font-semibold`,
        className,
      )}
      {...props}
    ></button>
  );
}
