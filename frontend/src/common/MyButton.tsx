import type { ButtonHTMLAttributes } from "react";

export default function MyButton({ onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className="text-content border-accent text-accent hover:bg-accent ~px-2/4 ~py-1/2 inline-block rounded-md border-2 font-semibold hover:text-dark-text"
      {...props}
    ></button>
  );
}
