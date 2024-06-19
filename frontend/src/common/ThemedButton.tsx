import type { ButtonHTMLAttributes } from "react";

export default function ThemedButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="text-content border-accent text-accent hover:bg-accent inline-block w-fit rounded-md border-2 font-semibold ~px-2/4 ~py-1/2 hover:text-dark-text"
      {...props}
    ></button>
  );
}
