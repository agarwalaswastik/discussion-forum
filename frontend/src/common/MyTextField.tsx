import clsx from "clsx";
import { Field } from "formik";
import type { FieldAttributes } from "formik";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/theme/themeSlice";
import { useState } from "react";

export default function MyTextField({ isError, ...props }: FieldAttributes<unknown> & { isError: boolean }) {
  const mode = useAppSelector(selectTheme);
  const [focused, setFocused] = useState(false);

  return (
    <div className="contents" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <Field
        className={clsx(
          `w-5/6 rounded-md border-2 p-1 outline-none lg:p-2 bg-${mode}-primary text-content text-${mode}-text`,
          !focused && !isError && `border-${mode}-slate`,
          !focused && isError && "border-red-500",
          focused && `border-${mode}-accent`,
          props.className,
        )}
        {...props}
      />
    </div>
  );
}
